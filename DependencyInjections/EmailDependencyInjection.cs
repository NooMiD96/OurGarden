using EmailService;
using EmailService.Abstraction;
using Microsoft.Extensions.DependencyInjection;

namespace DependencyInjections
{
    public static class EmailDependencyInjection
    {
        public static IServiceCollection AddEmailService(this IServiceCollection services)
        {
            services.AddTransient<IEmailSender, EmailSender>();

            return services;
        }
    }
}
