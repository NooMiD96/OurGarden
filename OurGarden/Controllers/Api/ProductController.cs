using Core;

using Database.Repositories;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

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
        private readonly ILogger _logger;
        private const string API_LOCATE = "Api.ProductController";

        public ProductController([FromServices] IOurGardenRepository repository,
                                 ILogger<SearchController> logger)
        {
            _repository = repository;
            _logger = logger;
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
                var error = "Что-то пошло не так, необходимо выбрать категорию с подкатегорией.";

                _logger.LogError($"{DateTime.Now}:\n\t{API_LOCATE}.GetProducts\n\t{error}");
                return BadRequest(error);
            }

            var subcategory = (await _repository.GetSubcategory(categoryId, subcategoryId)).DeepClone();
            var products = await _repository.GetProducts(categoryId, subcategoryId, isGetOnlyVisible: true);

            if (subcategory is null)
            {
                var error = $"Что-то пошло не так, не удалось найти выбранную подкатегорию.\n\tКатегория: {categoryId}\n\tПодкатегория: {subcategoryId}";

                _logger.LogError($"{DateTime.Now}:\n\t{API_LOCATE}.GetSubcategories\n\t{error}");
                return BadRequest(error);
            }

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
            {
                var error = "Что-то пошло не так, необходимо выбрать категорию, подкатегорию и товар.";

                _logger.LogError($"{DateTime.Now}:\n\t{API_LOCATE}.GetProduct\n\t{error}");
                return BadRequest(error);
            }

            var product = await _repository.GetProduct(categoryId, subcategoryId, productId);

            if (product == null)
            {
                var error = $"Что-то пошло не так, не удалось найти выбранный товар.\n\tКатегория: {categoryId}\n\tПодкатегория: {subcategoryId}\n\tТовар: {productId}";

                _logger.LogError($"{DateTime.Now}:\n\t{API_LOCATE}.GetProduct\n\t{error}");
                return BadRequest(error);
            }

            return Success(product);
        }
    }
}
