using Core;
using Database.Repositories;

using Microsoft.AspNetCore.Mvc;

using Model.Breadcrumb;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : BaseController
    {
        private readonly IOurGardenRepository _repository;

        public ProductController([FromServices] IOurGardenRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetBreadcrumb([FromQuery] string categoryId,
                                                       [FromQuery] string subcategoryId,
                                                       [FromQuery] string productId)
        {
            var breadcrumb = String.IsNullOrEmpty(productId)
                ? await _repository.GetProductBreadcrumb(categoryId, subcategoryId)
                : await _repository.GetProductBreadcrumb(categoryId, subcategoryId, productId);
            var order = 1;

            var breadcrumbList = new List<Breadcrumb>()
            {
                new Breadcrumb()
                {
                    DisplayName = "Каталог",
                    Url = "Catalog",
                    Order = order++,
                },
            };

            breadcrumbList.AddRange(
                breadcrumb.Select(x =>
                {
                    x.Order = order++;
                    return x;
                })
            );

            return Success(breadcrumbList);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetProducts([FromQuery] string categoryId, [FromQuery] string subcategoryId)
        {
            if (String.IsNullOrEmpty(categoryId) || String.IsNullOrEmpty(subcategoryId))
            {
                return BadRequest("Что-то пошло не так, необходимо выбрать категорию с подкатегорией");
            }

            var subcategory = (await _repository.GetSubcategory(categoryId, subcategoryId)).DeepClone();
            var products = await _repository.GetProducts(categoryId, subcategoryId, isGetOnlyVisible: true);

            subcategory.Products = products
                .OrderBy(x => x.ProductId)
                .Select(x =>
                {
                    x.Subcategory = null;
                    return x;
                })
                .ToList();

            return Success(subcategory);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetProduct([FromQuery]string categoryId,
                                                    [FromQuery]string subcategoryId,
                                                    [FromQuery]string productId)
        {

            if (String.IsNullOrEmpty(categoryId) || String.IsNullOrEmpty(subcategoryId) || String.IsNullOrEmpty(productId))
                return BadRequest("Что-то пошло не так, необходимо выбрать категорию, подкатегорию и товар");

            var product = await _repository.GetProduct(categoryId, subcategoryId, productId);

            if (product == null)
                return BadRequest("Что-то пошло не так, повторите попытку");

            return Success(product);
        }
    }
}
