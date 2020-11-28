using ApiService.Abstraction.Core;
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

namespace ApiService.Core
{
    public class SeoService : ISeoService
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
        /// Репозиторий БД.
        /// </summary>
        private readonly IOurGardenRepository _repository;

        #endregion

        #region .ctor

        /// <summary>
        /// .ctor
        /// </summary>
        public SeoService(ILogger<SeoService> logger,
                          IOptions<SeoInformationOption> seoOptions,
                          IOurGardenRepository repository)
        {
            _logger = logger;
            _seoInformation = seoOptions.Value;
            _repository = repository;
        }

        #endregion

        #region IHomeConstollerService Impl

        /// <inheritdoc/>
        public async Task<ServiceExecuteResult<PageSeoInformation>> GetPageSeoInformation(string pathname)
        {
            try
            {
                var isPageExists = true;
                var (seoTitle, seoDescription, seoKeywords) = await GetSeoInfo(pathname);

                if (seoTitle == default && seoDescription == default && seoKeywords == default)
                {
                    isPageExists = false;
                }

                return new ServiceExecuteResult<PageSeoInformation>
                {
                    IsSuccess = true,
                    Result = new PageSeoInformation
                    {
                        SeoTitle = seoTitle,
                        SeoDescription = seoDescription,
                        SeoKeywords = seoKeywords,
                        IsPageExists = isPageExists,
                    }
                };
            }
            catch (Exception ex)
            {
                var msg = $"Не удалось получить СЕО информацию о странице \"{pathname}\". {ex.Message}";

                _logger.LogError(ex, msg);
                return new ServiceExecuteResult<PageSeoInformation>
                {
                    IsSuccess = false,
                    Error = msg,
                };
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

            var url = pathString.Value[1..].ToLower();

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
                                                            entityProductListAliases: entity?.Subcategories);
                                }
                            case 3:
                                {
                                    section = _seoInformation.ProductList;
                                    var entity = await _repository.GetSubcategory(urlSplit[1], urlSplit[2], includeProducts: true);

                                    return GetEntitySeoInfo(section,
                                                      entity,
                                                      entity,
                                                      entityProductListAliases: entity?.Products);
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
                    {
                        pageInfo = await _repository.GetPageInfo(PageInfo.HomePageId);
                        return (
                            pageInfo.SeoTitle,
                            pageInfo.SeoDescription,
                            pageInfo.SeoKeywords
                        );
                    }

                case "catalog":
                    {
                        //section = _seoInformation.Category;
                        //var categories = await _repository.GetCategories();

                        //metaValue = GetDescriptionAggregate(categories, default);
                        //break;

                        pageInfo = await _repository.GetPageInfo(PageInfo.CatalogPageId);
                        return (
                            pageInfo.SeoTitle,
                            pageInfo.SeoDescription,
                            pageInfo.SeoKeywords
                        );
                    }

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
                    {
                        pageInfo = await _repository.GetPageInfo(PageInfo.NewsListPageId);
                        return (
                            pageInfo.SeoTitle,
                            pageInfo.SeoDescription,
                            pageInfo.SeoKeywords
                        );
                    }

                case "payment":
                    { 
                        pageInfo = await _repository.GetPageInfo(PageInfo.PaymentPageId);
                        return (
                            pageInfo.SeoTitle,
                            pageInfo.SeoDescription,
                            pageInfo.SeoKeywords
                        );
                    }

                case "contacts":
                    {
                        pageInfo = await _repository.GetPageInfo(PageInfo.ContactsPageId);
                        return (
                            pageInfo.SeoTitle,
                            pageInfo.SeoDescription,
                            pageInfo.SeoKeywords
                        );
                    }

                case "about":
                    {
                        pageInfo = await _repository.GetPageInfo(PageInfo.AboutPageId);
                        return (
                            pageInfo.SeoTitle,
                            pageInfo.SeoDescription,
                            pageInfo.SeoKeywords
                        );
                    }

                case "card":
                    {
                        pageInfo = await _repository.GetPageInfo(PageInfo.ContactsPageId);
                        return (
                            pageInfo.SeoTitle,
                            pageInfo.SeoDescription,
                            pageInfo.SeoKeywords
                        );
                    }

                case "rulonnyj-gazon":
                    {
                        pageInfo = await _repository.GetPageInfo(PageInfo.GazonPageId);
                        return (
                            pageInfo.SeoTitle,
                            pageInfo.SeoDescription,
                            pageInfo.SeoKeywords
                        );
                    }

                default:
                    return default;
            }

            if (section is null)
            {
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
        /// <param name="section">Дефолтная Сео информация для данной страницы.</param>
        /// <param name="entitySeoInfo">Сео информация данной страницы.</param>
        /// <param name="entityAliasInfo">Отображаемое имя продукта</param>
        /// <param name="entityProductListAliases">Список отображаемых наименований продуктов, относящихся к данному товару.</param>
        /// <param name="getDefaultDescriptionIfNotExists">Указывает, нужно ли получать дефолтное значение мета описания (Description)</param>
        /// <returns></returns>
        private (string seoTitleValue, string seoDescriptionValue, string seoKeywordsValue) GetEntitySeoInfo(SeoInformationSection section,
                                                                                                             ISeoInformation entitySeoInfo,
                                                                                                             IAlias entityAliasInfo,
                                                                                                             IEnumerable<IAlias> entityProductListAliases = null,
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
                    GetDescriptionAggregate(entityProductListAliases, seoTitleValue)
                );
            }

            var seoKeywordsValue = string.IsNullOrEmpty(entitySeoInfo.SeoKeywords)
                ? ""
                : entitySeoInfo.SeoKeywords;

            return (seoTitleValue, seoDescriptionValue, seoKeywordsValue);
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
        /// Возвращает дефолтное значение заголовка (Title) страницы для страницы по наименованию.
        /// Подставляет в шаблон имя товара.
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
        /// Возвращает дефолтное значение описания (Description) страницы для страницы по наименованию.
        /// Подставляет в шаблон имя товара или список имён товаров.
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
