using DataBase.Abstraction.Repositories;

using Microsoft.AspNetCore.Mvc;

using System.Linq;
using System.Threading.Tasks;

namespace Web.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : BaseController
    {
        private readonly IOurGardenRepository _repository;

        public CategoryController(IOurGardenRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetCategories()
        {
            var result = (await _repository.GetCategories(isGetOnlyVisible: true))
                .OrderBy(x => x.Alias);

            foreach (var category in result)
            {
                category.Photos = category.Photos.OrderBy(x => x.Date).ToList();
            }

            return Success(result);
        }
    }
}
