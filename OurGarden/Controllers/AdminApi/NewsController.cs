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
    public class NewsController : BaseController
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
                return BadRequest("Что-то пошло не так, повторите попытку");
            }

            try
            {
                var fileHelper = new FileHelper(_repository);
                news.Photo = await fileHelper.AddFileToRepository(news.File);

                await _repository.AddNews(news);
                return Success(news);
            }
            catch (Exception)
            {
                return BadRequest("Что-то пошло не так, повторите попытку");
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
                    return BadRequest("Что-то пошло не так, повторите попытку");
                }

                if (news.File?.Length != 0)
                {
                    var fileHelper = new FileHelper(_repository);
                    news.Photo = await fileHelper.AddFileToRepository(news.File);
                }
                await _repository.UpdateNews(news);

                return Success(true);
            }
            catch (Exception)
            {
                return BadRequest("Что-то пошло не так, повторите попытку");
            }
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> Delete(
            [FromQuery]int newsId)
        {
            await _repository.DeleteNews(newsId);
            return Success(true);
        }
    }
}