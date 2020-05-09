#if !DEBUG
using Core.Helpers;
#endif

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

using SiteMapHostService.Abstraction;

using System;
using System.Threading;
using System.Threading.Tasks;

namespace SiteMapHostService
{
    public class SiteMapHostedService : IHostedService, IDisposable
    {
        #region Consts

        const string HostServiceName = "SiteMapHostedService";
        const string HostServiceStart = HostServiceName + " is starting.";
        const string HostServiceWork = HostServiceName + " is working.";
        const string HostServiceEnd = HostServiceName + " is stopping.";

        #endregion

        #region Fields

        /// <summary>
        /// Flag: Has Dispose already been called?
        /// </summary>
        private bool Disposed = false;

        private readonly ILogger Logger;

        private readonly ISiteMapService SiteMapService;

        private Timer Timer;

        #endregion

        #region .ctor

        public SiteMapHostedService(ISiteMapService siteMapService, ILogger<SiteMapHostedService> logger)
        {
            SiteMapService = siteMapService;
            Logger = logger;
        }

        #endregion

        #region IHostedService Impl

        /// <inheritdoc/>
        public Task StartAsync(CancellationToken cancellationToken)
        {
            Logger.LogInformation(HostServiceStart);

#if DEBUG
            var startTimeSpan = TimeSpan.FromMinutes(10);
#else
            var startTimeSpan = DateTime.Now.AddDays(1).GetDate() - DateTime.Now + TimeSpan.FromHours(2);
#endif

            Timer = new Timer(DoWork, null, startTimeSpan, TimeSpan.FromDays(1));

            return Task.CompletedTask;
        }

        /// <summary>
        /// Выполнить генерацию карты сайта
        /// </summary>
        /// <param name="state"></param>
        private void DoWork(object state)
        {
            Logger.LogInformation(HostServiceWork);

            SiteMapService.DoWork();
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
