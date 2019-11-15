using Database.Repositories;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using System;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : BaseController
    {
        private readonly IOurGardenRepository _repository;
        private readonly ILogger _logger;
        private const string API_LOCATE = "Api.SearchController";

        public SearchController([FromServices] IOurGardenRepository repository,
                                ILogger<SearchController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> Search([FromQuery] string search)
        {
            if (String.IsNullOrEmpty(search))
            {
                var error = $"Что-то пошло не так, строка поиска отсутствует.";

                _logger.LogError($"{DateTime.Now}:\n\t{API_LOCATE}.Search\n\t{error}");
                return BadRequest(error);
            }

            var result = await _repository.Search(search);

            return Success(
                result
                    .OrderBy(x => x.CategoryId)
                    .ThenBy(x => x.SubcategoryId)
                    .ThenBy(x => x.ProductId)
            );
        }
    }
}
