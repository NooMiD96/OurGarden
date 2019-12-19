#pragma warning disable CA1822 // Mark members as static

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;

using Model.EMail;

using Serilog;
using Serilog.Core;
using Serilog.Events;

using Services.BackgroundWork.DummyWorker;
using Services.BackgroundWork.OrderCleaner;
using Services.BackgroundWork.SiteMap;
using Services.EMail;

using System;
using System.Collections.Generic;
using System.IO;

using static Database.DatabaseInitialization;
using static Services.DIServices.DependencyInjections;

namespace Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Log.Logger = new LoggerConfiguration().ReadFrom.Configuration(configuration).CreateLogger();
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            SetupDatabaseSettings(services, Configuration);
            SetupSecureSettings(services, Configuration);

            services.AddResponseCompression();

            var serviceProvider = services.BuildServiceProvider();
            InitDataBase(serviceProvider, Configuration).GetAwaiter().GetResult();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = Configuration.GetValue<string>("SpaPhysicalRootPath");
            });

            services.Configure<EmailSettings>(Configuration.GetSection("EmailSettings"));
            services.AddSingleton<IEmailSender, EmailSender>();

            services.AddHostedService<DummyHostedService>();
            services.AddScoped<IDummyWorkerService, DummyWorkerService>();

            services.AddHostedService<OrderCleanerHostedService>();
            services.AddScoped<IOrderCleanerService, OrderCleanerService>();

            services.AddHostedService<SiteMapHostedService>();
            services.AddScoped<ISiteMapService, SiteMapService>();

            services.AddNodeServices();

            services.AddHsts(options =>
            {
                options.Preload = true;
                options.IncludeSubDomains = true;
                options.MaxAge = TimeSpan.FromDays(365);
            });

            services.AddHttpsRedirection(options =>
            {
                options.RedirectStatusCode = StatusCodes.Status301MovedPermanently;
                options.HttpsPort = 5001;
            });

            StartUpVendors.Configuration = Configuration;
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            string cachePeriod;
            if (env.IsDevelopment())
            {
                cachePeriod = "600";

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
                cachePeriod = "604800";

                app.UseStatusCodePagesWithReExecute("/");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();

                var serverAddressesFeature = app.ServerFeatures.Get<IServerAddressesFeature>();
                var logger = app.ApplicationServices.GetRequiredService<ILogger<Startup>>();
                logger.LogInformation($"Hosting environment: Production\nContent root path: {Directory.GetCurrentDirectory()}\nNow listening on: {String.Join(", ", serverAddressesFeature.Addresses)}");
            }

            app.UseSerilogRequestLogging();

            app.UseResponseCompression();

            app.UseHttpsRedirection();

            app.UseSpaStaticFiles();

            var provider = new FileExtensionContentTypeProvider();
            provider.Mappings[".webmanifest"] = "application/manifest+json";
            app.UseStaticFiles(new StaticFileOptions()
            {
                ContentTypeProvider = provider,
                
            });
            // Не работает, так как, вероятно, ссылается на одну и ту же папку
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(),
                                                                     "wwwroot",
                                                                     "images")),
                RequestPath = "/images",
                OnPrepareResponse = ctx =>
                {
                    ctx.Context.Response.Headers.Append("Cache-Control", $"public, max-age={cachePeriod}");
                }
            });

            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "admin",
                    template: "{controller}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback-admin",
                    templatePrefix: "admin",
                    defaults: new { controller = "Admin", action = "Index" });

                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }
    }
}

#pragma warning restore CA1822 // Mark members as static
