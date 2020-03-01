using Core;

using Database.Repositories;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

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
        private readonly ILogger _logger;
        private const string CONTROLLER_LOCATE = "Api.SubcategoryController";

        public SubcategoryController([FromServices] IOurGardenRepository repository,
                                     ILogger<SubcategoryController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetBreadcrumb([FromQuery] string categoryId)
        {
            const string API_LOCATE = CONTROLLER_LOCATE + ".GetBreadcrumb";

            if (String.IsNullOrEmpty(categoryId))
            {
                return LogBadRequest(
                    _logger,
                    API_LOCATE,
                    customeError: $"Что-то пошло не так, не удалось получить Breadcrumb."
                );
            }

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
            const string API_LOCATE = CONTROLLER_LOCATE + ".GetSubcategories";

            if (String.IsNullOrEmpty(categoryId))
            {
                return LogBadRequest(
                    _logger,
                    API_LOCATE,
                    customeError: $"Что-то пошло не так, необходимо выбрать категорию."
                );
            }

            var category = (await _repository.GetCategory(categoryId)).DeepClone();

            if (category is null)
            {
                return LogBadRequest(
                    _logger,
                    API_LOCATE,
                    customeError: $"Что-то пошло не так, не удалось найти выбранную категорию.\nКатегория: {categoryId}",
                    returnStatusCode: 404
                );
            }

            category.Subcategories = (await _repository.GetSubcategories(categoryId, isGetOnlyVisible: true))
                .OrderBy(x => x.Alias)
                .Select(x =>
                {
                    x.Category = null;
                    return x;
                })
                .ToList();

            foreach (var entity in category.Subcategories)
            {
                entity.Photos = entity.Photos.OrderBy(x => x.Date).ToList();
            }

            return Success(category);
        }
    }
}
