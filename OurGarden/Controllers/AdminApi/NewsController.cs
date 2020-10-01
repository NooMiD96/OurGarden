using ApiService.Abstraction.DTO;

using Core.Constants;
using Core.Helpers;

using DataBase.Abstraction.Repositories;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

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
        private readonly ILogger _logger;
        private const string CONTROLLER_LOCATE = "AdminApi.NewsController";

        public NewsController(IOurGardenRepository repository,
                              ILogger<NewsController> logger)
        {
            _repository = repository;
            _logger = logger;
            _service = new NewsControllerService(_repository, _logger);
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

                if (String.IsNullOrEmpty(newsDTO?.NewsId))
                {
                    (isSuccess, error) = await _service.AddNews(newsDTO);
                }
                else
                {
                    var oldNews = await _repository.GetNews(newsDTO.NewsId);

                    if (oldNews is null)
                    {
                        return LogBadRequest(
                            _logger,
                            API_LOCATE,
                            customError: $"Что-то пошло не так, не удалось найти новость.\nНовость: {newsDTO.NewsId} --- {newsDTO.Alias}"
                        );
                    }

                    if (newsDTO.Alias.TransformToId() != oldNews.Alias.TransformToId())
                        (isSuccess, error) = await _service.FullUpdateNews(newsDTO, oldNews);
                    else
                        (isSuccess, error) = await _service.UpdateNews(newsDTO, oldNews);

                    (isSuccess, error) = await _service.UpdateNews(newsDTO, oldNews);
                }

                if (!isSuccess)
                    return LogBadRequest(
                        _logger,
                        API_LOCATE,
                        customError: error
                    );

                return Success(isSuccess);
            }
            catch (Exception ex)
            {
                return LogBadRequest(
                    _logger,
                    API_LOCATE,
                    exception: ex,
                    customError: error
                );
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Delete([FromQuery]string newsId)
        {
            const string API_LOCATE = CONTROLLER_LOCATE + ".Delete";

            var (isSuccess, error) = await _service.DeleteNews(newsId);

            if (isSuccess)
                return Success(isSuccess);
            else
                return LogBadRequest(
                    _logger,
                    API_LOCATE,
                    customError: error
                );
        }
    }
}