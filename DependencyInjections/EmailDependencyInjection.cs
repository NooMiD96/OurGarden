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
            services.AddSingleton<IEmailSender, EmailSender>();
            services.AddMjmlServices();

            return services;
        }
    }
}
