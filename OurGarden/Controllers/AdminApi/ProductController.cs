using Core.Constants;
using Core.Helpers;

using Database.Repositories;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Model.DB;
using Model.DTO;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Controllers.AdminApi
{
    [ValidateAntiForgeryToken]
    [Authorize(Roles = UserRoles.Admin + ", " + UserRoles.Employee)]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : BaseController
    {
        public readonly IOurGardenRepository _repository;
        public ProductController(IOurGardenRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAll()
        {
            var products = await _repository.GetAllProducts();
            return Success(products);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Add(
            [FromForm]ProductDTO productDTO)
        {
            if (!ModelState.IsValid
                || String.IsNullOrEmpty(productDTO.NewSubcategoryId)
                || String.IsNullOrEmpty(productDTO.NewCategoryId) || !productDTO.AddPhotos.Any()
            )
            {
                return BadRequest("Что-то пошло не так, повторите попытку");
            }

            try
            {
                var photos = new List<Photo>();
                foreach (var photo in productDTO.AddPhotos)
                {
                    var fileHelper = new FileHelper(_repository);
                    var file = await fileHelper.AddFileToRepository(photo);
                    photos.Add(file);
                }

                var product = new Product()
                {
                    Alias = productDTO.Alias,
                    ProductId = StringHelper.Transform(productDTO.Alias),
                    SubcategoryId = productDTO.NewSubcategoryId,
                    CategoryId = productDTO.NewCategoryId,
                    Photos = photos
                };
                await _repository.AddProduct(product);

                return Success(product);
            }
            catch (Exception)
            {
                return BadRequest("Что-то пошло не так, повторите попытку");
            }
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> Update(
            [FromForm]ProductDTO productDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest("Что-то пошло не так, повторите попытку");
                }
                var oldProduct = await _repository.GetProduct(productDTO.ProductId, productDTO.SubcategoryId, productDTO.CategoryId);
                var files = oldProduct.Photos;


                foreach (var file in files.Where(x => productDTO.RemovePhotos.Any(y => x.PhotoId == y)))
                {
                    files.Remove(file);
                }
                foreach (var photo in productDTO.AddPhotos)
                {
                    var fileHelper = new FileHelper(_repository);
                    var file = await fileHelper.AddFileToRepository(photo);
                    files.Add(file);
                }

                if (productDTO.Alias != oldProduct.Alias
                    || productDTO.SubcategoryId != productDTO.NewSubcategoryId
                    || productDTO.CategoryId != productDTO.NewCategoryId)
                {
                    var product = new Product()
                    {
                        Alias = productDTO.Alias,
                        ProductId = StringHelper.Transform(productDTO.Alias),
                        SubcategoryId = productDTO.NewSubcategoryId,
                        CategoryId = productDTO.NewCategoryId,
                        Photos = files
                    };
                    await _repository.AddProduct(product);
                    await _repository.DeleteSubcategory(oldProduct.SubcategoryId, oldProduct.CategoryId);
                }
                else if (productDTO.AddPhotos.Any() || productDTO.RemovePhotos.Any())
                {
                    oldProduct.Photos = files;
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
        public async Task<IActionResult> Delete(
            [FromQuery]string categoryId,
            [FromQuery]string subcategoryId,
            [FromQuery]string productId)
        {
            await _repository.DeleteProduct(productId, subcategoryId, categoryId);
            return Success(true);
        }
    }
}