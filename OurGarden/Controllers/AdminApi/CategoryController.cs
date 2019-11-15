using Core.Constants;
using Core.Helpers;

using Database.Repositories;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using Model.DB;
using Model.DTO;

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
    public class CategoryController : BaseController
    {
        private readonly IOurGardenRepository _repository;
        private readonly CategoryControllerService _service;
        private readonly FileHelper _fileHelper;
        private readonly ILogger _logger;
        private const string CONTROLLER_LOCATE = "AdminApi.CategoryController";

        public CategoryController(IOurGardenRepository repository,
                                  ILogger<CategoryController> logger)
        {
            _repository = repository;
            _service = new CategoryControllerService(_repository, _logger);
            _fileHelper = new FileHelper(_repository);
            _logger = logger;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetCategories()
        {
            var result = await _repository.GetCategories(isGetOnlyVisible: false);

            return Success(result.OrderBy(x => x.CategoryId));
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddOrUpdate([FromForm]CategoryDTO categoryDTO)
        {
            var error = "Что-то пошло не так, повторите попытку.";
            const string API_LOCATE = CONTROLLER_LOCATE + ".AddOrUpdate";

            try
            {
                bool isSuccess;
                if (String.IsNullOrEmpty(categoryDTO?.CategoryId))
                {
                    var file = await _fileHelper.AddFileToRepository(categoryDTO.File);

                    var category = new Category()
                    {
                        CategoryId = categoryDTO.Alias.TransformToId(),

                        Alias = categoryDTO.Alias,
                        IsVisible = categoryDTO.IsVisible ?? true,

                        Photo = file
                    };

                    (isSuccess, error) = await _repository.AddCategory(category);
                }
                else
                {
                    var oldCategory = await _repository.GetCategory(categoryDTO.CategoryId);

                    if (oldCategory is null)
                    {
                        return LogBadRequest(
                            _logger,
                            API_LOCATE,
                            $"Что-то пошло не так, не удалось найти категорию.\n\tКатегория: {categoryDTO.CategoryId}"
                        );
                    }

                    if (categoryDTO.Alias.TransformToId() != oldCategory.Alias.TransformToId())
                    {
                        (isSuccess, error) = await _service.UpdateCategory(categoryDTO, oldCategory);
                    }
                    else
                    {
                        if (categoryDTO.File != null)
                        {
                            var file = await _fileHelper.AddFileToRepository(categoryDTO.File);

                            await _fileHelper.RemoveFileFromRepository(oldCategory.Photo, updateDB: false);

                            oldCategory.Photo = file;

                        }

                        oldCategory.Alias = categoryDTO.Alias;
                        oldCategory.IsVisible = categoryDTO.IsVisible ?? true;

                        (isSuccess, error) = await _repository.UpdateCategory(oldCategory);
                    }
                }

                if (!isSuccess)
                {
                    return BadRequest(error);
                }

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
        public async Task<IActionResult> Delete([FromQuery]string categoryId)
        {
            var oldCategory = await _repository.GetCategory(categoryId);

            await _fileHelper.RemoveFileFromRepository(oldCategory.Photo, updateDB: false);

            await _repository.DeleteCategory(oldCategory);

            return Success(true);
        }
    }
}