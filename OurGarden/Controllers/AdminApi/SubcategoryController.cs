using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Core.Helpers;
using Database.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.DB;
using Model.DTO;

namespace Web.Controllers.AdminApi
{
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
            var subcategories = _repository.GetAllSubcategories();
            return Ok(subcategories);
        }

        [HttpGet("{categoryId}/{subcategoryId}")]
        public async Task<IActionResult> GetSubcategory(
            [FromRoute]string categoryId,
            [FromRoute]string subcategoryId)
        {
            var subcategory = _repository.GetSubcategory(subcategoryId, categoryId);

            if (subcategory == null)
                return BadRequest();

            return Ok(subcategory);
        }        

        [HttpPost]
        public async Task<IActionResult> AddSubcategory(
            [FromForm]SubcategoryDTO subcategoryDTO)
        {
            if (!ModelState.IsValid || subcategoryDTO.Photo.Length == 0 
                || string.IsNullOrEmpty(subcategoryDTO.NewCategoryId))
            {
                return BadRequest();
            }

            try
            {
                using (var ms = new MemoryStream())
                {
                    subcategoryDTO.Photo.CopyTo(ms);
                    var fileBytes = ms.ToArray();
                    var file = new Photo()
                    {
                        Date = DateTime.Now,
                        Name = subcategoryDTO.Photo.Name,
                        PhotoId = Guid.NewGuid(),
                        BinaryData = fileBytes,
                    };
                    _repository.AddFile(file);

                    var subcategory = new Subcategory()
                    {
                        Alias = subcategoryDTO.Alias,
                        SubcategoryId = StringHelper.Transform(subcategoryDTO.Alias),
                        CategoryId = subcategoryDTO.NewCategoryId,
                        Photo = file
                    };
                    _repository.AddSubcategory(subcategory);

                    return Ok(subcategory);
                }
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
                var oldSubcategory = _repository.GetSubcategory( subcategoryDTO.SubcategoryId, subcategoryDTO.CategoryId);
                var file = oldSubcategory.Photo;

                if (subcategoryDTO.Photo?.Length != 0)
                {                    
                    using (var ms = new MemoryStream())
                    {
                        subcategoryDTO.Photo.CopyTo(ms);
                        var fileBytes = ms.ToArray();
                        file = new Photo()
                        {
                            Date = DateTime.Now,
                            Name = subcategoryDTO.Photo.Name,
                            PhotoId = Guid.NewGuid(),
                            BinaryData = fileBytes,
                        };
                        _repository.AddFile(file);
                    }
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
                    _repository.AddSubcategory(subcategory);
                    _repository.DeleteSubcategory(oldSubcategory.SubcategoryId, oldSubcategory.CategoryId);
                }
                else if (subcategoryDTO.Photo?.Length != 0)
                {
                    oldSubcategory.Photo = file;
                    _repository.UpdateSubategory(oldSubcategory);
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
            _repository.DeleteSubcategory(subcategoryId, categoryId);
            return Ok();
        }
    }
}