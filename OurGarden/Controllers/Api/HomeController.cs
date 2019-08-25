using Database.Repositories;

using Microsoft.AspNetCore.Mvc;

using System;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : BaseController
    {
        private readonly IOurGardenRepository _repository;

        public HomeController([FromServices] IOurGardenRepository repository)
        {
            _repository = repository;
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

        [HttpGet("[action]")]
        public async Task<IActionResult> GetCategories()
        {
            var result = await _repository.GetCategories();

            return Success(result.OrderBy(x => x.CategoryId));
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetSubcategories([FromQuery] string categoryId)
        {
            if (String.IsNullOrEmpty(categoryId))
                return BadRequest("Что-то пошло не так, необходимо выбрать категорию");

            var result = await _repository.GetSubcategories(categoryId);

            return Success(result.OrderBy(x => x.SubcategoryId));
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetProducts([FromQuery] string categoryId, [FromQuery] string subcategoryId)
        {
            if (String.IsNullOrEmpty(categoryId) || String.IsNullOrEmpty(subcategoryId))
            {
                return BadRequest("Что-то пошло не так, необходимо выбрать категорию с подкатегорией");
            }

            var result = await _repository.GetProducts(categoryId, subcategoryId);

            return Success(result.OrderBy(x => x.ProductId));
        }


        [HttpGet("[action]")]
        public async Task<IActionResult> GetProduct([FromQuery]string categoryId,
                                                    [FromQuery]string subcategoryId,
                                                    [FromQuery]string productId)
        {

            if (String.IsNullOrEmpty(categoryId) || String.IsNullOrEmpty(subcategoryId) || String.IsNullOrEmpty(productId))
                return BadRequest("Что-то пошло не так, необходимо выбрать категорию, подкатегорию и товар");

            var product = await _repository.GetProduct(productId, subcategoryId, categoryId);

            if (product == null)
                return BadRequest("Что-то пошло не так, повторите попытку");

            return Success(product);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> SearchProduct([FromQuery] string search)
        {
            if (String.IsNullOrEmpty(search))
                return BadRequest("Что-то пошло не так, повторите попытку");

            var result = await _repository.GetSearchProducts(search);

            return Success(result.OrderBy(x => x.ProductId));
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetGalleries()
        {
            var galleries = await _repository.GetGalleries();
            return Success(galleries);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetGallery(
            [FromQuery]int galleryId)
        {
            var gallery = await _repository.GetGallery(galleryId);

            if (gallery == null)
                return BadRequest("Что-то пошло не так, повторите попытку");

            return Success(gallery);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllVideo()
        {
            var video = await _repository.GetVideo();
            return Success(video);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetVideo([FromQuery]int videoId)
        {
            var video = await _repository.GetVideo(videoId);

            if (video == null)
                return BadRequest("Что-то пошло не так, повторите попытку");

            return Success(video);
        }
    }
}
