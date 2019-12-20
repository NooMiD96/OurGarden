using Database.Contexts;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

using System;
using System.Threading.Tasks;

namespace Services.BackgroundWork.SiteMap
{
    public class SiteMapService : ISiteMapService
    {
        readonly ILogger _logger;
        private readonly IServiceProvider _services;

        const string HostServiceName = "SiteMapService";
        const string HostServiceStart = HostServiceName + " is starting.";
        const string HostServiceEnd = HostServiceName + " is worked end.";

        public SiteMapService(IServiceProvider services, ILogger<SiteMapService> logger)
        {
            _services = services;
            _logger = logger;
        }

        public async Task DoWork()
        {
            _logger.LogInformation(HostServiceStart);

            using (var scope = _services.CreateScope())
                try
                {
                    var context = scope.ServiceProvider.GetRequiredService<OurGardenContext>();
                    var siteMapBuilder = new SiteMapBuilder(context);

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
