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
    //[ValidateAntiForgeryToken]
    //[Authorize(Roles = UserRoles.Admin + ", " + UserRoles.Employee)]
    [Route("api/[controller]")]
    [ApiController]
    public class SubcategoryController : ControllerBase
    {
        public readonly IOurGardenRepository _repository;
        public SubcategoryController(IOurGardenRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetSubcategories()
        {
            var subcategories = await _repository.GetAllSubcategories();
            return Ok(subcategories);
        }

        [HttpGet("{categoryId}/{subcategoryId}")]
        public async Task<IActionResult> GetSubcategory(
            [FromRoute]string categoryId,
            [FromRoute]string subcategoryId)
        {
            var subcategory = await _repository.GetSubcategory(subcategoryId, categoryId);

            if (subcategory == null)
                return BadRequest();

            return Ok(subcategory);
        }        

        [HttpPost]
        public async Task<IActionResult> AddSubcategory(
            [FromForm]SubcategoryDTO subcategoryDTO)
        {
            if (!ModelState.IsValid || subcategoryDTO.Photo?.Length == 0 
                || string.IsNullOrEmpty(subcategoryDTO.NewCategoryId))
            {
                return BadRequest();
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

                return Ok(subcategory);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }            
        }

        [HttpPut]
        public async Task<IActionResult> UpdateSubcategory(
            [FromForm]SubcategoryDTO subcategoryDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
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
                    await _repository.UpdateSubategory(oldSubcategory);
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpDelete("{categoryId}/{subcategoryId}")]
        public async Task<IActionResult> DeleteCategory(
            [FromRoute]string categoryId,
            [FromRoute]string subcategoryId)
        {
            await _repository.DeleteSubcategory(subcategoryId, categoryId);
            return Ok();
        }
    }
}