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
        private readonly FileHelper _fileHelper;
        private readonly ILogger _logger;
        private const string CONTROLLER_LOCATE = "AdminApi.SubcategoryController";

        public SubcategoryController(IOurGardenRepository repository,
                                     ILogger<SubcategoryController> logger)
        {
            _repository = repository;
            _service = new SubcategoryControllerService(_repository, _logger);
            _fileHelper = new FileHelper(_repository);
            _logger = logger;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetSubcategories()
        {
            var subcategories = await _repository.GetSubcategories();
            var categories = await _repository.GetSimpleCategories();
            var result = new
            {
                Categories = categories,
                Subcategories = subcategories.OrderBy(x => x.CategoryId).ThenBy(x => x.SubcategoryId)
            };
            return Success(result);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddOrUpdate([FromForm]SubcategoryDTO subcategoryDTO)
        {
            var error = "Что-то пошло не так, повторите попытку";
            const string API_LOCATE = CONTROLLER_LOCATE + ".AddOrUpdate";

            try
            {
                bool isSuccess;

                if (
                    String.IsNullOrEmpty(subcategoryDTO?.CategoryId)
                    || String.IsNullOrEmpty(subcategoryDTO?.SubcategoryId))
                {
                    (isSuccess, error) = await _service.CreateSubcategory(subcategoryDTO);
                }
                else
                {
                    //Update Old
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
                    {
                        (isSuccess, error) = await _service.UpdateSubcategory(subcategoryDTO, oldSubcategory);
                    }
                    else
                    {
                        if (subcategoryDTO.File != null)
                        {
                            var file = await _fileHelper.AddFileToRepository(subcategoryDTO.File);

                            await _fileHelper.RemoveFileFromRepository(oldSubcategory.Photo, updateDB: false);

                            oldSubcategory.Photo = file;
                        }

                        oldSubcategory.Alias = subcategoryDTO.Alias;
                        oldSubcategory.IsVisible = subcategoryDTO.IsVisible ?? true;

                        (isSuccess, error) = await _repository.UpdateSubcategory(oldSubcategory);
                    }
                }

                if (!isSuccess)
                    return BadRequest(error);

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
            var oldSubcategory = await _repository.GetSubcategory(categoryId, subcategoryId);

            await _fileHelper.RemoveFileFromRepository(oldSubcategory.Photo, updateDB: false);

            await _repository.DeleteSubcategory(oldSubcategory);

            return Success(true);
        }
    }
}