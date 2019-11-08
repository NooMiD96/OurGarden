using Microsoft.Extensions.Logging;

using System;
using System.Threading.Tasks;

namespace Services.BackgroundWork.DummyWorker
{
    public class DummyWorkerService : IDummyWorker
    {
        readonly int millisecond = 1000;
        
        readonly ILogger _logger;

        public DummyWorkerService(ILogger<DummyWorkerService> logger)
        {
            _logger = logger;
        }

        public async Task DoLoopWork()
        {
            while (true)
            {
                await Task.Delay(60 * millisecond);
                _logger.LogInformation($"Scoped Processing Service is working. {DateTime.UtcNow}");
            }
        }
    }
}
