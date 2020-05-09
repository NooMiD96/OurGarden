using ApiService.Abstraction.DTO;

using Core;

using DataBase.Abstraction;
using DataBase.Abstraction.Repositories;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

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
        private const string CONTROLLER_LOCATE = "Api.ProductController";

        public ProductController(IOurGardenRepository repository,
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
            const string API_LOCATE = CONTROLLER_LOCATE + ".GetBreadcrumb";

            if (String.IsNullOrEmpty(categoryId) || String.IsNullOrEmpty(subcategoryId))
            {
                return LogBadRequest(
                    _logger,
                    API_LOCATE,
                    customeError: $"Что-то пошло не так, не удалось получить Breadcrumb."
                );
            }

            var breadcrumb = String.IsNullOrEmpty(productId)
                ? await _repository.GetProductBreadcrumb(categoryId, subcategoryId)
                : await _repository.GetProductBreadcrumb(categoryId, subcategoryId, productId);

            var order = 1;

            var breadcrumbList = new List<IBreadcrumb>()
            {
                new BreadcrumbDTO()
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
            const string API_LOCATE = CONTROLLER_LOCATE + ".GetProducts";

            if (String.IsNullOrEmpty(categoryId) || String.IsNullOrEmpty(subcategoryId))
            {
                return LogBadRequest(
                    _logger,
                    API_LOCATE,
                    customeError: "Что-то пошло не так, необходимо выбрать категорию с подкатегорией."
                );
            }

            var subcategory = (await _repository.GetSubcategory(categoryId, subcategoryId)).DeepClone();

            if (subcategory is null)
            {
                return LogBadRequest(
                    _logger,
                    API_LOCATE,
                    customeError: $"Что-то пошло не так, не удалось найти выбранную подкатегорию.\n\tКатегория: {categoryId}\n\tПодкатегория: {subcategoryId}",
                    returnStatusCode: 404
                );
            }

            var products = await _repository.GetProducts(categoryId, subcategoryId, isGetOnlyVisible: true);

            subcategory.Products = products
                .OrderBy(x => x.Alias)
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
            const string API_LOCATE = CONTROLLER_LOCATE + ".GetProduct";

            if (String.IsNullOrEmpty(categoryId) || String.IsNullOrEmpty(subcategoryId) || String.IsNullOrEmpty(productId))
            {
                return LogBadRequest(
                    _logger,
                    API_LOCATE,
                    customeError: "Что-то пошло не так, необходимо выбрать категорию, подкатегорию и товар."
                );
            }

            var product = await _repository.GetProduct(categoryId, subcategoryId, productId);

            if (product == null)
            {
                return LogBadRequest(
                    _logger,
                    API_LOCATE,
                    customeError: $"Что-то пошло не так, не удалось найти выбранный товар.\n\tКатегория: {categoryId}\n\tПодкатегория: {subcategoryId}\n\tТовар: {productId}",
                    returnStatusCode: 404
                );
            }

            return Success(product);
        }
    }
}
