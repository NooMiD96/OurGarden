using Core.Constants;
using Core.Helpers;

using Database.Repositories;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Model.DB;
using Model.DTO;

using System;
using System.Threading.Tasks;

using Web.Services.Controllers.AdminApi;

namespace Web.Controllers.AdminApi
{
    [ValidateAntiForgeryToken]
    [Authorize(Roles = UserRoles.Admin + ", " + UserRoles.Employee)]
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : BaseController
    {
        public readonly IOurGardenRepository _repository;
        public readonly NewsControllerService _service;
        public readonly FileHelper _fileHelper;

        public NewsController(IOurGardenRepository repository)
        {
            _repository = repository;
            _service = new NewsControllerService(_repository);
            _fileHelper = new FileHelper(_repository);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddOrUpdate([FromForm]NewsDTO newsDTO)
        {
            try
            {
                if (newsDTO.NewsId <= 0)
                {
                    var file = await _fileHelper.AddFileToRepository(newsDTO.File);
                    var alias = StringHelper.Transform(newsDTO.Title);
                    var isExist = await _repository.CheckNewsAlias(alias);
                    if (isExist)
                    {
                        return BadRequest("Новость c данным алиасом существует. Измените заголовок, для изменения алиаса.");
                    }

                    var news = new News()
                    {
                        Title = newsDTO.Title,
                        Alias = alias,
                        Date = DateTime.Now,
                        Description = newsDTO.Description,
                        Photo = file
                    };
                    await _repository.AddNews(news);
                }
                else
                {
                    var oldNews = await _repository.GetNews(newsDTO.NewsId);

                    if (oldNews is null)
                        return BadRequest("Новость не найдена.");

                    if (oldNews.Title != newsDTO.Title)
                    {
                        var (isSuccess, error) = await _service.UpdateNews(newsDTO, oldNews);

                        if (!isSuccess)
                            return BadRequest(error);
                    }
                    else
                    {
                        if (newsDTO.File != null)
                        {
                            var file = await _fileHelper.AddFileToRepository(newsDTO.File);

                            await _fileHelper.RemoveFileFromRepository(oldNews.Photo, updateDB: false);

                            oldNews.Photo = file;
                        }

                        oldNews.Description = newsDTO.Description;

                        await _repository.UpdateNews(oldNews);
                    }
                }

                return Success(true);
            }
            catch (Exception ex)
            {
                return BadRequest("Что-то пошло не так, повторите попытку");
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Delete([FromQuery]int newsId)
        {
            var oldNews = await _repository.GetNews(newsId);

            await _fileHelper.RemoveFileFromRepository(oldNews.Photo, updateDB: false);

            await _repository.DeleteNews(oldNews);

            return Success(true);
        }
    }
}