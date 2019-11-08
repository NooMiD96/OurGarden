using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

using System;
using System.Threading;
using System.Threading.Tasks;

namespace Services.BackgroundWork.DummyWorker
{
    public class DummyHostedService : IHostedService
    {
        private readonly ILogger _logger;

        public DummyHostedService(IServiceProvider services, ILogger<DummyHostedService> logger)
        {
            Services = services;
            _logger = logger;
        }

        public IServiceProvider Services { get; }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Consume Scoped Service Hosted Service is starting.");

            return DoWork();
        }

        private async Task DoWork()
        {
            _logger.LogInformation("Consume Scoped Service Hosted Service is working.");

            using (var scope = Services.CreateScope())
            {
                var dummyWorker =
                    scope.ServiceProvider
                        .GetRequiredService<IDummyWorker>();

                await dummyWorker.DoLoopWork();
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Consume Scoped Service Hosted Service is stopping.");

            return Task.CompletedTask;
        }
    }
}
