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
    public class CategoryController : ControllerBase
    {
        public readonly IOurGardenRepository _repository;
        public CategoryController(IOurGardenRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            var categories = _repository.GetCategories();
            return Ok(categories);
        }

        [HttpGet("{categoryId}")]
        public async Task<IActionResult> GetCategory(
            [FromRoute]string categoryId)
        {
            var category = _repository.GetCategory(categoryId);

            if (category == null)
                return BadRequest();

            return Ok(category);
        }        

        [HttpPost]
        public async Task<IActionResult> AddCategory(
            [FromForm]CategoryDTO categoryDTO)
        {
            if (!ModelState.IsValid || categoryDTO.Photo.Length == 0)
            {
                return BadRequest();
            }

            try
            {
                var fileHelper = new FileHelper(_repository);
                var file = fileHelper.AddFileToRepository(categoryDTO.Photo);

                var category = new Category()
                {
                    Alias = categoryDTO.Alias,
                    CategoryId = StringHelper.Transform(categoryDTO.Alias),
                    Photo = file
                };
                _repository.AddCategory(category);

                return Ok(category);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }            
        }

        [HttpPut]
        public async Task<IActionResult> UpdateCategory(
            [FromForm]CategoryDTO categoryDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }
                var oldCategory = _repository.GetCategory(categoryDTO.CategoryId);
                var file = oldCategory.Photo;

                if (categoryDTO.Photo?.Length != 0)
                {
                    var fileHelper = new FileHelper(_repository);
                    file = fileHelper.AddFileToRepository(categoryDTO.Photo);
                }

                if (categoryDTO.Alias != oldCategory.Alias)
                {
                    var category = new Category()
                    {
                        Alias = categoryDTO.Alias,
                        CategoryId = StringHelper.Transform(categoryDTO.Alias),
                        Photo = file
                    };
                    _repository.AddCategory(category);
                    _repository.DeleteCategory(oldCategory.CategoryId);
                }
                else if (categoryDTO.Photo?.Length != 0)
                {
                    oldCategory.Photo = file;
                    _repository.UpdateCategory(oldCategory);
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpDelete("{categoryId}")]
        public async Task<IActionResult> DeleteCategory(
            [FromRoute]string categoryId)
        {
            _repository.DeleteCategory(categoryId);
            return Ok();
        }
    }
}