using ApiService.Abstraction.Api;
using ApiService.Abstraction.DTO;
using ApiService.Abstraction.Model;

using DataBase.Abstraction;
using DataBase.Abstraction.Model;
using DataBase.Abstraction.Repositories;

using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiService.Api
{
    public class NewsControllerService : INewsControllerService
    {
        #region Fields

        /// <summary>
        /// Логгер.
        /// </summary>
        private readonly ILogger _logger;

        /// <summary>
        /// 
        /// </summary>
        private readonly IOurGardenRepository _repository;

        #endregion

        #region .ctor

        public NewsControllerService(ILogger<NewsControllerService> logger,
                                     IOurGardenRepository repository)
        {

            _logger = logger;
            _repository = repository;
        }

        #endregion

        #region Impl

        /// <inheritdoc/>
        public async Task<ServiceExecuteResult<IEnumerable<IBreadcrumb>>> GetBreadcrumb(string newsId)
        {
            try
            {
                var breadcrumb = await _repository.GetNewsBreadcrumb(newsId);
                var order = 1;

                var breadcrumbList = new List<IBreadcrumb>()
                {
                    new BreadcrumbDTO()
                    {
                        DisplayName = "Акции",
                        Url = "News",
                        Order = order++,
                    }
                };

                breadcrumbList.AddRange(
                    breadcrumb.Select(x =>
                    {
                        x.Order = order++;
                        return x;
                    })
                );

                return new ServiceExecuteResult<IEnumerable<IBreadcrumb>>
                {
                    IsSuccess = true,
                    Result = breadcrumbList
                };
            }
            catch (Exception ex)
            {
                var msg = $"При получении хлебных крошек для новости \"{newsId}\" произошла ошибка: {ex.Message}";
                _logger.LogError(ex, msg);
                return new ServiceExecuteResult<IEnumerable<IBreadcrumb>>
                {
                    IsSuccess = false,
                    Error = msg
                };
            }
        }

        /// <inheritdoc/>
        public async Task<ServiceExecuteResult<IEnumerable<News>>> GetAllNews()
        {
            try
            {
                var news = await _repository.GetNews(includeDescriptions: false);

                return new ServiceExecuteResult<IEnumerable<News>>
                {
                    IsSuccess = true,
                    Result = news.OrderByDescending(x => x.Date)
                                 .ToList()
                };
            }
            catch (Exception ex)
            {
                var msg = $"Не получилось получить полный список новостей по след. причине: {ex.Message}";
                _logger.LogError(ex, msg);
                return new ServiceExecuteResult<IEnumerable<News>>
                {
                    IsSuccess = false,
                    Error = msg,
                };
            }
        }

        /// <inheritdoc/>
        public async Task<ServiceExecuteResult<News>> GetNews(string newsId)
        {
            try
            {
                if (String.IsNullOrEmpty(newsId))
                {
                    var msg = "Что-то пошло не так, необходимо выбрать новость.";
                    _logger.LogError(msg);
                    return new ServiceExecuteResult<News>
                    {
                        IsSuccess = false,
                        Error = msg
                    };
                }

                var news = await _repository.GetNews(newsId);

                if (news == null)
                {
                    var msg = $"Что-то пошло не так, не удалось найти выбранную новость. Новость: \"{newsId}\"";
                    _logger.LogError(msg);
                    return new ServiceExecuteResult<News>
                    {
                        IsSuccess = false,
                        Error = msg,
                    };
                }

                return new ServiceExecuteResult<News>
                {
                    IsSuccess = true,
                    Result = news
                };
            }
            catch (Exception ex)
            {
                var msg = $"При попытке получить новость \"{newsId}\" произошла ошибка: {ex.Message}";
                _logger.LogError(ex, msg);
                return new ServiceExecuteResult<News>
                {
                    IsSuccess = false,
                    Error = msg
                };
            }
        }

        #endregion
    }
}
