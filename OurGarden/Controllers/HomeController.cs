using ApiService.Abstraction.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Model;
using System.Diagnostics;
using System.Linq;
using System.Text.RegularExpressions;
using static Core.Utils.WebUtils;

namespace Web.Controllers;

/// <summary>
/// .ctor
/// </summary>
public class HomeController(IOptions<SeoServicesOptions> seoServicesOption, IOptions<RootOptions> rootOption) : Controller
{
    static private bool IsFirstRequest = true;

    public IActionResult Index()
    {
        if (Request.Path.HasValue)
        {
            var requestPath = Request.Path.Value.ToLower();

            if (
                rootOption.Value.SkipRoutePathEndRegex.Any(
                    x => Regex.IsMatch(requestPath, x)
                )
            )
            {
                return RedirectPermanent(
                    requestPath[0..(Request.Path.Value.LastIndexOf('/') + 1)]
                );
            }
        }

        var viewModel = new HomePageViewModel()
        {
            IsMobileBrowser = IsMobileBrowser(Request.Headers.UserAgent.ToString()),
            JivoSiteId = seoServicesOption.Value.JivoSiteId,
            YandexMetrikaCounterId = seoServicesOption.Value.YandexMetrikaCounterId,
            IsFirstRequest = IsFirstRequest,
        };

        IsFirstRequest = false;

        return View(viewModel);
    }

    public IActionResult Error()
    {
        ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
        return View();
    }
}