#if !DEBUG
using Core.Helpers;
#endif

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

using System;
using System.Threading;
using System.Threading.Tasks;

namespace Services.BackgroundWork.OrderCleaner
{
    public class OrderCleanerHostedService : IHostedService, IDisposable
    {
        // Flag: Has Dispose already been called?
        bool disposed = false;

        private readonly ILogger _logger;
        private readonly IServiceProvider _services;
        private Timer _timer;

        const string HostServiceStart = "OrderCleanerHostedService is starting.";
        const string HostServiceWork = "OrderCleanerHostedService is working.";
        const string HostServiceEnd = "OrderCleanerHostedService is stopping.";

        public OrderCleanerHostedService(IServiceProvider services, ILogger<OrderCleanerHostedService> logger)
        {
            _services = services;
            _logger = logger;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation(HostServiceStart);

#if DEBUG
            var startTimeSpan = TimeSpan.Zero;
#else
            var startTimeSpan = DateTime.Now.AddDays(1).GetToday() - DateTime.Now;
#endif

            _timer = new Timer(DoWork, null, startTimeSpan, TimeSpan.FromDays(1));

            return Task.CompletedTask;
        }

        private void DoWork(object state)
        {
            _logger.LogInformation(HostServiceWork);

            using (var scope = _services.CreateScope())
            {
                var service = scope.ServiceProvider.GetRequiredService<IOrderCleanerService>();

                service.DoWork();
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation(HostServiceEnd);

            _timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposed)
                return;

            if (disposing)
            {
                _timer?.Dispose();
            }

            disposed = true;
        }
    }
}
