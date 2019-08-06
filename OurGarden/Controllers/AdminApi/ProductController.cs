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
        public readonly IOurGardenRepository _repository;
        public readonly ProductControllerService _service;

        public ProductController(IOurGardenRepository repository)
        {
            _repository = repository;
            _service = new ProductControllerService(_repository);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAll()
        {
            var products = await _repository.GetAllProducts();
            return Success(products);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetCategoryDictionary()
        {
            var result = await _repository.GetCategoryDictionaryAsync();
            return Success(result);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddOrUpdate([FromBody]ProductDTO productDTO)
        {
            try
            {
                var oldProduct = await _repository.GetProduct(productDTO.ProductId, productDTO.SubcategoryId, productDTO.CategoryId);
                if (
                    String.IsNullOrEmpty(productDTO.CategoryId)
                    || String.IsNullOrEmpty(productDTO.SubcategoryId)
                    || String.IsNullOrEmpty(productDTO.ProductId)
                )
                {
                    var photos = new List<Photo>();
                    var fileHelper = new FileHelper(_repository);
                    var file = await fileHelper.AddFileToRepository(productDTO.Url);
                    photos.Add(file);

                    var product = new Product()
                    {
                        CategoryId = productDTO.NewCategoryId,
                        SubcategoryId = productDTO.NewSubcategoryId,
                        ProductId = StringHelper.Transform(productDTO.Alias),
                        Alias = productDTO.Alias,
                        Price = productDTO.Price,
                        Description = productDTO.Description,
                        Photos = photos
                    };
                    await _repository.AddProduct(product);
                }
                else if (
                    productDTO.Alias != oldProduct?.Alias
                    || productDTO.CategoryId != productDTO.NewCategoryId
                    || productDTO.SubcategoryId != productDTO.NewSubcategoryId
                )
                {
                    var (isSuccess, error) = await _service.UpdateProduct(productDTO, oldProduct);

                    if (!isSuccess)
                    {
                        return BadRequest(error);
                    }
                }
                else
                {
                    var photos = new List<Photo>();
                    var fileHelper = new FileHelper(_repository);
                    var file = await fileHelper.AddFileToRepository(productDTO.Url);
                    photos.Add(file);

                    foreach (var photo in oldProduct.Photos)
                    {
                        _repository.DeleteFile(photo.PhotoId);
                    }

                    oldProduct.Price = productDTO.Price;
                    oldProduct.Description = productDTO.Description;
                    oldProduct.Photos = photos;

                    await _repository.UpdateProduct(oldProduct);
                }

                return Success(true);
            }
            catch (Exception)
            {
                return BadRequest("Что-то пошло не так, повторите попытку");
            }
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> Delete([FromQuery]string categoryId,
                                                [FromQuery]string subcategoryId,
                                                [FromQuery]string productId)
        {
            await _repository.DeleteProduct(productId, subcategoryId, categoryId);
            return Success(true);
        }
    }
}