using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption;
using Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.ConfigurationModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using System;
using System.IO;
using System.Threading.Tasks;

namespace DependencyInjections
{
    public static class SecureDependencyInjection
    {
        public static void SetupSecureSettings(IServiceCollection services, IConfiguration Configuration)
        {
            services
                .AddAuthentication(IdentityConstants.ApplicationScheme)
                .AddIdentityCookies(options =>
                {
                    options.ApplicationCookie.Configure(appConfig =>
                    {
                        appConfig.ExpireTimeSpan = TimeSpan.FromDays(90);

                        appConfig.Events = new CookieAuthenticationEvents()
                        {
                            OnRedirectToLogin = (ctx) =>
                            {
                                var apiRequest = ctx.Request.Path.StartsWithSegments("/api") || ctx.Request.Path.StartsWithSegments("/apiAdmin");

                                if (apiRequest && ctx.Response.StatusCode == 200)
                                {
                                    ctx.Response.StatusCode = 401;
                                }

                                return Task.CompletedTask;
                            },
                            OnRedirectToAccessDenied = (ctx) =>
                            {
                                var apiRequest = ctx.Request.Path.StartsWithSegments("/api") || ctx.Request.Path.StartsWithSegments("/apiAdmin");

                                if (apiRequest && ctx.Response.StatusCode == 200)
                                {
                                    ctx.Response.StatusCode = 403;
                                }

                                return Task.CompletedTask;
                            },
                        };
                    });
                });

            services.AddDataProtection()
                .PersistKeysToFileSystem(
                    new DirectoryInfo(
                        $@"{Directory.GetCurrentDirectory()}\key\"
                    )
                )
                .SetDefaultKeyLifetime(TimeSpan.FromDays(90))
                .UseCryptographicAlgorithms(
                    new AuthenticatedEncryptorConfiguration()
                    {
                        ValidationAlgorithm = ValidationAlgorithm.HMACSHA256,
                        EncryptionAlgorithm = EncryptionAlgorithm.AES_256_CBC,
                    });

            services.AddAntiforgery(options =>
            {
                options.HeaderName = Configuration.GetValue<string>("XsrfName");
                //cookie is only for the same-site requests
                options.Cookie.SameSite = Microsoft.AspNetCore.Http.SameSiteMode.Strict;
                options.Cookie.Name = Configuration.GetValue<string>("XsrfName");
            });
        }
    }
}
