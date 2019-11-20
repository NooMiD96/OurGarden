using Core.Constants;
using Core.Helpers;

using Database.Repositories;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using Model.DTO.ProductDTO;

using System;
using System.Linq;
using System.Threading.Tasks;

using Web.Services.Controllers.AdminApi;

namespace Web.Controllers.AdminApi
{
    [ValidateAntiForgeryToken]
    [Authorize(Roles = UserRoles.Admin + ", " + UserRoles.Employee)]
    [Route("apiAdmin/[controller]")]
    [ApiController]
    public class ProductController : BaseController
    {
        private readonly IOurGardenRepository _repository;
        private readonly ProductControllerService _service;
        private readonly ILogger _logger;
        private const string CONTROLLER_LOCATE = "AdminApi.ProductController";
        private const string ERROR = "Что-то пошло не так, повторите попытку.";

        public ProductController(IOurGardenRepository repository,
                                 ILogger<ProductController> logger)
        {
            _repository = repository;
            _logger = logger;
            _service = new ProductControllerService(repository, logger);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _repository.GetProducts();

            return Success(
                products
                    .OrderBy(x => x.CategoryId)
                    .ThenBy(x => x.SubcategoryId)
                    .ThenBy(x => x.ProductId)
            );
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetCategoryDictionary()
        {
            var result = await _repository.GetSimpleCategories(includeSubcategory: true);
            return Success(result);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddOrUpdate([FromForm]ProductDTO productDTO)
        {
            const string API_LOCATE = CONTROLLER_LOCATE + ".AddOrUpdate";
            var error = ERROR;

            try
            {
                bool isSuccess;

                if (
                    String.IsNullOrEmpty(productDTO?.CategoryId)
                    || String.IsNullOrEmpty(productDTO?.SubcategoryId)
                    || String.IsNullOrEmpty(productDTO?.ProductId)
                )
                {
                    (isSuccess, error) = await _service.AddProduct(productDTO);
                }
                else
                {
                    var oldProduct = await _repository.GetProduct(productDTO.CategoryId, productDTO.SubcategoryId, productDTO.ProductId);

                    if (oldProduct is null)
                    {
                        return LogBadRequest(
                            _logger,
                            API_LOCATE,
                            $"Что-то пошло не так, не удалось найти товар.\n\tКатегория: {productDTO.CategoryId}\n\tПодкатегория: {productDTO.SubcategoryId}\n\tТовар: {productDTO.ProductId}"
                        );
                    }

                    if (
                        productDTO.Alias.TransformToId() != oldProduct.Alias.TransformToId()
                        || productDTO.CategoryId != productDTO.NewCategoryId
                        || productDTO.SubcategoryId != productDTO.NewSubcategoryId
                    )
                    {
                        (isSuccess, error) = await _service.FullUpdateProduct(productDTO, oldProduct);
                    }
                    else
                    {
                        (isSuccess, error) = await _service.UpdateProduct(productDTO, oldProduct);
                    }
                }

                if (!isSuccess)
                    return LogBadRequest(
                        _logger,
                        API_LOCATE,
                        error
                    );

                return Success(isSuccess);
            }
            catch (Exception ex)
            {
                return LogBadRequest(
                    _logger,
                    API_LOCATE,
                    ex,
                    error
                );
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Delete([FromQuery]string categoryId,
                                                [FromQuery]string subcategoryId,
                                                [FromQuery]string productId)
        {
            const string API_LOCATE = CONTROLLER_LOCATE + ".Delete";

            var (isSuccess, error) = await _service.DeleteProduct(categoryId, subcategoryId, productId);

            if (isSuccess)
                return Success(isSuccess);
            else
                return LogBadRequest(
                    _logger,
                    API_LOCATE,
                    error
                );
        }
    }
}