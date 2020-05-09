using PagePingerHostService.Abstraction;

using Microsoft.Extensions.Logging;

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
        readonly ILogger Logger;

        public PagePingerService(ILogger<PagePingerService> logger)
        {
            Logger = logger;
        }

        public async Task PingMainPage(string page = IPagePingerService.PageUrl)
        {
            Logger.LogInformation($"DummyWorkerService is working.");

            try
            {
                using var client = new WebClient();
                await client.DownloadDataTaskAsync(new Uri(page));
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
