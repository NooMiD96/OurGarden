using Database.Repositories;

using Microsoft.AspNetCore.Mvc;

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

        public SearchController([FromServices] IOurGardenRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> Search([FromQuery] string search)
        {
            if (String.IsNullOrEmpty(search))
                return BadRequest("Строка поиска отсутствует");

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
