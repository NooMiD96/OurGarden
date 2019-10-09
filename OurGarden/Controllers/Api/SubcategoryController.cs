using Core;

using Database.Repositories;

using Microsoft.AspNetCore.Mvc;

using Model.Breadcrumb;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubcategoryController : BaseController
    {
        private readonly IOurGardenRepository _repository;

        public SubcategoryController([FromServices] IOurGardenRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetBreadcrumb([FromQuery] string categoryId)
        {
            var breadcrumb = await _repository.GetSubcategoryBreadcrumb(categoryId);
            var order = 1;

            var breadcrumbList = new List<Breadcrumb>()
            {
                new Breadcrumb()
                {
                    DisplayName = "Каталог",
                    Url = "Catalog",
                    Order = order++,
                }
            };

            breadcrumbList.AddRange(
                breadcrumb.Select(x =>
                {
                    x.Order = order++;
                    return x;
                })
            );

            return Success(breadcrumbList);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetSubcategories([FromQuery] string categoryId)
        {
            if (String.IsNullOrEmpty(categoryId))
                return BadRequest("Что-то пошло не так, необходимо выбрать категорию");

            var category = (await _repository.GetCategory(categoryId)).DeepClone();
            var subcategories = await _repository.GetSubcategories(categoryId, isGetOnlyVisible: true);

            category.Subcategories = subcategories
                .OrderBy(x => x.SubcategoryId)
                .Select(x =>
                {
                    x.Category = null;
                    return x;
                })
                .ToList();

            return Success(category);
        }
    }
}
