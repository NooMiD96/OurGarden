using Database.Contexts;
using Database.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using Model.Identity;

using System;

using static Database.DIServices.DependencyInjections;

namespace Database
{
    public static class DatabaseInitialization
    {
        public const string ASSEMBLY_PATH = "Web";

        public static void SetupDatabaseSettings(IServiceCollection services, IConfiguration Configuration)
        {

            services
                .AddDbContext<OurGardenContext>(options =>
                {
                    options.UseSqlServer(Configuration.GetConnectionString("OurGarden"),
                                         x => x.MigrationsAssembly(ASSEMBLY_PATH));
                })
                .AddIdentityCore<ApplicationUser>(options =>
                {
                    options.Password.RequiredLength = 3;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequireLowercase = false;
                    options.Password.RequireUppercase = false;
                    options.Password.RequireDigit = false;

                    options.User.RequireUniqueEmail = false;

                    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
                    options.Lockout.MaxFailedAccessAttempts = 10;
                    options.Lockout.AllowedForNewUsers = true;
                })
                .AddErrorDescriber<RussianIdentityErrorDescriber>()
                .AddRoles<ApplicationRole>()
                .AddUserManager<UserManager<ApplicationUser>>()
                .AddRoleManager<RoleManager<ApplicationRole>>()
                .AddSignInManager()
                .AddEntityFrameworkStores<OurGardenContext>();

            services
                .AddAuthentication(IdentityConstants.ApplicationScheme)
                .AddIdentityCookies();
                //(options =>
                //{
                //    options.Cookie.HttpOnly = true;
                //    options.ExpireTimeSpan = TimeSpan.FromMinutes(30);
                //    options.SlidingExpiration = true;
                //    options.ReturnUrlParameter = "";
                //    options.LoginPath = "";
                //    options.AccessDeniedPath = "";
                //});
            services.AddTransient<IOurGardenRepository, OurGardenRepository>();
        }

        public static void InitializeDb(ServiceProvider serviceProvider, IConfiguration Configuration)
        {
            InitDataBase(serviceProvider, Configuration).GetAwaiter().GetResult();
        }
    }
}
