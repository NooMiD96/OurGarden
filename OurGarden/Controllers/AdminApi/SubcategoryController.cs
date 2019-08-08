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
    public class SubcategoryController : BaseController
    {
        public readonly IOurGardenRepository _repository;
        public readonly SubcategoryControllerService _service;
        public readonly FileHelper _fileHelper;

        public SubcategoryController(IOurGardenRepository repository)
        {
            _repository = repository;
            _service = new SubcategoryControllerService(_repository);
            _fileHelper = new FileHelper(_repository);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAll()
        {
            var subcategories = await _repository.GetAllSubcategories();
            var categories = await _repository.GetSimpleCategories();
            var result = new
            {
                Categories = categories,
                Subcategories = subcategories
            };
            return Success(result);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> Get([FromQuery]string categoryId,
                                             [FromQuery]string subcategoryId)
        {
            var subcategory = await _repository.GetSubcategory(subcategoryId, categoryId);

            if (subcategory == null)
                return BadRequest("Что-то пошло не так, повторите попытку");

            return Success(subcategory);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddOrUpdate([FromForm]SubcategoryDTO subcategoryDTO)
        {
            try
            {
                if (
                    String.IsNullOrEmpty(subcategoryDTO.CategoryId)
                    || String.IsNullOrEmpty(subcategoryDTO.SubcategoryId))
                {
                    var file = await _fileHelper.AddFileToRepository(subcategoryDTO.File);

                    var subcategory = new Subcategory()
                    {
                        CategoryId = subcategoryDTO.NewCategoryId,
                        SubcategoryId = StringHelper.Transform(subcategoryDTO.Alias),

                        Alias = subcategoryDTO.Alias,

                        Photo = file
                    };

                    await _repository.AddSubcategory(subcategory);
                }
                else
                {
                    var oldSubcategory = await _repository.GetSubcategory(subcategoryDTO.SubcategoryId, subcategoryDTO.CategoryId);

                    if (oldSubcategory is null)
                        return BadRequest("Подкатегория не найдена.");

                    if (
                        subcategoryDTO.Alias != oldSubcategory.Alias
                        || subcategoryDTO.CategoryId != subcategoryDTO.NewCategoryId
                    )
                    {
                        var (isSuccess, error) = await _service.UpdateSubcategory(subcategoryDTO, oldSubcategory);

                        if (!isSuccess)
                            return BadRequest(error);
                    }
                    else if (subcategoryDTO.File != null)
                    {
                        var file = await _fileHelper.AddFileToRepository(subcategoryDTO.File);

                        await _fileHelper.RemoveFileFromRepository(oldSubcategory.Photo, updateDB: false);

                        oldSubcategory.Photo = file;

                        await _repository.UpdateSubcategory(oldSubcategory);
                    }
                }

                return Success(true);
            }
            catch (Exception)
            {
                return BadRequest("Что-то пошло не так, повторите попытку");
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Delete([FromQuery]string categoryId,
                                                [FromQuery]string subcategoryId)
        {
            var oldSubcategory = await _repository.GetSubcategory(subcategoryId, categoryId);

            await _fileHelper.RemoveFileFromRepository(oldSubcategory.Photo, updateDB: false);

            await _repository.DeleteSubcategory(oldSubcategory);

            return Success(true);
        }
    }
}