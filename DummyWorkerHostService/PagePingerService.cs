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
        private readonly ILogger Logger;
        private readonly RootOptions RootOptions;

        public PagePingerService(ILogger<PagePingerService> logger,
                                 IOptions<RootOptions> rootOptions)
        {
            Logger = logger;
            RootOptions = rootOptions.Value;
        }

        public async Task PingMainPage(string page = null)
        {
            Logger.LogInformation($"DummyWorkerService is working.");

            try
            {
                using var client = new WebClient();
                await client.DownloadDataTaskAsync(
                    new Uri(
                        page ?? WebUtils.GenerateSiteAddress(RootOptions.HostName)
                    )
                );
            }
            catch (Exception ex)
            {
                /// TODO: Send email
                Logger.LogError(ex, $"DummyWorkerService: {ex.Message}");
            }

            Logger.LogInformation($"DummyWorkerService is worked.");
        }
    }
}
