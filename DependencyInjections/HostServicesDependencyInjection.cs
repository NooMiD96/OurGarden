using Microsoft.Extensions.DependencyInjection;

using OrderCleanerHostService;

using PagePingerHostService;

using SiteMapHostService;

namespace DependencyInjections
{
    public static class HostServicesDependencyInjection
    {
        public static IServiceCollection AddHostServices(this IServiceCollection services)
        {
            services.AddHostedService<PagePingerHostedService>();
            services.AddHostedService<OrderCleanerHostedService>();
            services.AddHostedService<SiteMapHostedService>();

            return services;
        }
    }
}
