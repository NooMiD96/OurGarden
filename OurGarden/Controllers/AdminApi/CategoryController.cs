﻿using Core.Constants;
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
    public class CategoryController : BaseController
    {
        private readonly IOurGardenRepository _repository;
        private readonly CategoryControllerService _service;
        private readonly FileHelper _fileHelper;

        public CategoryController(IOurGardenRepository repository)
        {
            _repository = repository;
            _service = new CategoryControllerService(_repository);
            _fileHelper = new FileHelper(_repository);
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
            try
            {
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

                    await _repository.AddCategory(category);
                }
                else
                {
                    var oldCategory = await _repository.GetCategory(categoryDTO.CategoryId);

                    if (oldCategory is null)
                        return BadRequest("Категория не найдена.");

                    if (categoryDTO.Alias != oldCategory.Alias)
                    {
                        var (isSuccess, error) = await _service.UpdateCategory(categoryDTO, oldCategory);

                        if (!isSuccess)
                            return BadRequest(error);
                    }
                    else
                    {
                        if (categoryDTO.File != null)
                        {
                            var file = await _fileHelper.AddFileToRepository(categoryDTO.File);

                            await _fileHelper.RemoveFileFromRepository(oldCategory.Photo, updateDB: false);

                            oldCategory.Photo = file;

                        }

                        oldCategory.IsVisible = categoryDTO.IsVisible ?? true;

                        await _repository.UpdateCategory(oldCategory);
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
        public async Task<IActionResult> Delete([FromQuery]string categoryId)
        {
            var oldCategory = await _repository.GetCategory(categoryId);

            await _fileHelper.RemoveFileFromRepository(oldCategory.Photo, updateDB: false);

            await _repository.DeleteCategory(oldCategory);

            return Success(true);
        }
    }
}