using EmailService;
using EmailService.Abstraction;

using Microsoft.Extensions.DependencyInjection;

using Mjml.AspNetCore;

namespace DependencyInjections
{
    public static class EmailDependencyInjection
    {
        public static IServiceCollection AddEmailService(this IServiceCollection services)
        {
            services.AddTransient<IEmailSender, EmailSender>();
            services.AddMjmlServices(o =>
            {
                o.DefaultKeepComments = false;
                o.DefaultMinify = true;
            });

            return services;
        }
    }
}
