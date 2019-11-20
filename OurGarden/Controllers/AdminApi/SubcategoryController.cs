using Core.Constants;
using Core.Helpers;

using Database.Repositories;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using Model.DTO.Subcategory;

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
    public class SubcategoryController : BaseController
    {
        private readonly IOurGardenRepository _repository;
        private readonly SubcategoryControllerService _service;
        private readonly ILogger _logger;
        private const string CONTROLLER_LOCATE = "AdminApi.SubcategoryController";
        private const string ERROR = "Что-то пошло не так, повторите попытку.";

        public SubcategoryController(IOurGardenRepository repository,
                                     ILogger<SubcategoryController> logger)
        {
            _repository = repository;
            _logger = logger;
            _service = new SubcategoryControllerService(_repository, logger);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetSubcategories()
        {
            var subcategories = (await _repository.GetSubcategories())
                .OrderBy(x => x.CategoryId)
                .ThenBy(x => x.SubcategoryId);

            foreach (var entity in subcategories)
            {
                entity.Photos = entity.Photos.OrderBy(x => x.Date).ToList();
            }

            var categories = await _repository.GetSimpleCategories();

            var result = new
            {
                Categories = categories,
                Subcategories = subcategories
            };

            return Success(result);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddOrUpdate([FromForm]SubcategoryDTO subcategoryDTO)
        {
            const string API_LOCATE = CONTROLLER_LOCATE + ".AddOrUpdate";
            var error = ERROR;

            try
            {
                bool isSuccess;

                if (
                    String.IsNullOrEmpty(subcategoryDTO?.CategoryId)
                    || String.IsNullOrEmpty(subcategoryDTO?.SubcategoryId))
                {
                    (isSuccess, error) = await _service.AddSubcategory(subcategoryDTO);
                }
                else
                {
                    var oldSubcategory = await _repository.GetSubcategory(subcategoryDTO.CategoryId, subcategoryDTO.SubcategoryId);

                    if (oldSubcategory is null)
                    {
                        return LogBadRequest(
                            _logger,
                            API_LOCATE,
                            $"Что-то пошло не так, не удалось найти подкатегорию.\n\tКатегория: {subcategoryDTO.CategoryId}\n\tПодкатегория: {subcategoryDTO.SubcategoryId}"
                        );
                    }

                    if (
                        subcategoryDTO.Alias.TransformToId() != oldSubcategory.Alias.TransformToId()
                        || subcategoryDTO.CategoryId != subcategoryDTO.NewCategoryId
                    )
                        (isSuccess, error) = await _service.FullUpdateSubcategory(subcategoryDTO, oldSubcategory);
                    else
                        (isSuccess, error) = await _service.UpdateSubcategory(subcategoryDTO, oldSubcategory);
                }

                if (!isSuccess)
                    return LogBadRequest(
                        _logger,
                        API_LOCATE,
                        error
                    );

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
        public async Task<IActionResult> Delete([FromQuery]string categoryId,
                                                [FromQuery]string subcategoryId)
        {
            const string API_LOCATE = CONTROLLER_LOCATE + ".Delete";

            var isSuccess = await _service.DeleteSubcategory(categoryId, subcategoryId);

            if (isSuccess)
                return Success(isSuccess);
            else
                return LogBadRequest(
                    _logger,
                    API_LOCATE,
                    $"Что-то пошло не так, не удалось удалить подкатегорию.\n\tКатегория: {categoryId}\n\tПодкатегория: {subcategoryId}"
                );
        }
    }
}