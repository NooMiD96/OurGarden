using PagePingerHostService.Abstraction;

using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

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

        private readonly ILogger Logger;

        private readonly IPagePingerService PagePingerService;

        private Timer Timer;

        #endregion

        #region .ctor

        public PagePingerHostedService(IPagePingerService pagePingerService, ILogger<PagePingerHostedService> logger)
        {
            PagePingerService = pagePingerService;
            Logger = logger;
        }

        #endregion

        #region IHostedService Impl

        /// <inheritdoc/>
        public Task StartAsync(CancellationToken cancellationToken)
        {
            Logger.LogInformation(HostServiceStart);

#if DEBUG
            var startTimeSpan = TimeSpan.FromDays(31);
#else
            var startTimeSpan = TimeSpan.FromMinutes(3);
#endif

            Timer = new Timer(DoWork, null, startTimeSpan, TimeSpan.FromMinutes(3));

            return Task.CompletedTask;
        }

        /// <summary>
        /// Выполнение пинга страницы.
        /// </summary>
        private void DoWork(object state)
        {
            PagePingerService.PingMainPage();
        }

        /// <inheritdoc/>
        public Task StopAsync(CancellationToken cancellationToken)
        {
            Logger.LogInformation(HostServiceEnd);

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
