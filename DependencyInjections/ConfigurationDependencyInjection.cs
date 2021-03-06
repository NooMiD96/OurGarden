﻿using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using Model;

namespace DependencyInjections
{
    /// <summary>
    /// Настройка (применение) конфигурационных файлов.
    /// </summary>
    public static class ConfigurationDependencyInjection
    {
        public static IServiceCollection AddConfigurations(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<SeoInformationOption>(configuration.GetSection("SeoInformation"));
            services.Configure<OrderCleanerOptions>(configuration.GetSection("OrderCleanerOptions"));
            services.Configure<EmailOptions>(configuration.GetSection("EmailSettings"));
            services.Configure<EmailServiceConfigurationOptions>(configuration.GetSection("EmailServiceConfiguration"));
            services.Configure<RootOptions>(configuration);
            services.Configure<SeoServicesOptions>(configuration);

            return services;
        }
    }
}
