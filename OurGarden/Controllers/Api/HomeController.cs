using Database.Repositories;

using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : BaseController
    {
        private readonly IOurGardenRepository _repository;

        public HomeController([FromServices] IOurGardenRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("[action]")]
        public IActionResult GetNewsList()
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

        [HttpGet("[action]")]
        public async Task<IActionResult> GetCategories()
        {
            var result = await _repository.GetCategories();

            return Success(result);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetSubcategories([FromQuery] string categoryId)
        {
            if (String.IsNullOrEmpty(categoryId))
            {
                return BadRequest();
            }

            var result = await _repository.GetSubcategories(categoryId);
            return Success(result);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetProduct([FromQuery] string categoryId, [FromQuery] string subcategoryId)
        {
            if (String.IsNullOrEmpty(categoryId) || String.IsNullOrEmpty(subcategoryId))
            {
                return BadRequest();
            }

            var result = await _repository.GetProducts(categoryId, subcategoryId);
            return Success(result);
        }
    }
}
