using Core.Helpers;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

using System;
using System.Diagnostics;

namespace Web.Controllers
{
    public class HomeController: Controller
    {
        private readonly IConfiguration _configuration;

        public HomeController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public IActionResult Index()
        {
            var (title, metaDescription) = GetSEOInfo();

            ViewData["title"] = title;
            ViewData["metaDescription"] = metaDescription;

            return View();
        }

        public (string title, string metaDescription) GetSEOInfo()
        {
            if (!HttpContext.Request.Path.HasValue)
                return default;
            
            var seoInformation = _configuration.GetSection("SEOInformation");
             
            var url = HttpContext.Request.Path.Value.Substring(1).ToLower();
            if (String.IsNullOrEmpty(url) || url == "главная")
            {
                var home = seoInformation.GetSection("home");

                return (
                    home.GetValue<string>("title"),
                    home.GetValue<string>("meta")
                );
            }
            else if (url.Contains("/", StringComparison.InvariantCultureIgnoreCase))
            {
                var urlSplit = url.Split("/");

                switch (urlSplit[0])
                {
                    case "каталог":
                    {
                        string sectionName;
                        string value;

                        switch (urlSplit.Length)
                        {
                            default:
                            case 2:
                                sectionName = "subcategory";
                                value = urlSplit[1];
                                break;
                            case 3:
                                sectionName = "subcategory";
                                value = urlSplit[2];
                                break;
                            case 4:
                                sectionName = "subcategory";
                                value = urlSplit[3];
                                break;
                        }

                        var section = seoInformation.GetSection(sectionName);

                        return (
                            section
                                .GetValue<string>("title")
                                .Replace(
                                    "{{value}}",
                                    value.TransformFromId(),
                                    StringComparison.InvariantCultureIgnoreCase
                                ),
                            section.GetValue<string>("meta")
                        );
                    }
                    case "акции":
                    {
                        var section = seoInformation.GetSection("news");

                        return (
                            section
                                .GetValue<string>("title")
                                .Replace(
                                    "{{value}}",
                                    urlSplit[1].TransformFromId(),
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
                    case "каталог":
                        sectionName = "category";
                        break;
                    case "акции":
                        sectionName = "newsList";
                        break;
                    case "доставка-и-оплата":
                        sectionName = "payment";
                        break;
                    case "ландшафтный-дизайн":
                        sectionName = "design";
                        break;
                    case "видеогалерея":
                        sectionName = "videogalery";
                        break;
                    case "контакты":
                        sectionName = "contacts";
                        break;
                    case "корзина":
                        sectionName = "userCard";
                        break;
                        
                    default:
                        sectionName = "home";
                        break;
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