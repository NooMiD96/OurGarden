using Database.Repositories;

using Microsoft.AspNetCore.Mvc;

using Model.Breadcrumb;

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

        public NewsController([FromServices] IOurGardenRepository repository)
        {
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
        public async Task<IActionResult> GetAllNewsWithDescriptions()
        {
            var news = await _repository.GetNews(includeDescriptions: true);

            return Success(news.OrderByDescending(x => x.Date));
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetNews([FromQuery]string alias)
        {
            var news = await _repository.GetNews(alias);

            if (news == null)
                return BadRequest("Не удалось найти данную акцию!");

            return Success(news);
        }
    }
}
