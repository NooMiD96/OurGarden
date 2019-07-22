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

        [HttpPost("[action]")]
        public async Task<IActionResult> Add(
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

        [HttpPut("[action]")]
        public async Task<IActionResult> Update(
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

        [HttpDelete("[action]")]
        public async Task<IActionResult> Delete(
            [FromQuery]int newsId)
        {
            await _repository.DeleteNews(newsId);
            return Ok();
        }
    }
}