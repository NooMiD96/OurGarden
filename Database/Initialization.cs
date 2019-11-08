using Database.Contexts;
using Database.Repositories;

using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption;
using Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.ConfigurationModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using Model.Identity;

using System;
using System.IO;

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
                    options.Password.RequiredLength = 6;
                    options.Password.RequireNonAlphanumeric = true;
                    options.Password.RequireLowercase = true;
                    options.Password.RequireUppercase = true;
                    options.Password.RequireDigit = true;

                    options.User.RequireUniqueEmail = true;

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
                .AddIdentityCookies(options =>
                {
                    options.ApplicationCookie.Configure(appConfig =>
                    {
                        appConfig.ExpireTimeSpan = TimeSpan.FromDays(90);
                    });
                });

            services.AddTransient<IOurGardenRepository, OurGardenRepository>();

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
                        EncryptionAlgorithm = EncryptionAlgorithm.AES_256_CBC,
                        ValidationAlgorithm = ValidationAlgorithm.HMACSHA256
                    });
        }

        public static void InitializeDb(ServiceProvider serviceProvider, IConfiguration Configuration)
        {
            InitDataBase(serviceProvider, Configuration).GetAwaiter().GetResult();
        }
    }
}
