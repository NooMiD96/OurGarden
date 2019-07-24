using Core.Constants;
using Core.Helpers;

using Database.Repositories;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Model.DB;
using Model.DTO;

using System;
using System.Threading.Tasks;

namespace Web.Controllers.AdminApi
{
    [ValidateAntiForgeryToken]
    [Authorize(Roles = UserRoles.Admin + ", " + UserRoles.Employee)]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : BaseController
    {
        public readonly IOurGardenRepository _repository;
        public CategoryController(IOurGardenRepository repository)
        {
            _repository = repository;
        }        

        [HttpGet("[action]")]
        public async Task<IActionResult> Get(
            [FromQuery]string categoryId)
        {
            var category = await _repository.GetCategory(categoryId);

            if (category == null)
                return BadRequest("Что-то пошло не так, повторите попытку");

            return Success(category);
        }        

        [HttpPost("[action]")]
        public async Task<IActionResult> Add(
            [FromForm]CategoryDTO categoryDTO)
        {
            if (!ModelState.IsValid || categoryDTO.Photo?.Length == 0)
            {
                return BadRequest("Что-то пошло не так, повторите попытку");
            }

            try
            {
                var fileHelper = new FileHelper(_repository);
                var file = await fileHelper.AddFileToRepository(categoryDTO.Photo);

                var category = new Category()
                {
                    Alias = categoryDTO.Alias,
                    CategoryId = StringHelper.Transform(categoryDTO.Alias),
                    Photo = file
                };
                await _repository.AddCategory(category);

                return Success(category);
            }
            catch (Exception)
            {
                return BadRequest("Что-то пошло не так, повторите попытку");
            }            
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> Update(
            [FromForm]CategoryDTO categoryDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest("Что-то пошло не так, повторите попытку");
                }
                var oldCategory = await _repository.GetCategory(categoryDTO.CategoryId);
                var file = oldCategory.Photo;

                if (categoryDTO.Photo?.Length != 0)
                {
                    var fileHelper = new FileHelper(_repository);
                    file = await fileHelper.AddFileToRepository(categoryDTO.Photo);
                }

                if (categoryDTO.Alias != oldCategory.Alias)
                {
                    var category = new Category()
                    {
                        Alias = categoryDTO.Alias,
                        CategoryId = StringHelper.Transform(categoryDTO.Alias),
                        Photo = file
                    };
                    await _repository.AddCategory(category);
                    await _repository.DeleteCategory(oldCategory.CategoryId);
                }
                else if (categoryDTO.Photo?.Length != 0)
                {
                    oldCategory.Photo = file;
                    await _repository.UpdateCategory(oldCategory);
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
            [FromQuery]string categoryId)
        {
            await _repository.DeleteCategory(categoryId);
            return Success(true);
        }
    }
}