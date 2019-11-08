using Microsoft.Extensions.Logging;

using System;
using System.Net;
using System.Threading.Tasks;

namespace Services.BackgroundWork.DummyWorker
{
    public class DummyWorkerService : IDummyWorkerService
    {
        private const string PageUrl = "https://xn----7sbbq5b0a1c.com";
        private const int millisecond = 1000;
        
        readonly ILogger _logger;

        public DummyWorkerService(ILogger<DummyWorkerService> logger)
        {
            _logger = logger;
        }

        public async Task DoLoopWork()
        {
            while (true)
            {
                try
                {
                    using (var client = new WebClient())
                    {
                        await client.DownloadDataTaskAsync(new Uri(PageUrl));
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError($"DummyWorkerService: {ex.Message}\n{ex.StackTrace}\n{ex.InnerException}");
                }

                _logger.LogCritical($"Scoped Processing Service is working. {DateTime.UtcNow}");

                await Task.Delay(180 * millisecond);
            }
        }
    }
}
