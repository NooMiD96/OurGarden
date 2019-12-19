using Database.Repositories;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.NodeServices;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Diagnostics;
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
                              [FromServices] IOurGardenRepository repository,
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
                var (js, css) = await _getAssetsUtils.Bundles(
                    $"{Request.Scheme}://{Request.Host}{Request.PathBase}",
                    HttpContext.Request.Path.Value
                );

                ViewData["jsBundles"] = js ?? new string[0];
                ViewData["cssBundles"] = css ?? new string[0];

                var (title, metaDescription) = await GetSEOInfo();

                if (title == default && metaDescription == default)
                {
                    Response.StatusCode = 404;
                }

                ViewData["isMobileBrowser"] = IsMobileBrowser(Request.Headers["User-Agent"].ToString());
                ViewData["title"] = title;
                ViewData["metaDescription"] = metaDescription;
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

        public async ValueTask<(string title, string metaDescription)> GetSEOInfo()
        {
            if (!HttpContext.Request.Path.HasValue)
                return default;

            var seoInformation = _configuration.GetSection("SEOInformation");

            var url = HttpContext.Request.Path.Value.Substring(1).ToLower();
            
            if (url.Contains("/", StringComparison.InvariantCultureIgnoreCase))
            {
                var urlSplit = url.Split("/");

                switch (urlSplit[0])
                {
                    case "catalog":
                    {
                        string sectionName;
                        string value;

                        switch (urlSplit.Length)
                        {
                            default:
                            case 2:
                                sectionName = "subcategory";
                                var category = await _repository.GetCategory(urlSplit[1]);

                                if (category is null)
                                {
                                    return default;
                                }

                                value = category.Alias;
                                break;
                            case 3:
                                sectionName = "productList";
                                var subcategory = await _repository.GetSubcategory(urlSplit[1], urlSplit[2]);

                                if (subcategory is null)
                                {
                                    return default;
                                }

                                value = subcategory.Alias;
                                break;
                            case 4:
                                sectionName = "product";
                                var product = await _repository.GetProduct(urlSplit[1], urlSplit[2], urlSplit[3]);

                                if (product is null)
                                {
                                    return default;
                                }

                                value = product.Alias;
                                break;
                        }

                        var section = seoInformation.GetSection(sectionName);

                        return (
                            section
                                .GetValue<string>("title")
                                .Replace(
                                    "{{value}}",
                                    value,
                                    StringComparison.InvariantCultureIgnoreCase
                                ),
                            section.GetValue<string>("meta")
                        );
                    }
                    case "news":
                    {
                        var section = seoInformation.GetSection("news");

                        var news = await _repository.GetNews(alias: urlSplit[1], includeDescriptions: false);

                        if (news is null)
                        {
                            return default;
                        }

                        return (
                            section
                                .GetValue<string>("title")
                                .Replace(
                                    "{{value}}",
                                    news.Title,
                                    StringComparison.InvariantCultureIgnoreCase
                                ),
                            section.GetValue<string>("meta")
                        );
                    }

                    default:
                        break;
                }

                return default;
            }
            else
            {
                string sectionName;

                switch (url)
                {
                    case "catalog":
                        sectionName = "category";
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
                );
            }
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }
    }
}