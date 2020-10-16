using ApiService.Abstraction.AdminApi;
using ApiService.Abstraction.Api;
using ApiService.Abstraction.Core;
using ApiService.AdminApi;
using ApiService.Api;
using ApiService.Core;
using ApiService.Core.Admin;

using Microsoft.Extensions.DependencyInjection;

using OrderCleanerHostService.Abstraction;

using PagePingerHostService;
using PagePingerHostService.Abstraction;

using PhotoService;
using PhotoService.Abstraction;

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

            #region Services
            
            services.AddTransient<ISeoService, SeoService>();
            services.AddTransient<IEmailService, ApiService.Core.Email.EmailService>();
            services.AddTransient<IPhotoSaver, PhotoSaver>();
            services.AddTransient<IPhotoEntityUpdater, PhotoEntityUpdater>();
            services.AddTransient<IAdminCRUDService, AdminCRUDService>();

            #endregion

            #region Api

            services.AddTransient<IOrderControllerService, OrderControllerService>();
            services.AddTransient<IHomeControllerService, HomeControllerService>();
            services.AddTransient<INewsControllerService, NewsControllerService>();

            #endregion

            #region AdminApi

            services.AddTransient<IPageInfoControllerService, PageInfoControllerService>();

            #endregion

            return services;
        }
    }
}
