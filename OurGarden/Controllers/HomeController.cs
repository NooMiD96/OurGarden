using ApiService.Abstraction.ViewModel;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

using Model;

using System.Diagnostics;

using static Core.Utils.WebUtils;

namespace Web.Controllers
{
    public class HomeController : Controller
    {
        #region Fields

        /// <summary>
        /// Опции сервисов сео.
        /// </summary>
        private readonly SeoServicesOptions _seoServicesOption;

        #endregion

        #region .ctor

        /// <summary>
        /// .ctor
        /// </summary>
        public HomeController(IOptions<SeoServicesOptions> seoServicesOption)
        {
            _seoServicesOption = seoServicesOption.Value;
        }

        #endregion

        #region API

        public IActionResult Index()
        {
            var viewModel = new HomePageViewModel()
            {
                IsMobileBrowser = IsMobileBrowser(Request.Headers["User-Agent"].ToString()),
                JivoSiteId = _seoServicesOption.JivoSiteId,
                YandexMetrikaCounterId = _seoServicesOption.YandexMetrikaCounterId,
            };

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