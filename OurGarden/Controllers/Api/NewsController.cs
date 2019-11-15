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
    public class NewsController : BaseController
    {
        private readonly IOurGardenRepository _repository;
        private readonly ILogger _logger;
        private const string API_LOCATE = "Api.NewsController";

        public NewsController([FromServices] IOurGardenRepository repository,
                              ILogger<SubcategoryController> logger)
        {
            _logger = logger;
            _repository = repository;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetBreadcrumb([FromQuery] string newsId)
        {
            var breadcrumb = await _repository.GetNewsBreadcrumb(newsId);
            var order = 1;

            var breadcrumbList = new List<Breadcrumb>()
            {
                new Breadcrumb()
                {
                    DisplayName = "Акции",
                    Url = "News",
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
        public async Task<IActionResult> GetAllNews()
        {
            var news = await _repository.GetNews(includeDescriptions: false);

            return Success(news.OrderByDescending(x => x.Date));
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetNews([FromQuery]string alias)
        {
            if (String.IsNullOrEmpty(alias))
            {
                var error = "Что-то пошло не так, необходимо выбрать новость.";

                _logger.LogError($"{DateTime.Now}:\n\t{API_LOCATE}.GetNews\n\t{error}");
                return BadRequest(error);
            }

            var news = await _repository.GetNews(alias);

            if (news == null)
            {
                var error = $"Что-то пошло не так, не удалось найти выбранную новость.\n\tНовость: {alias}";

                _logger.LogError($"{DateTime.Now}:\n\t{API_LOCATE}.GetNews\n\t{error}");
                return BadRequest(error);
            }

            return Success(news);
        }
    }
}
