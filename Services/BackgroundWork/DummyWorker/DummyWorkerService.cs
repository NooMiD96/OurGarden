using Microsoft.Extensions.Logging;

using System;
using System.Net;

namespace Services.BackgroundWork.DummyWorker
{
    public class DummyWorkerService : IDummyWorkerService
    {
        private const string PageUrl = "https://xn----7sbbq5b0a1c.com";
        readonly ILogger _logger;

        public DummyWorkerService(ILogger<DummyWorkerService> logger)
        {
            _logger = logger;
        }

        public void DoWork()
        {
            _logger.LogInformation($"DummyWorkerService is working. {DateTime.UtcNow}");

            try
            {
                using (var client = new WebClient())
                {
                    client.DownloadDataTaskAsync(new Uri(PageUrl)).GetAwaiter().GetResult();
                }
            }
            catch (Exception ex)
            {
                // TODO: Send email
                _logger.LogError($"DummyWorkerService: {ex.Message}\n{ex.StackTrace}\n{ex.InnerException}");
            }

            _logger.LogInformation($"DummyWorkerService is worked. {DateTime.UtcNow}");
        }
    }
}
