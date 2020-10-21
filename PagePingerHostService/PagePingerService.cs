using Core.Utils;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Model;

using PagePingerHostService.Abstraction;

using System;
using System.Net;
using System.Threading.Tasks;

namespace PagePingerHostService
{
    /// <summary>
    /// Класс для пинга главной страницы сайта
    /// </summary>
    public class PagePingerService : IPagePingerService
    {
        #region Consts

        const string HostServiceName = "PagePingerService";
        const string HostServiceWorkStart = HostServiceName + " is start working.";
        const string HostServiceWorkEnd = HostServiceName + " is work done.";

        #endregion

        private readonly ILogger _logger;
        private readonly RootOptions _rootOptions;
        private byte _workCounter = 0;

        public PagePingerService(ILogger<PagePingerService> logger,
                                 IOptions<RootOptions> rootOptions)
        {
            _logger = logger;
            _rootOptions = rootOptions.Value;
        }

        public async Task PingMainPage(string page = null)
        {
            if (_workCounter == 0)
                _logger.LogInformation(HostServiceWorkStart);

            try
            {
                using var client = new WebClient();
                await client.DownloadDataTaskAsync(
                    new Uri(
                        page ?? WebUtils.GenerateSiteAddress(_rootOptions.HostName)
                    )
                );
            }
            catch (Exception ex)
            {
                /// TODO: Send email
                _logger.LogError(ex, $"PagePingerService error: {ex.Message}");
            }

            if (_workCounter == 0)
                _logger.LogInformation(HostServiceWorkEnd);

            _workCounter++;
        }
    }
}
