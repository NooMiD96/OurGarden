using ApiService;
using ApiService.Abstraction;
using ApiService.Abstraction.Api;
using ApiService.Api;
using ApiService.Core;

using Microsoft.Extensions.DependencyInjection;

using OrderCleanerHostService.Abstraction;

using PagePingerHostService;
using PagePingerHostService.Abstraction;

using Services.BackgroundWork.OrderCleaner;

using SiteMapHostService;
using SiteMapHostService.Abstraction;

namespace DependencyInjections
{
    public static class ServicesDependencyInjection
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            #region Host Services

            services.AddTransient<IPagePingerService, PagePingerService>();
            services.AddTransient<IOrderCleanerService, OrderCleanerService>();
            services.AddTransient<ISiteMapService, SiteMapService>();
            services.AddTransient<ISiteMapBuilder, SiteMapBuilder>();

            #endregion

            #region Home services
            
            services.AddTransient<IBundlesService, BundlesService>();
            services.AddTransient<IHomeControllerService, HomeControllerService>();

            #endregion

            #region Api

            services.AddTransient<IOrderControllerService, OrderControllerService>();

            #endregion

            return services;
        }
    }
}
