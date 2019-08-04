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
        public SubcategoryController(IOurGardenRepository repository)
        {
            _repository = repository;
            _service = new SubcategoryControllerService(_repository);
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
        public async Task<IActionResult> AddOrUpdate(
            [FromBody]SubcategoryDTO subcategoryDTO)
        {
            if (subcategoryDTO.Url?.Length == 0)
            {
                return BadRequest("Загрузите фотографию!");
            }

            try
            {
                if (String.IsNullOrEmpty(subcategoryDTO.SubcategoryId))
                {
                    var fileHelper = new FileHelper(_repository);
                    var file = await fileHelper.AddFileToRepository(subcategoryDTO.Url);

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
                else
                {
                    var oldSubcategory = await _repository.GetSubcategory(subcategoryDTO.SubcategoryId, subcategoryDTO.CategoryId);
                    var file = oldSubcategory.Photo;                   

                    if (subcategoryDTO.Alias == oldSubcategory.Alias && subcategoryDTO.CategoryId == subcategoryDTO.NewCategoryId)
                    {
                        if (subcategoryDTO.Url != file?.Url)
                        {
                            var fileHelper = new FileHelper(_repository);
                            file = await fileHelper.AddFileToRepository(subcategoryDTO.Url);
                        }
                        oldSubcategory.Photo = file;
                        await _repository.UpdateSubcategory(oldSubcategory);                        
                    }
                    else 
                    {
                        var (isSuccess, error) = await _service.UpdateSubcategory(subcategoryDTO, oldSubcategory);

                        if (!isSuccess)
                        {
                            return BadRequest(error);
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
            [FromQuery]string categoryId,
            [FromQuery]string subcategoryId)
        {
            await _repository.DeleteSubcategory(subcategoryId, categoryId);
            return Success(true);
        }
    }
}