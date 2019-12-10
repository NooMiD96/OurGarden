#pragma warning disable CA1822 // Mark members as static

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using Model.EMail;

using Services.BackgroundWork.DummyWorker;
using Services.BackgroundWork.OrderCleaner;
using Services.EMail;

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

            services.AddNodeServices();

            StartUpVendors.Configuration = Configuration;
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacementClientOptions = new Dictionary<string, string> { { "dynamicPublicPath", "false" } },
                    ProjectPath = Path.Combine(Directory.GetCurrentDirectory(), "Web/ClientApp"),
                    HotModuleReplacement = true,
                    ReactHotModuleReplacement = true
                });
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacementClientOptions = new Dictionary<string, string> { { "dynamicPublicPath", "false" } },
                    ProjectPath = Path.Combine(Directory.GetCurrentDirectory(), "Web/AdminApp"),
                    HotModuleReplacement = true,
                    ReactHotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseResponseCompression();

            app.UseHttpsRedirection();

            app.UseSpaStaticFiles();

            var provider = new FileExtensionContentTypeProvider();
            provider.Mappings[".webmanifest"] = "application/manifest+json";
            app.UseStaticFiles(new StaticFileOptions
            {
                ContentTypeProvider = provider
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
