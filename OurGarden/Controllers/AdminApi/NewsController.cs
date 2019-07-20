using Core.Constants;

using Database.Repositories;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Model.DB;

using System;
using System.Threading.Tasks;

namespace Web.Controllers.AdminApi
{
    [ValidateAntiForgeryToken]
    [Authorize(Roles = UserRoles.Admin + ", " + UserRoles.Employee)]
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        public readonly IOurGardenRepository _repository;
        public NewsController(IOurGardenRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetNews()
        {
            var news = await _repository.GetNews();
            return Ok(news);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetNews(
            [FromQuery]int newsId)
        {
            var news = await _repository.GetNews(newsId);

            if (news == null)
                return BadRequest();

            return Ok(news);
        }

        [HttpPost]
        public async Task<IActionResult> AddNews(
            [FromForm]News news)
        {
            if (!ModelState.IsValid || news.File?.Length == 0)
            {
                return BadRequest();
            }

            try
            {
                var fileHelper = new FileHelper(_repository);
                news.Photo = await fileHelper.AddFileToRepository(news.File);

                await _repository.AddNews(news);
                return Ok(news);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateNews(
            [FromForm]News news)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }

                if (news.File?.Length != 0)
                {
                    var fileHelper = new FileHelper(_repository);
                    news.Photo = await fileHelper.AddFileToRepository(news.File);
                }
                await _repository.UpdateNews(news);

                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteNews(
            [FromQuery]int newsId)
        {
            await _repository.DeleteNews(newsId);
            return Ok();
        }
    }
}