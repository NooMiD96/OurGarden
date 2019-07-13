using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Core.Helpers;
using Database.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.DB;
using Model.DTO;

namespace Web.Controllers.AdminApi
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        public readonly IOurGardenRepository _repository;
        public ProductController(IOurGardenRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var products = _repository.GetAllProducts();
            return Ok(products);
        }

        [HttpGet("{categoryId}/{subcategoryId}/{productId}")]
        public async Task<IActionResult> GetProduct(
            [FromRoute]string categoryId,
            [FromRoute]string subcategoryId,
            [FromRoute]string productId)
        {
            var product = _repository.GetProduct( productId, subcategoryId, categoryId);

            if (product == null)
                return BadRequest();

            return Ok(product);
        }        

        [HttpPost]
        public async Task<IActionResult> AddProduct(
            [FromForm]ProductDTO productDTO)
        {
            if (!ModelState.IsValid || string.IsNullOrEmpty(productDTO.NewSubcategoryId) 
            || string.IsNullOrEmpty(productDTO.NewCategoryId) || !productDTO.AddPhotos.Any())
            {
                return BadRequest();
            }

            try
            {                
                var photos = new List<Photo>();
                foreach (var photo in productDTO.AddPhotos)
                {
                    var fileHelper = new FileHelper(_repository);
                    var file = fileHelper.AddFileToRepository(photo);
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
                _repository.AddProduct(product);

                return Ok(product);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }            
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProduct(
            [FromForm]ProductDTO productDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }
                var oldProduct = _repository.GetProduct( productDTO.ProductId, productDTO.SubcategoryId, productDTO.CategoryId);
                var files = oldProduct.Photos;


                foreach (var file in files.Where(x => productDTO.RemovePhotos.Any(y => x.PhotoId == y)))
                {
                    files.Remove(file);
                }
                foreach (var photo in productDTO.AddPhotos)
                {
                    var fileHelper = new FileHelper(_repository);
                    var file = fileHelper.AddFileToRepository(photo);
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
                    _repository.AddProduct(product);
                    _repository.DeleteSubcategory(oldProduct.SubcategoryId, oldProduct.CategoryId);
                }
                else if (productDTO.AddPhotos.Any() || productDTO.RemovePhotos.Any())
                {
                    oldProduct.Photos = files;
                    _repository.UpdateProduct(oldProduct);
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpDelete("{categoryId}/{subcategoryId}/{productId}")]
        public async Task<IActionResult> DeleteCategory(
            [FromRoute]string categoryId,
            [FromRoute]string subcategoryId,
            [FromRoute]string productId)
        {
            _repository.DeleteProduct(productId, subcategoryId, categoryId);
            return Ok();
        }
    }
}