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
    public class SubcategoryController : BaseController
    {
        public readonly IOurGardenRepository _repository;
        public SubcategoryController(IOurGardenRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAll()
        {
            var subcategories = await _repository.GetAllSubcategories();
            return Success(subcategories);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> Get(
            [FromQuery]string categoryId,
            [FromQuery]string subcategoryId)
        {
            var subcategory = await _repository.GetSubcategory(subcategoryId, categoryId);

            if (subcategory == null)
                return BadRequest("Что-то пошло не так, повторите попытку");

            return Success(subcategory);
        }        

        [HttpPost("[action]")]
        public async Task<IActionResult> Add(
            [FromForm]SubcategoryDTO subcategoryDTO)
        {
            if (!ModelState.IsValid || subcategoryDTO.Photo?.Length == 0 
                || string.IsNullOrEmpty(subcategoryDTO.NewCategoryId))
            {
                return BadRequest("Что-то пошло не так, повторите попытку");
            }

            try
            {
                var fileHelper = new FileHelper(_repository);
                var file = await fileHelper.AddFileToRepository(subcategoryDTO.Photo);

                var subcategory = new Subcategory()
                {
                    Alias = subcategoryDTO.Alias,
                    SubcategoryId = StringHelper.Transform(subcategoryDTO.Alias),
                    CategoryId = subcategoryDTO.NewCategoryId,
                    Photo = file
                };
                await _repository.AddSubcategory(subcategory);

                return Success(subcategory);
            }
            catch (Exception)
            {
                return BadRequest("Что-то пошло не так, повторите попытку");
            }            
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> Update(
            [FromForm]SubcategoryDTO subcategoryDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest("Что-то пошло не так, повторите попытку");
                }
                var oldSubcategory = await _repository.GetSubcategory( subcategoryDTO.SubcategoryId, subcategoryDTO.CategoryId);
                var file = oldSubcategory.Photo;

                if (subcategoryDTO.Photo?.Length != 0)
                {
                    var fileHelper = new FileHelper(_repository);
                    file = await fileHelper.AddFileToRepository(subcategoryDTO.Photo);
                }

                if (subcategoryDTO.Alias != oldSubcategory.Alias || subcategoryDTO.CategoryId != subcategoryDTO.NewCategoryId)
                {
                    var subcategory = new Subcategory()
                    {
                        Alias = subcategoryDTO.Alias,
                        SubcategoryId = StringHelper.Transform(subcategoryDTO.Alias),
                        CategoryId = subcategoryDTO.NewCategoryId,
                        Photo = file
                    };
                    await _repository.AddSubcategory(subcategory);
                    await _repository.DeleteSubcategory(oldSubcategory.SubcategoryId, oldSubcategory.CategoryId);
                }
                else if (subcategoryDTO.Photo?.Length != 0)
                {
                    oldSubcategory.Photo = file;
                    await _repository.UpdateSubcategory(oldSubcategory);
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
            [FromQuery]string categoryId,
            [FromQuery]string subcategoryId)
        {
            await _repository.DeleteSubcategory(subcategoryId, categoryId);
            return Success(true);
        }
    }
}