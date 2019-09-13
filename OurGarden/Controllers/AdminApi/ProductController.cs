using Core.Constants;
using Core.Helpers;

using Database.Repositories;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Model.DB;
using Model.DTO.ProductDTO;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Web.Services.Controllers.AdminApi;

namespace Web.Controllers.AdminApi
{
    [ValidateAntiForgeryToken]
    [Authorize(Roles = UserRoles.Admin + ", " + UserRoles.Employee)]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : BaseController
    {
        private readonly IOurGardenRepository _repository;
        private readonly ProductControllerService _service;
        private readonly FileHelper _fileHelper;

        public ProductController(IOurGardenRepository repository)
        {
            _repository = repository;
            _service = new ProductControllerService(_repository);
            _fileHelper = new FileHelper(_repository);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAll()
        {
            var products = await _repository.GetAllProducts();

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
            var result = await _repository.GetCategoryDictionaryAsync();
            return Success(result);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddOrUpdate([FromForm]ProductDTO productDTO)
        {
            try
            {
                if (
                    String.IsNullOrEmpty(productDTO?.CategoryId)
                    || String.IsNullOrEmpty(productDTO?.SubcategoryId)
                    || String.IsNullOrEmpty(productDTO?.ProductId)
                )
                {
                    var photos = new List<Photo>();
                    var file = await _fileHelper.AddFileToRepository(productDTO.File);
                    photos.Add(file);

                    var product = new Product()
                    {
                        CategoryId = productDTO.NewCategoryId,
                        SubcategoryId = productDTO.NewSubcategoryId,
                        ProductId = productDTO.Alias.TransformToId(),

                        Alias = productDTO.Alias,
                        Price = productDTO.Price,
                        Description = productDTO.Description,

                        Photos = photos
                    };

                    await _repository.AddProduct(product);
                }
                else
                {
                    var oldProduct = await _repository.GetProduct(productDTO.ProductId, productDTO.SubcategoryId, productDTO.CategoryId);

                    if (oldProduct is null)
                        return BadRequest("Товар не найден.");

                    if (
                        productDTO.Alias != oldProduct.Alias
                        || productDTO.CategoryId != productDTO.NewCategoryId
                        || productDTO.SubcategoryId != productDTO.NewSubcategoryId
                    )
                    {
                        var (isSuccess, error) = await _service.UpdateProduct(productDTO, oldProduct);

                        if (!isSuccess)
                            return BadRequest(error);
                    }
                    else
                    {
                        if (productDTO.File != null)
                        {
                            var photos = new List<Photo>();
                            var file = await _fileHelper.AddFileToRepository(productDTO.File);
                            photos.Add(file);

                            foreach (var photo in oldProduct.Photos)
                                await _fileHelper.RemoveFileFromRepository(photo, updateDB: false);

                            oldProduct.Photos = photos;
                        }

                        oldProduct.Price = productDTO.Price;
                        oldProduct.Description = productDTO.Description;

                        await _repository.UpdateProduct(oldProduct);
                    }
                }

                return Success(true);
            }
            catch (Exception)
            {
                return BadRequest("Что-то пошло не так, повторите попытку");
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Delete([FromQuery]string categoryId,
                                                [FromQuery]string subcategoryId,
                                                [FromQuery]string productId)
        {
            var product = await _repository.GetProduct(productId, subcategoryId, categoryId);

            foreach (var photo in product.Photos)
                await _fileHelper.RemoveFileFromRepository(photo, updateDB: false);

            await _repository.DeleteProduct(product);

            return Success(true);
        }
    }
}