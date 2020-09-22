using ApiService.Abstraction.AdminApi;
using ApiService.Abstraction.Api;
using ApiService.AdminApi;
using ApiService.Api;

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
            
            services.AddTransient<ApiService.Abstraction.IHomeControllerService, ApiService.HomeControllerService>();

            #endregion

            #region Api

            services.AddTransient<IOrderControllerService, OrderControllerService>();
            services.AddTransient<IHomeControllerService, HomeControllerService>();

            #endregion

            #region AdminApi

            services.AddTransient<IPageInfoControllerService, PageInfoControllerService>();

            #endregion

            return services;
        }
    }
}
