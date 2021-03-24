using DataBase.Abstraction.Repositories;

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
        private const string CONTROLLER_LOCATE = "Api.SearchController";

        public SearchController(IOurGardenRepository repository,
                                ILogger<SearchController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> Search([FromQuery] string search)
        {
            const string API_LOCATE = CONTROLLER_LOCATE + ".Search";

            if (String.IsNullOrEmpty(search))
            {
                return LogBadRequest(
                    _logger,
                    API_LOCATE,
                    customError: "Что-то пошло не так, строка поиска отсутствует."
                );
            }

            var searchString = search.Trim();
            var result = await _repository.Search(searchString);

            searchString = searchString.ToLower();
            var orderedResult = result
                .OrderBy(x => x.Alias.ToLower().Contains(searchString) ? 0 : 1)
                .ThenBy(x => x.Alias)
                .ToList();

            return Success(orderedResult);
        }
    }
}
