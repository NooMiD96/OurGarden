using ApiService.Abstraction;
using ApiService.Abstraction.Model;

using DataBase.Abstraction;
using DataBase.Abstraction.Model;
using DataBase.Abstraction.Repositories;

using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Model;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiService
{
    public class HomeControllerService : IHomeControllerService
    {
        #region Fields

        /// <summary>
        /// Логгер.
        /// </summary>
        private readonly ILogger _logger;

        /// <summary>
        /// Сео информация из конфига по умолчанию.
        /// </summary>
        private readonly SeoInformationOption _seoInformation;

        /// <summary>
        /// Сервис по работе с бандлами.
        /// </summary>
        private readonly IBundlesService _bundlesService;

        /// <summary>
        /// Репозиторий БД.
        /// </summary>
        private readonly IOurGardenRepository _repository;

        #endregion

        #region .ctor

        /// <summary>
        /// .ctor
        /// </summary>
        public HomeControllerService(ILogger<HomeControllerService> logger,
                                     IOptions<SeoInformationOption> seoOptions,
                                     IBundlesService bundlesService,
                                     IOurGardenRepository repository)
        {
            _logger = logger;
            _seoInformation = seoOptions.Value;
            _bundlesService = bundlesService;
            _repository = repository;
        }

        #endregion

        #region IHomeConstollerService Impl

        public async Task<PageMainInformation> GetPageMainInformation(HttpContext httpContext)
        {
            try
            {
                var request = httpContext.Request;

                var isPageExists = true;
                var (seoTitle, seoDescription, seoKeywords) = await GetSeoInfo(httpContext.Request.Path);

                if (seoTitle == default && seoDescription == default && seoKeywords == default)
                {
                    isPageExists = false;
                }

                var bundlesInformation = await _bundlesService.GetBundlesInformation(
                    $"{request.Scheme}://{request.Host}{request.PathBase}",
                    request.Path.Value,
                    isPageNotFound: !isPageExists
                );

                return new PageMainInformation
                {
                    SeoTitle = seoTitle,
                    SeoDescription = seoDescription,
                    SeoKeywords = seoKeywords,
                    IsPageExists = isPageExists,
                    BundlesInformation = bundlesInformation,
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error while getting main information of requested page:");
                return default;
            }
        }

        #region Private

        /// <summary>
        /// Запрос Сео информации запрашиваемой страницы.
        /// </summary>
        /// <param name="pathString"></param>
        /// <returns></returns>
        private async ValueTask<(string title, string metaDescription, string metaKeywords)> GetSeoInfo(PathString pathString)
        {
            if (!pathString.HasValue)
            {
                return default;
            }

            var url = pathString.Value.Substring(1).ToLower();

            if (url.Contains("/", StringComparison.InvariantCultureIgnoreCase))
            {
                var urlSplit = url.Split("/");

                return await GetProductSeoInfo(urlSplit);
            }
            else
            {
                return await GetMainPageSeoInfo(url);
            }
        }

        /// <summary>
        /// Если строка запроса страницы имеет несколько уровней, значит
        /// запрашивается конкретная страница товара или новости.
        /// </summary>
        /// <param name="urlSplit"></param>
        /// <returns></returns>
        private async ValueTask<(string title, string metaDescription, string metaKeywords)> GetProductSeoInfo(string[] urlSplit)
        {
            SeoInformationSection section;
            switch (urlSplit[0])
            {
                case "catalog":
                    {
                        switch (urlSplit.Length)
                        {
                            case 2:
                                {
                                    section = _seoInformation.Subcategory;
                                    var entity = await _repository.GetCategory(urlSplit[1], includeSubcategory: true);

                                    return GetEntitySeoInfo(section,
                                                            entity,
                                                            entity,
                                                            entityAliases: entity?.Subcategories);
                                }
                            case 3:
                                {
                                    section = _seoInformation.ProductList;
                                    var entity = await _repository.GetSubcategory(urlSplit[1], urlSplit[2], includeProducts: true);

                                    return GetEntitySeoInfo(section,
                                                      entity,
                                                      entity,
                                                      entityAliases: entity?.Products);
                                }
                            case 4:
                                {
                                    section = _seoInformation.Product;
                                    var entity = await _repository.GetProduct(urlSplit[1], urlSplit[2], urlSplit[3]);

                                    return GetEntitySeoInfo(section,
                                                            entity,
                                                            entity);
                                }
                        }

                        break;
                    }

                case "news":
                    {
                        section = _seoInformation.News;
                        var entity = await _repository.GetNews(newsId: urlSplit[1], includeDescriptions: false);

                        return GetEntitySeoInfo(section,
                                                entity,
                                                entity,
                                                getDefaultDescriptionIfNotExists: false);
                    }
            }

            return default;
        }

        /// <summary>
        /// Если строка запроса имеет только один уровень, значит
        /// запрашивается основная страница.
        /// </summary>
        /// <param name="url"></param>
        /// <returns></returns>
        private async ValueTask<(string metaTitle, string metaDescription, string metaKeywords)> GetMainPageSeoInfo(string url)
        {
            SeoInformationSection section;
            string metaValue = "";
            PageInfo pageInfo;

            switch (url)
            {
                case "home":
                case "":
                case null:
                    pageInfo = await _repository.GetPageInfo(PageInfo.HomePageId);
                    return (
                        pageInfo.SeoTitle,
                        pageInfo.SeoDescription,
                        pageInfo.SeoKeywords
                    );

                case "catalog":
                    section = _seoInformation.Category;
                    var categories = await _repository.GetCategories();

                    metaValue = GetDescriptionAggregate(categories, default);
                    break;

                case "design":
                    {
                        pageInfo = await _repository.GetPageInfo(PageInfo.DesignPageId);
                        return (
                            pageInfo.SeoTitle,
                            pageInfo.SeoDescription,
                            pageInfo.SeoKeywords
                        );
                    }

                case "news":
                    section = _seoInformation.NewsList;
                    break;
                case "payment":
                    section = _seoInformation.Payment;
                    break;

                case "videogalery":
                    section = _seoInformation.Videogalery;
                    break;
                case "about":
                    section = _seoInformation.Contacts;
                    break;
                case "card":
                    section = _seoInformation.UserCard;
                    break;
                case "rulonnyj-gazon":
                    section = _seoInformation.RulonnyjGazon;
                    break;

                default:
                    return default;
            }

            return (
                section.Title,
                section.Description
                       .Replace(
                           "{{valueList}}",
                           metaValue,
                           StringComparison.InvariantCultureIgnoreCase
                       ),
                section.Keywords
            );
        }

        /// <summary>
        /// Получение Сео информации для объекта.
        /// </summary>
        private (string seoTitleValue, string seoDescriptionValue, string seoKeywordsValue) GetEntitySeoInfo(SeoInformationSection section,
                                                                                                             ISeoInformation entitySeoInfo,
                                                                                                             IAlias entityAliasInfo,
                                                                                                             IEnumerable<IAlias> entityAliases = null,
                                                                                                             bool getDefaultDescriptionIfNotExists = true)
        {
            if (entitySeoInfo is null || entityAliasInfo is null)
            {
                return default;
            }

            var seoTitleValue = string.IsNullOrEmpty(entitySeoInfo.SeoTitle)
                ? GetSeoTitleDefaultValue(section, entityAliasInfo.Alias)
                : entitySeoInfo.SeoTitle;

            var seoDescriptionValue = entitySeoInfo.SeoDescription;
            if (string.IsNullOrEmpty(seoDescriptionValue) && getDefaultDescriptionIfNotExists)
            {
                seoDescriptionValue = GetSeoDescriptionDefaultValue(
                    section,
                    entityAliasInfo.Alias,
                    GetDescriptionAggregate(entityAliases, seoTitleValue)
                );
            }

            var seoKeywordsValue = string.IsNullOrEmpty(entitySeoInfo.SeoKeywords)
                ? ""
                : entitySeoInfo.SeoKeywords;

            return (seoTitleValue, seoDescriptionValue, seoKeywordsValue);
        }

        /// <summary>
        /// Возвращает дефолтное значение заголовка страницы для страницы по наименованию.
        /// </summary>
        /// <param name="section">Секция (страница).</param>
        /// <param name="productAlias">Пользовательское наименование продукта.</param>
        private string GetSeoTitleDefaultValue(SeoInformationSection section, string productAlias)
        {
            var defaultValue = section.Title.Replace("{{value}}",
                                                     productAlias,
                                                     StringComparison.InvariantCultureIgnoreCase);

            return defaultValue;
        }

        /// <summary>
        /// Возвращает список продуктов в виде строки.
        /// Используется для товаров, у которых имеется список продуктов.
        /// </summary>
        /// <param name="productList">Список продуктов на агрегацию.</param>
        /// <param name="defaultValue">Значение в случае, когда список пустой.</param>
        private string GetDescriptionAggregate(IEnumerable<IAlias> productList, string defaultValue)
        {
            var aggregate = defaultValue;

            if (productList != null && productList.Any())
            {
                var aliasList = productList.Select(x => x.Alias);
                aggregate = aliasList.Aggregate((acc, val) => $"{acc}, {val}");

                if (aggregate.Length >= 150)
                {
                    aggregate = aggregate.Substring(0, 140);

                    aggregate = $"{aggregate.Substring(0, aggregate.LastIndexOf(","))} и другие товары";
                }
            }

            return aggregate;
        }

        /// <summary>
        /// Возвращает дефолтное значение описания страницы для страницы по наименованию.
        /// </summary>
        /// <param name="section">Секция (страница).</param>
        /// <param name="productAlias">Наименование основного продукта.</param>
        /// <param name="productAliasList">Список товаров основного продукта.</param>
        private string GetSeoDescriptionDefaultValue(SeoInformationSection section, string productAlias, string productAliasList)
        {
            var defaultValue = section.Description
                                      .Replace(
                                          "{{value}}",
                                          productAlias,
                                          StringComparison.InvariantCultureIgnoreCase
                                      )
                                      .Replace(
                                          "{{valueList}}",
                                          productAliasList,
                                          StringComparison.InvariantCultureIgnoreCase
                                      );

            return defaultValue;
        }

        #endregion

        #endregion
    }
}
