using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

using SiteMapHostService.Abstraction;

using System;
using System.Threading.Tasks;

namespace SiteMapHostService
{
    public class SiteMapService : ISiteMapService
    {
        #region Fields

        private readonly ILogger _logger;

        private readonly IServiceProvider _services;

        #endregion

        #region .ctor

        public SiteMapService(IServiceProvider services, ILogger<SiteMapService> logger)
        {
            _services = services;
            _logger = logger;
        }

        #endregion

        public async Task DoWork()
        {
            try
            {
               using var scope = _services.CreateScope();

                var siteMapBuilder = scope.ServiceProvider.GetRequiredService<ISiteMapBuilder>();

                await siteMapBuilder.CreateSiteMap();
            }
            catch (Exception ex)
            {
                // TODO: Send email
                _logger.LogError(ex, $"SiteMapService error: {ex.Message}");
            }
        }
    }
}
