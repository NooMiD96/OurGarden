using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

using SiteMapHostService.Abstraction;

using System;
using System.Threading.Tasks;

namespace SiteMapHostService
{
    public class SiteMapService : ISiteMapService
    {
        readonly ILogger _logger;
        private readonly IServiceProvider Services;

        const string HostServiceName = "SiteMapService";
        const string HostServiceStart = HostServiceName + " is starting.";
        const string HostServiceEnd = HostServiceName + " is worked end.";

        public SiteMapService(IServiceProvider services, ILogger<SiteMapService> logger)
        {
            Services = services;
            _logger = logger;
        }

        public async Task DoWork()
        {
            _logger.LogInformation(HostServiceStart);

            using (var scope = Services.CreateScope())
                try
                {
                    var siteMapBuilder = scope.ServiceProvider.GetRequiredService<ISiteMapBuilder>();

                    await siteMapBuilder.CreateSiteMap();
                }
                catch (Exception ex)
                {
                    // TODO: Send email
                    _logger.LogError(ex, $"{HostServiceName}: {ex.Message}");
                }

            _logger.LogInformation(HostServiceEnd);
        }
    }
}
