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
        public readonly FileHelper _fileHelper;

        public CategoryController(IOurGardenRepository repository)
        {
            _repository = repository;
            _service = new CategoryControllerService(_repository);
            _fileHelper = new FileHelper(_repository);
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
        public async Task<IActionResult> AddOrUpdate([FromForm]CategoryDTO categoryDTO)
        {
            try
            {
                if (String.IsNullOrEmpty(categoryDTO.CategoryId))
                {
                    var file = await _fileHelper.AddFileToRepository(categoryDTO.File);

                    var category = new Category()
                    {
                        CategoryId = StringHelper.Transform(categoryDTO.Alias),

                        Alias = categoryDTO.Alias,

                        Photo = file
                    };

                    await _repository.AddCategory(category);
                }
                else
                {
                    var oldCategory = await _repository.GetCategory(categoryDTO.CategoryId);

                    if (oldCategory is null)
                        return BadRequest("Категория не найдена.");

                    if (categoryDTO.Alias != oldCategory.Alias)
                    {
                        var (isSuccess, error) = await _service.UpdateCategory(categoryDTO, oldCategory);

                        if (!isSuccess)
                            return BadRequest(error);
                    }
                    else if (categoryDTO.File != null)
                    {
                        var file = await _fileHelper.AddFileToRepository(categoryDTO.File);

                        await _fileHelper.RemoveFileFromRepository(oldCategory.Photo, updateDB: false);

                        oldCategory.Photo = file;

                        await _repository.UpdateCategory(oldCategory);
                    }
                }

                return Success(true);
            }
            catch (Exception)
            {
                return BadRequest("Что-то пошло не так, повторите попытку");
            }
        }


        [HttpDelete("[action]")]
        public async Task<IActionResult> Delete([FromBody]string categoryId)
        {
            var oldCategory = await _repository.GetCategory(categoryId);

            await _fileHelper.RemoveFileFromRepository(oldCategory.Photo, updateDB: false);

            await _repository.DeleteCategory(oldCategory);

            return Success(true);
        }
    }
}