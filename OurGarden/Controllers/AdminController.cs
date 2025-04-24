using Core.Antiforgery;
using Core.Helpers;
using DataBase.Abstraction.Identity.Helpers;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Web.Controllers
{
    public class AdminController : Controller
    {
        private readonly IAntiforgery _antiforgery;

        public AdminController(IAntiforgery antiforgery)
        {
            _antiforgery = antiforgery;
        }

        public IActionResult Index()
        {
            if (User.Identity.IsAuthenticated)
            {
                ViewData["user"] = JsonHelper.Serialize(new
                {
                    userName = User.Identity.Name,
                    userType = User.GetUserRole()
                });
                ViewData["xpt"] = Xsrf.XsrfToXpt(_antiforgery.GetTokens(HttpContext));
            }

            return View();
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }
    }
}