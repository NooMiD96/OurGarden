using Database.Service;

using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using Model.Identity;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using static Core.Antiforgery.Xsrf;

namespace Web.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : BaseController
    {
        public HomeController()
        {
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetNewsList()
        {
            var any1 = new
            {
                id = 0,
                title = "Title 1",
                date = DateTime.Parse("2019-07-06T15:00:00"),
                description = "Test title 1 record",
                photo = "http://xn----7sbbgjb4cubzsm.xn--p1ai/uploads/catalog/mini/0bb6dac67c3d9659eaeb416f74b428bb.jpg"
            };

            var any2 = new
            {
                id = 1,
                title = "Title 2",
                date = DateTime.Parse("2019-07-06T16:00:00"),
                description = "Test title 2 record",
                photo = "http://xn----7sbbgjb4cubzsm.xn--p1ai/uploads/catalog/mini/b09422b13492b92718db06ac132f3397.jpg"
            };

            return Success(new List<object>() { any1, any2 });
        }
    }
}
