using ApiService.Abstraction.DTO;

using Core.Constants;
using Core.Helpers;

using DataBase.Abstraction.Repositories;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

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
        private readonly ILogger _logger;
        private const string CONTROLLER_LOCATE = "AdminApi.CategoryController";
        private const string ERROR = "Что-то пошло не так, повторите попытку.";

        public CategoryController(IOurGardenRepository repository,
                                  ILogger<CategoryController> logger)
        {
            _repository = repository;
            _logger = logger;
            _service = new CategoryControllerService(_repository, logger);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetCategories()
        {
            var result = (await _repository.GetCategories(isGetOnlyVisible: false))
                .OrderBy(x => x.CategoryId);

            foreach (var category in result)
            {
                category.Photos = category.Photos.OrderBy(x => x.Date).ToList();
            }

            return Success(result);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddOrUpdate([FromForm]CategoryDTO categoryDTO)
        {
            const string API_LOCATE = CONTROLLER_LOCATE + ".AddOrUpdate";
            var error = ERROR;

            try
            {
                bool isSuccess;

                if (String.IsNullOrEmpty(categoryDTO?.CategoryId))
                {
                    (isSuccess, error) = await _service.AddCategory(categoryDTO);
                }
                else
                {
                    var oldCategory = await _repository.GetCategory(categoryDTO.CategoryId);

                    if (oldCategory is null)
                        return LogBadRequest(
                            _logger,
                            API_LOCATE,
                            customeError: $"Что-то пошло не так, не удалось найти категорию.\n\tКатегория: {categoryDTO.CategoryId}"
                        );

                    if (categoryDTO.Alias.TransformToId() != oldCategory.Alias.TransformToId())
                        (isSuccess, error) = await _service.FullUpdateCategory(categoryDTO, oldCategory);
                    else
                        (isSuccess, error) = await _service.UpdateCategory(categoryDTO, oldCategory);
                }

                if (!isSuccess)
                    return LogBadRequest(
                        _logger,
                        API_LOCATE,
                        customeError: error
                    );

                return Success(isSuccess);
            }
            catch (Exception ex)
            {
                return LogBadRequest(
                    _logger,
                    API_LOCATE,
                    exception: ex,
                    customeError: error
                );
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Delete([FromQuery]string categoryId)
        {
            const string API_LOCATE = CONTROLLER_LOCATE + ".Delete";

            var (isSuccess, error) = await _service.DeleteCategory(categoryId);

            if (isSuccess)
                return Success(isSuccess);
            else
                return LogBadRequest(
                    _logger,
                    API_LOCATE,
                    customeError: error
                );
        }
    }
}