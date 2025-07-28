using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Model;
using PagePingerHostService.Abstraction;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace PagePingerHostService
{
    public class PagePingerHostedService : IHostedService, IDisposable
    {
        #region Consts

        const string HostServiceName = "PagePingerHostedService";
        const string HostServiceStart = HostServiceName + " is starting.";
        const string HostServiceEnd = HostServiceName + " is stopping.";

        #endregion

        #region Fields

        /// <summary>
        /// Flag: Has Dispose already been called?
        /// </summary>
        private bool Disposed = false;

        private readonly ILogger _logger;

        private readonly IPagePingerService _pagePingerService;

        private readonly PagePingerOptions _pagePingerOptions;

        private Timer Timer;

        #endregion

        #region .ctor

        public PagePingerHostedService(IPagePingerService pagePingerService, IOptions<PagePingerOptions> pagePingerOptions, ILogger<PagePingerHostedService> logger)
        {
            _pagePingerService = pagePingerService;
            _pagePingerOptions = pagePingerOptions.Value;
            _logger = logger;
        }

        #endregion

        #region IHostedService Impl

        /// <inheritdoc/>
        public Task StartAsync(CancellationToken cancellationToken)
        {
            if (!_pagePingerOptions.Enabled)
            {
                _logger.LogInformation($"{HostServiceName} is disabled.");

                return Task.CompletedTask;
            }

            _logger.LogInformation(HostServiceStart);

            var startTimeSpan = TimeSpan.FromDays(_pagePingerOptions.StartTimeoutInMinutes);

            Timer = new Timer(DoWork, null, startTimeSpan, TimeSpan.FromMinutes(3));

            return Task.CompletedTask;
        }

        /// <summary>
        /// Выполнение пинга страницы.
        /// </summary>
        private void DoWork(object state)
        {
            _pagePingerService.PingMainPage();
        }

        /// <inheritdoc/>
        public Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation(HostServiceEnd);

            Timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }

        #endregion

        #region IDisposable Impl

        /// <inheritdoc/>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        /// <inheritdoc/>
        protected virtual void Dispose(bool disposing)
        {
            if (Disposed)
                return;

            if (disposing)
            {
                Timer?.Dispose();
            }

            Disposed = true;
        }

        #endregion
    }
}
