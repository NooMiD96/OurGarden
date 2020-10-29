using ApiService.Abstraction.ViewModel;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

using Model;

using System.Diagnostics;
using System.Linq;
using System.Text.RegularExpressions;

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

        /// <summary>
        /// Основные настройки приложения
        /// </summary>
        private readonly RootOptions _rootOption;

        #endregion

        #region .ctor

        /// <summary>
        /// .ctor
        /// </summary>
        public HomeController(IOptions<SeoServicesOptions> seoServicesOption,
                              IOptions<RootOptions> rootOption)
        {
            _seoServicesOption = seoServicesOption.Value;
            _rootOption = rootOption.Value;
        }

        #endregion

        #region API

        public IActionResult Index()
        {
            if (Request.Path.HasValue)
            {
                var requestPath = Request.Path.Value.ToLower();

                if (
                    _rootOption.SkipRoutePathEndRegex.Any(
                        x => Regex.IsMatch(requestPath, x)
                    )
                )
                {
                    return RedirectPermanent(
                        requestPath[0..requestPath.LastIndexOf("/")]
                    );
                }
            }

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