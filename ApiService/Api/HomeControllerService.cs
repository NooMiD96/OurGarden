using ApiService.Abstraction.Api;
using ApiService.Abstraction.Model;

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

        #endregion

        #region .ctor

        /// <summary>
        /// .ctor
        /// </summary>
        public HomeControllerService(ILogger<HomeControllerService> logger,
                                     IOurGardenRepository repository)
        {
            _logger = logger;
            _repository = repository;
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

        #endregion
    }
}
