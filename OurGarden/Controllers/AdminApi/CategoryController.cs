using Core.Constants;
using Core.Helpers;

using Database.Repositories;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Model.DB;
using Model.DTO;

using System;
using System.Threading.Tasks;

using Web.Services.Controllers.AdminApi;

namespace Web.Controllers.AdminApi
{
    [ValidateAntiForgeryToken]
    [Authorize(Roles = UserRoles.Admin + ", " + UserRoles.Employee)]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : BaseController
    {
        public readonly IOurGardenRepository _repository;
        public readonly CategoryControllerService _service;
        public CategoryController(IOurGardenRepository repository)
        {
            _repository = repository;
            _service = new CategoryControllerService(_repository);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> Get([FromQuery]string categoryId)
        {
            var category = await _repository.GetCategory(categoryId);

            if (category == null)
                return BadRequest("Что-то пошло не так, повторите попытку");

            return Success(category);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddOrUpdate(
            [FromBody]CategoryDTO categoryDTO)
        {
            if (categoryDTO.Url?.Length == 0)
            {
                return BadRequest("Загрузите фотографию!");
            }

            try
            {
                if (String.IsNullOrEmpty(categoryDTO.CategoryId))
                {
                    var fileHelper = new FileHelper(_repository);
                    var file = await fileHelper.AddFileToRepository(categoryDTO.Url);

                    var category = new Category()
                    {
                        Alias = categoryDTO.Alias,
                        CategoryId = StringHelper.Transform(categoryDTO.Alias),
                        Photo = file
                    };
                    await _repository.AddCategory(category);

                    return Success(category);
                }
                else
                {
                    var oldCategory = await _repository.GetCategory(categoryDTO.CategoryId);

                    if (categoryDTO.Alias != oldCategory.Alias)
                    {
                        var (isSuccess, error) = await _service.UpdateCategory(categoryDTO, oldCategory);

                        if (!isSuccess)
                        {
                            return BadRequest(error);
                        }
                    }
                    else if (categoryDTO.Url != oldCategory.Photo.Url)
                    {
                        var file = oldCategory.Photo;
                        var fileHelper = new FileHelper(_repository);
                        file = await fileHelper.AddFileToRepository(categoryDTO.Url);
                        if (categoryDTO.Alias == oldCategory.Alias)
                        {
                            oldCategory.Photo = file;
                            await _repository.UpdateCategory(oldCategory);
                            return Success(true);
                        }
                    }

                    return Success(true);
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Что-то пошло не так, повторите попытку");
            }
        }


        [HttpDelete("[action]")]
        public async Task<IActionResult> Delete(
            [FromBody]string categoryId)
        {
            await _repository.DeleteCategory(categoryId);
            return Success(true);
        }
    }
}