using ApiService.Abstraction;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Model;

using System;
using System.Diagnostics;
using System.Threading.Tasks;

using static Core.Utils.WebUtils;

namespace Web.Controllers
{
    public class HomeController : Controller
    {
        #region Fields
        
        /// <summary>
        /// Логгер.
        /// </summary>
        private readonly ILogger _logger;

        /// <summary>
        /// Сервис данного контроллера.
        /// </summary>
        private readonly IHomeControllerService _homeConstollerService;

        /// <summary>
        /// Опции сервисов сео.
        /// </summary>
        private readonly SeoServicesOptions _seoServicesOption;

        #endregion

        #region .ctor

        public HomeController(ILogger<HomeController> logger,
                              IOptions<SeoServicesOptions> seoServicesOption,
                              IHomeControllerService homeConstollerService)
        {
            _logger = logger;
            _seoServicesOption = seoServicesOption.Value;
            _homeConstollerService = homeConstollerService;
        }

        #endregion

        #region

        public async Task<IActionResult> Index()
        {
            try
            {
                var pageInfo = await _homeConstollerService.GetPageMainInformation(HttpContext);

                if (!pageInfo.IsPageExists)
                {
                    Response.StatusCode = 404;
                }

                ViewData["jsBundles"] = pageInfo.BundlesInformation?.JsBundles ?? new string[0];
                ViewData["cssBundles"] = pageInfo.BundlesInformation?.CssBundles ?? new string[0];
                ViewData["stringCss"] = pageInfo.BundlesInformation?.CssInjection ?? "";

                ViewData["isMobileBrowser"] = IsMobileBrowser(Request.Headers["User-Agent"].ToString());
                ViewData["isPageNotFound"] = !pageInfo.IsPageExists;
                ViewData["seoTitle"] = pageInfo.SeoTitle;
                ViewData["seoDescription"] = pageInfo.SeoDescription;
                ViewData["seoKeywords"] = pageInfo.SeoKeywords;

                ViewData["jivoSiteId"] = _seoServicesOption.JivoSiteId;
                ViewData["yandexMetrikaCounterId"] = _seoServicesOption.YandexMetrikaCounterId;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while return Home Index page:");

                ViewData["jsBundles"] = new string[0];
                ViewData["cssBundles"] = new string[0];
                ViewData["jivoSiteId"] = _seoServicesOption.JivoSiteId;
                ViewData["yandexMetrikaCounterId"] = _seoServicesOption.YandexMetrikaCounterId;
            }

            return View();
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }

        #endregion
    }
}