using Core.Constants;

using DataBase.Abstraction.Identity;
using DataBase.Abstraction.Repositories;
using DataBase.Context;
using DataBase.Repository;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

using PhotoService.Abstraction;

using System;

namespace DependencyInjections
{
    /// <summary>
    /// class for initialize custom DI.
    /// Apply DB migrations and Initialize admins
    /// </summary>
    public static class DataBaseDependencyInjection
    {
        public const string ASSEMBLY_PATH = "Web";

        public static IServiceCollection SetupDatabaseSettings(this IServiceCollection services, IConfiguration Configuration)
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

            services.AddScoped<IOurGardenRepository, OurGardenRepository>();
            services.AddScoped<IPhotoSaverRepository, OurGardenRepository>();

            return services;
        }

        public static IApplicationBuilder ApplyDatabaseMigrations(this IApplicationBuilder appBuilder,
                                                                  IConfiguration Configuration,
                                                                  ILogger logger)
        {
            using var scope = appBuilder.ApplicationServices.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<OurGardenContext>();
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<ApplicationRole>>();

            try
            {
                dbContext.Database.Migrate();

                var roleNames = UserRoles.RoleList;
                IdentityResult roleResult;

                foreach (var roleName in roleNames)
                {
                    var roleExist = roleManager.RoleExistsAsync(roleName).Result;
                    if (!roleExist)
                    {
                        roleResult = roleManager.CreateAsync(new ApplicationRole(roleName)).Result;

                        if (!roleResult.Succeeded)
                            throw new Exception("Can't add roles in database");
                    }
                }

                var admins = Configuration.GetSection("Admins").GetChildren();
                foreach (var admin in admins)
                {
                    var userName = admin["UserName"];
                    var password = admin["Password"];
                    var email = admin["Email"];

                    var userEntity = userManager.FindByNameAsync(userName).Result;
                    if (userEntity == null)
                    {
                        var poweruser = new ApplicationUser
                        {
                            UserName = userName,
                            Email = email
                        };

                        var createPowerUser = userManager.CreateAsync(poweruser, password).Result;
                        if (createPowerUser.Succeeded)
                        {
                            userManager.AddToRoleAsync(poweruser, UserRoles.Admin).GetAwaiter().GetResult();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"\r\n\r\nОшибка при накате миграций:\r\n\r\n");

                throw new Exception(null, ex);
            }
            finally
            {
                if (roleManager != null)
                    roleManager.Dispose();
                if (userManager != null)
                    userManager.Dispose();
                if (dbContext != null)
                    dbContext.Dispose();
            }

            return appBuilder;
        }
    }
}
