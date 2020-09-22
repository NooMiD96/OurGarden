using ApiService.Abstraction;
using ApiService.Abstraction.ViewModel;

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

        /// <summary>
        /// .ctor
        /// </summary>
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
            var viewModel = new HomePageViewModel()
            {
                IsPageFound = true,
                IsMobileBrowser = false,
            };

            try
            {
                var pageInfo = await _homeConstollerService.GetPageMainInformation(HttpContext);

                if (pageInfo is null || !pageInfo.IsPageExists)
                {
                    Response.StatusCode = 404;
                    viewModel.IsPageFound = false;
                }

                viewModel.IsMobileBrowser = IsMobileBrowser(Request.Headers["User-Agent"].ToString());
                viewModel.IsPageFound = pageInfo.IsPageExists;
                viewModel.JivoSiteId = _seoServicesOption.JivoSiteId;
                viewModel.YandexMetrikaCounterId = _seoServicesOption.YandexMetrikaCounterId;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while getting Home[Index] page info:");

                viewModel.IsMobileBrowser = IsMobileBrowser(Request.Headers["User-Agent"].ToString());
                viewModel.IsPageFound = false;
                viewModel.JivoSiteId = _seoServicesOption.JivoSiteId;
                viewModel.YandexMetrikaCounterId = _seoServicesOption.YandexMetrikaCounterId;
            }

            return View(viewModel);
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }

        #endregion
    }
}