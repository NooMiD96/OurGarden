using ApiService.Abstraction.Api;
using ApiService.Abstraction.Core;
using ApiService.Abstraction.DTO;
using ApiService.Abstraction.Model;

using Core.Helpers;

using DataBase.Abstraction.Model;
using DataBase.Abstraction.Repositories;

using Microsoft.Extensions.Logging;

using System;
using System.Threading.Tasks;

namespace ApiService.Api
{
    public class HomeControllerService : IHomeControllerService
    {
        #region Fields

        /// <summary>
        /// Логгер.
        /// </summary>
        private readonly ILogger _logger;

        /// <summary>
        /// Репозиторий БД.
        /// </summary>
        private readonly IOurGardenRepository _repository;

        /// <summary>
        /// Сервис по формированию и отправке писем
        /// </summary>
        private readonly IEmailService _emailService;

        #endregion

        #region .ctor

        /// <summary>
        /// .ctor
        /// </summary>
        public HomeControllerService(ILogger<HomeControllerService> logger,
                                     IOurGardenRepository repository,
                                     IEmailService emailService)
        {
            _logger = logger;
            _repository = repository;
            _emailService = emailService;
        }

        #endregion

        #region IHomeControllerService Impl

        /// <inheritdoc/>
        public async Task<ServiceExecuteResult<PageInfo>> GetPageInfo(int pageInfoId)
        {
            try
            {
                var pageInfo = await _repository.GetPageInfo(pageInfoId);

                return new ServiceExecuteResult<PageInfo>
                {
                    IsSuccess = true,
                    Result = pageInfo
                };
            }
            catch (Exception ex)
            {
                var msg = $"Не удалось получить информацию о странице с идентификатором \"{pageInfoId}\". {ex.Message}";

                _logger.LogError(ex, msg);
                return new ServiceExecuteResult<PageInfo>
                {
                    IsSuccess = false,
                    Error = msg
                };
            }
        }

        /// <inheritdoc/>
        public async Task<ServiceExecuteResult<bool>> SendFeedback(FeedbackDTO feedbackDTO)
        {
            try
            {
                await _emailService.SendFeedback(feedbackDTO);

                return new ServiceExecuteResult<bool>
                {
                    IsSuccess = true,
                    Result = true
                };
            }
            catch (Exception ex)
            {
                var msg = $"Не удалось отправить письмо по след. причине: {ex.Message}";

                _logger.LogError(ex, $"{msg}\nИнформация пользователя: {JsonHelper.Serialize(feedbackDTO)}");
                return new ServiceExecuteResult<bool>
                {
                    IsSuccess = false,
                    Error = msg
                };
            }
        }

        #endregion
    }
}
