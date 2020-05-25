using DataBase.Abstraction;
using DataBase.Abstraction.Repositories;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.NodeServices;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

using Web.Services.SSR;

using static Core.Utils.WebUtils;
using static Web.Helpers.LogHelper;

namespace Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IOurGardenRepository _repository;
        private readonly ILogger _logger;
        private readonly GetAssets _getAssetsUtils;

        public HomeController(IConfiguration configuration,
                              IOurGardenRepository repository,
                              [FromServices] INodeServices nodeServices,
                              ILogger<HomeController> logger)
        {
            _configuration = configuration;
            _repository = repository;
            _logger = logger;
            _getAssetsUtils = new GetAssets(nodeServices, logger);
        }

        public async Task<IActionResult> Index()
        {
            try
            {
                var isPageNotFound = false;
                var (seoTitle, seoDescription, seoKeywords) = await GetSeoInfo();

                if (seoTitle == default && seoDescription == default && seoKeywords == default)
                {
                    isPageNotFound = true;
                    Response.StatusCode = 404;
                }

                var (js, css, stringCss) = await _getAssetsUtils.Bundles(
                    $"{Request.Scheme}://{Request.Host}{Request.PathBase}",
                    HttpContext.Request.Path.Value,
                    isPageNotFound
                );

                ViewData["jsBundles"] = js ?? new string[0];
                ViewData["cssBundles"] = css ?? new string[0];
                ViewData["stringCss"] = stringCss ?? "";

                ViewData["isMobileBrowser"] = IsMobileBrowser(Request.Headers["User-Agent"].ToString());
                ViewData["isPageNotFound"] = isPageNotFound;
                ViewData["seoTitle"] = seoTitle;
                ViewData["seoDescription"] = seoDescription;
                ViewData["seoKeywords"] = seoKeywords;
                ViewData["jivoSiteId"] = _configuration.GetSection("JivoSiteId").Value;
                ViewData["yandexMetrikaCounterId"] = _configuration.GetSection("YandexMetrikaCounterId").Value;
            }
            catch (Exception ex)
            {
                LogError(_logger, "IndexHomeController", ex);

                ViewData["jsBundles"] = new string[0];
                ViewData["cssBundles"] = new string[0];
                ViewData["jivoSiteId"] = _configuration.GetSection("JivoSiteId").Value;
                ViewData["yandexMetrikaCounterId"] = _configuration.GetSection("YandexMetrikaCounterId").Value;
            }

            return View();
        }

        public async ValueTask<(string title, string metaDescription, string metaKeywords)> GetSeoInfo()
        {
            if (!HttpContext.Request.Path.HasValue)
                return default;

            var url = HttpContext.Request.Path.Value.Substring(1).ToLower();

            if (url.Contains("/", StringComparison.InvariantCultureIgnoreCase))
            {
                var urlSplit = url.Split("/");

                return await GetProductSeoInfo(urlSplit);
            }
            else
            {
                return await GetMainPageSEOInfo(url);
            }
        }

        public async ValueTask<(string title, string metaDescription, string metaKeywords)> GetProductSeoInfo(string[] urlSplit)
        {
            string seoTitleValue = default(string);
            string seoDescriptionValue = default(string);
            string seoKeywordsValue = default(string);

            string sectionName;
            switch (urlSplit[0])
            {
                case "catalog":
                    {
                        switch (urlSplit.Length)
                        {
                            case 2:
                                {
                                    sectionName = "subcategory";
                                    var category = await _repository.GetCategory(urlSplit[1], includeSubcategory: true);

                                    if (category is null)
                                    {
                                        return default;
                                    }

                                    seoTitleValue = string.IsNullOrEmpty(category.SeoTitle)
                                        ? GetSeoTitleDefaultValue(sectionName, category.Alias)
                                        : category.SeoTitle;

                                    seoDescriptionValue = string.IsNullOrEmpty(category.SeoDescription)
                                        ? GetSeoDescriptionDefaultValue(
                                            category.Alias,
                                            sectionName,
                                            GetDescriptionAggregate(category.Subcategories, seoTitleValue)
                                        )
                                        : category.SeoDescription;

                                    seoKeywordsValue = string.IsNullOrEmpty(category.SeoKeywords)
                                        ? GetSeoKeywordsDefaultValue(sectionName)
                                        : category.SeoKeywords;

                                    break;
                                }
                            case 3:
                                {
                                    sectionName = "productList";
                                    var subcategory = await _repository.GetSubcategory(urlSplit[1], urlSplit[2], includeProducts: true);

                                    if (subcategory is null)
                                    {
                                        return default;
                                    }

                                    seoTitleValue = string.IsNullOrEmpty(subcategory.SeoTitle)
                                        ? GetSeoTitleDefaultValue(sectionName, subcategory.Alias)
                                        : subcategory.SeoTitle;

                                    seoDescriptionValue = string.IsNullOrEmpty(subcategory.SeoDescription)
                                        ? GetSeoDescriptionDefaultValue(
                                            subcategory.Alias,
                                            sectionName,
                                            GetDescriptionAggregate(subcategory.Products, seoTitleValue)
                                        )
                                        : subcategory.SeoDescription;

                                    seoKeywordsValue = string.IsNullOrEmpty(subcategory.SeoKeywords)
                                        ? GetSeoKeywordsDefaultValue(sectionName)
                                        : subcategory.SeoKeywords;

                                    break;
                                }
                            case 4:
                                {
                                    sectionName = "product";
                                    var product = await _repository.GetProduct(urlSplit[1], urlSplit[2], urlSplit[3]);

                                    if (product is null)
                                    {
                                        return default;
                                    }

                                    seoTitleValue = string.IsNullOrEmpty(product.SeoTitle)
                                        ? GetSeoTitleDefaultValue(sectionName, product.Alias)
                                        : product.SeoTitle;

                                    seoDescriptionValue = string.IsNullOrEmpty(product.SeoDescription)
                                        ? GetSeoDescriptionDefaultValue(
                                            product.Alias,
                                            sectionName,
                                            GetDescriptionAggregate(null, seoTitleValue)
                                        )
                                        : product.SeoDescription;

                                    seoKeywordsValue = string.IsNullOrEmpty(product.SeoKeywords)
                                        ? GetSeoKeywordsDefaultValue(sectionName)
                                        : product.SeoKeywords;

                                    break;
                                }
                        }

                        break;
                    }

                case "news":
                    {
                        sectionName = "news";
                        var news = await _repository.GetNews(alias: urlSplit[1], includeDescriptions: false);

                        if (news is null)
                        {
                            return default;
                        }

                        seoTitleValue = string.IsNullOrEmpty(news.SeoTitle)
                            ? GetSeoTitleDefaultValue(sectionName, news.Title)
                            : news.SeoTitle;

                        seoDescriptionValue = string.IsNullOrEmpty(news.SeoDescription)
                            ? null
                            : news.SeoDescription;

                        seoKeywordsValue = string.IsNullOrEmpty(news.SeoKeywords)
                            ? GetSeoKeywordsDefaultValue(sectionName)
                            : news.SeoKeywords;

                        break;
                    }
            }

            return (seoTitleValue, seoDescriptionValue, seoKeywordsValue);
        }

        private async ValueTask<(string title, string metaDescription, string metaKeywords)> GetMainPageSEOInfo(string url)
        {
            var seoInformation = _configuration.GetSection("SEOInformation");

            string sectionName;
            string metaValue = "";

            switch (url)
            {
                case "catalog":
                    sectionName = "category";
                    var categories = await _repository.GetCategories();

                    metaValue = GetDescriptionAggregate(categories, default);
                    break;

                case "news":
                    sectionName = "newsList";
                    break;
                case "payment":
                    sectionName = "payment";
                    break;
                case "design":
                    sectionName = "design";
                    break;
                case "videogalery":
                    sectionName = "videogalery";
                    break;
                case "about":
                    sectionName = "contacts";
                    break;
                case "card":
                    sectionName = "userCard";
                    break;
                case "rulonnyj-gazon":
                    sectionName = "rulonnyj-gazon";
                    break;

                case "home":
                case "":
                case null:
                    sectionName = "home";
                    break;

                default:
                    return default;
            }

            var section = seoInformation.GetSection(sectionName);

            return (
                section.GetValue<string>("title"),
                section.GetValue<string>("meta")
                       .Replace(
                           "{{valueList}}",
                           metaValue,
                           StringComparison.InvariantCultureIgnoreCase
                       ),
                section.GetValue<string>("keywords")
            );
        }

        private string GetSeoTitleDefaultValue(string sectionName, string productAlias)
        {
            var seoInformation = _configuration.GetSection("SEOInformation");

            var section = seoInformation.GetSection(sectionName);

            var defaultValue = section.GetValue<string>("title")
                                      .Replace(
                                          "{{value}}",
                                          productAlias,
                                          StringComparison.InvariantCultureIgnoreCase
                                      );

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
            string aggregate;

            if (productList != null && productList.Any())
            {
                var aliasList = productList.Select(x => x.Alias);
                aggregate = aliasList.Aggregate((acc, val) => $"{acc}, {val}");
            }
            else
            {
                aggregate = defaultValue;
            }

            if (aggregate.Length >= 150)
            {
                aggregate = aggregate.Substring(0, 140);

                aggregate = $"{aggregate.Substring(0, aggregate.LastIndexOf(","))} и другие товары";
            }

            return aggregate;
        }

        /// <summary>
        /// Возвращает Description.
        /// </summary>
        /// <param name="productAlias">Наименование основного продукта.</param>
        /// <param name="sectionName">Секция в json</param>
        /// <param name="productAliasList">Список товаров основного продукта.</param>
        private string GetSeoDescriptionDefaultValue(string productAlias, string sectionName, string productAliasList)
        {
            var seoInformation = _configuration.GetSection("SEOInformation");

            var section = seoInformation.GetSection(sectionName);

            var defaultValue = section.GetValue<string>("meta")
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

        private string GetSeoKeywordsDefaultValue(string sectionName)
        {
            var seoInformation = _configuration.GetSection("SEOInformation");

            var section = seoInformation.GetSection(sectionName);

            var defaultValue = section.GetValue<string>("keywords");

            return defaultValue;
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }
    }
}