using Core.Constants;
using Core.Helpers;

using Database.Repositories;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using Model.DB;
using Model.DTO;

using System;
using System.Linq;
using System.Threading.Tasks;

using Web.Services.Controllers.AdminApi;

namespace Web.Controllers.AdminApi
{
    [ValidateAntiForgeryToken]
    [Authorize(Roles = UserRoles.Admin + ", " + UserRoles.Employee)]
    [Route("apiAdmin/[controller]")]
    [ApiController]
    public class NewsController : BaseController
    {
        private readonly IOurGardenRepository _repository;
        private readonly NewsControllerService _service;
        private readonly FileHelper _fileHelper;
        private readonly ILogger _logger;
        private const string CONTROLLER_LOCATE = "AdminApi.NewsController";

        public NewsController(IOurGardenRepository repository,
                              ILogger<NewsController> logger)
        {
            _repository = repository;
            _service = new NewsControllerService(_repository, _logger);
            _fileHelper = new FileHelper(_repository);
            _logger = logger;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllNews()
        {
            var news = await _repository.GetNews(includeDescriptions: true);

            return Success(news.OrderByDescending(x => x.Date));
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddOrUpdate([FromForm]NewsDTO newsDTO)
        {
            var error = "Что-то пошло не так, повторите попытку.";
            const string API_LOCATE = CONTROLLER_LOCATE + ".AddOrUpdate";

            try
            {
                bool isSuccess;

                if (newsDTO.NewsId <= 0)
                {
                    var alias = newsDTO.Title.TransformToId();
                    var isExist = await _repository.CheckNewsAlias(alias);

                    if (isExist)
                    {
                        return BadRequest("Новость c данным заголовоком существует. Измените заголовок.");
                    }

                    var file = await _fileHelper.AddFileToRepository(newsDTO.File);

                    var news = new News()
                    {
                        Title = newsDTO.Title,
                        Alias = alias,
                        Date = DateTime.Now,
                        Description = newsDTO.Description,
                        Photo = file
                    };
                    await _repository.AddNews(news);

                    isSuccess = true;
                }
                else
                {
                    var oldNews = await _repository.GetNews(newsDTO.NewsId);

                    if (oldNews is null)
                    {
                        return LogBadRequest(
                            _logger,
                            API_LOCATE,
                            $"Что-то пошло не так, не удалось найти новость.\n\tНовость: {newsDTO.NewsId}"
                        );
                    }

                    if (oldNews.Title.TransformToId() != newsDTO.Title.TransformToId())
                    {
                        (isSuccess, error) = await _service.UpdateNews(newsDTO, oldNews);
                    }
                    else
                    {
                        if (newsDTO.File != null)
                        {
                            var file = await _fileHelper.AddFileToRepository(newsDTO.File);

                            await _fileHelper.RemoveFileFromRepository(oldNews.Photo, updateDB: false);

                            oldNews.Photo = file;
                        }

                        oldNews.Title = newsDTO.Title;
                        oldNews.Description = newsDTO.Description;

                        await _repository.UpdateNews(oldNews);

                        isSuccess = true;
                    }
                }

                if (!isSuccess)
                {
                    return BadRequest(error);
                }

                return Success(isSuccess);
            }
            catch (Exception ex)
            {
                return LogBadRequest(
                    _logger,
                    API_LOCATE,
                    ex,
                    error
                );
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