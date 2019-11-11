﻿using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

using System;
using System.Threading;
using System.Threading.Tasks;

namespace Services.BackgroundWork.DummyWorker
{
    public class DummyHostedService : IHostedService, IDisposable
    {
        // Flag: Has Dispose already been called?
        bool disposed = false;

        private readonly ILogger _logger;
        private readonly IServiceProvider _services;
        private Timer _timer;

        const string HostServiceStart = "DummyHostedService is starting.";
        const string HostServiceWork = "DummyHostedService is working.";
        const string HostServiceEnd = "DummyHostedService is stopping.";

        public DummyHostedService(IServiceProvider services, ILogger<DummyHostedService> logger)
        {
            _services = services;
            _logger = logger;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation(HostServiceStart);

            _timer = new Timer(DoWork, null, TimeSpan.FromMinutes(3), TimeSpan.FromMinutes(3));

            return Task.CompletedTask;
        }

        private void DoWork(object state)
        {
            _logger.LogInformation(HostServiceWork);

            using (var scope = _services.CreateScope())
            {
                var service = scope.ServiceProvider.GetRequiredService<IDummyWorkerService>();

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
