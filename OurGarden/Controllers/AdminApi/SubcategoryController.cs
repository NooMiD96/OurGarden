using Core.Constants;
using Core.Helpers;

using Database.Repositories;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
    public class SubcategoryController : BaseController
    {
        private readonly IOurGardenRepository _repository;
        private readonly SubcategoryControllerService _service;
        private readonly FileHelper _fileHelper;

        public SubcategoryController(IOurGardenRepository repository)
        {
            _repository = repository;
            _service = new SubcategoryControllerService(_repository);
            _fileHelper = new FileHelper(_repository);
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
                        return BadRequest("Подкатегория не найдена.");

                    if (
                        subcategoryDTO.Alias != oldSubcategory.Alias
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
                Console.Error.WriteLine($"err: {ex.Message}");
                return BadRequest($"{error}. Ошибка: {ex.Message}");
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