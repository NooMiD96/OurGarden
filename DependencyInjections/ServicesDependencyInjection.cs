using ApiService;
using ApiService.Abstraction;
using ApiService.Core;

using Microsoft.Extensions.DependencyInjection;

using OrderCleanerHostService.Abstraction;

using PagePingerHostService;
using PagePingerHostService.Abstraction;

using Services.BackgroundWork.OrderCleaner;
using Services.EMail;

using SiteMapHostService;
using SiteMapHostService.Abstraction;

namespace DependencyInjections
{
    public static class ServicesDependencyInjection
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddTransient<IPagePingerService, PagePingerService>();
            services.AddTransient<IOrderCleanerService, OrderCleanerService>();
            services.AddTransient<ISiteMapService, SiteMapService>();
            services.AddTransient<ISiteMapBuilder, SiteMapBuilder>();
            services.AddSingleton<IEmailSender, EmailSender>();
            services.AddTransient<ISiteMapBuilder, SiteMapBuilder>();
            services.AddTransient<IBundlesService, BundlesService>();
            services.AddTransient<IHomeControllerService, HomeControllerService>();

            return services;
        }
    }
}
