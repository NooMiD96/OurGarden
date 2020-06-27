#pragma warning disable CA1822 // Mark members as static

using DependencyInjections;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

using Serilog;

using System;
using System.Collections.Generic;
using System.IO;

using static DependencyInjections.DataBaseDependencyInjection;
using static DependencyInjections.SecureDependencyInjection;

namespace Web
{
    [Obsolete]
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Log.Logger = new LoggerConfiguration().ReadFrom.Configuration(configuration).CreateLogger();
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        /// <summary>
        /// This method gets called by the runtime. Use this method to add services to the container.
        /// </summary>
        public void ConfigureServices(IServiceCollection services)
        {
            services.SetupDatabaseSettings(Configuration)
                    .SetupSecureSettings(Configuration)
                    .AddResponseCompression()
                    .AddConfigurations(Configuration)
                    .AddEmailService()
                    .AddServices()
                    .AddHostServices()
                    .AddNodeServices();

            services.AddControllersWithViews()
                    .AddNewtonsoftJson(x =>
                    {
                        x.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                        x.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                        x.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    });

            services.AddHsts(options =>
            {
                options.Preload = true;
                options.IncludeSubDomains = true;
                options.MaxAge = TimeSpan.FromDays(365);
            });

            services.AddHttpsRedirection(options =>
            {
                options.RedirectStatusCode = StatusCodes.Status301MovedPermanently;
                options.HttpsPort = 443;
            });

            StartUpVendors.Configuration = Configuration;
        }

        /// <summary>
        /// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        /// </summary>
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            var serverAddressesFeature = app.ServerFeatures.Get<IServerAddressesFeature>();
            var logger = app.ApplicationServices.GetRequiredService<ILogger<Startup>>();

            string cachePeriod;
            if (env.IsDevelopment())
            {
                cachePeriod = "10";

                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacementClientOptions = new Dictionary<string, string> { { "dynamicPublicPath", "false" } },
                    ProjectPath = Path.Combine(Directory.GetCurrentDirectory(), "Web", "ClientApp"),
                    HotModuleReplacement = true,
                    ReactHotModuleReplacement = true
                });
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacementClientOptions = new Dictionary<string, string> { { "dynamicPublicPath", "false" } },
                    ProjectPath = Path.Combine(Directory.GetCurrentDirectory(), "Web", "AdminApp"),
                    HotModuleReplacement = true,
                    ReactHotModuleReplacement = true
                });
            }
            else
            {
                /// Неделя
                cachePeriod = "604800";

                app.UseStatusCodePagesWithReExecute("/")
                   .UseHsts();

                logger.LogInformation($"Hosting environment: Production\nContent root path: {Directory.GetCurrentDirectory()}\nNow listening on: {String.Join(", ", serverAddressesFeature.Addresses)}");
            }

            app.ApplyDatabaseMigrations(Configuration, logger);

            app.UseSerilogRequestLogging()
               .UseHttpsRedirection()
               .UseResponseCompression();

            var provider = new FileExtensionContentTypeProvider();
            provider.Mappings[".webmanifest"] = "application/manifest+json";
            app.UseStaticFiles(new StaticFileOptions
            {
                ContentTypeProvider = provider,
                OnPrepareResponse = ctx =>
                {
                    if (ctx.Context.Request.Path.HasValue && ctx.Context.Request.Path.Value.StartsWith("/images"))
                    {
                        ctx.Context.Response.Headers.Append("Cache-Control", $"public, max-age={cachePeriod}");
                    }
                }
            });

            app.UseRouting();

            app.UseAuthentication()
               .UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "admin",
                    pattern: "admin/{controller=Admin}/{action=Index}/{id?}");

                endpoints.MapFallbackToController(
                    pattern: "admin/{controller=Admin}/{action=Index}/{id?}",
                    action: "Index",
                    controller: "Admin");

                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");

                endpoints.MapFallbackToController(
                    action: "Index",
                    controller: "Home");
            });
        }
    }
}

#pragma warning restore CA1822 // Mark members as static
