using Core.Helpers;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

using System;
using System.Threading;
using System.Threading.Tasks;

namespace Services.BackgroundWork.SiteMap
{
    public class SiteMapHostedService : IHostedService, IDisposable
    {
        // Flag: Has Dispose already been called?
        bool disposed = false;

        private readonly ILogger _logger;
        private readonly IServiceProvider _services;
        private Timer _timer;

        const string HostServiceName = "SiteMapHostedService";
        const string HostServiceStart = HostServiceName + " is starting.";
        const string HostServiceWork = HostServiceName + " is working.";
        const string HostServiceEnd = HostServiceName + " is stopping.";

        public SiteMapHostedService(IServiceProvider services, ILogger<SiteMapHostedService> logger)
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
            var startTimeSpan = DateTime.Now.AddDays(1).GetDate() - DateTime.Now + TimeSpan.FromHours(2);
#endif

            _timer = new Timer(DoWork, null, startTimeSpan, TimeSpan.FromDays(1));

            return Task.CompletedTask;
        }

        private void DoWork(object state)
        {
            _logger.LogInformation(HostServiceWork);

            using (var scope = _services.CreateScope())
            {
                var service = scope.ServiceProvider.GetRequiredService<ISiteMapService>();

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
