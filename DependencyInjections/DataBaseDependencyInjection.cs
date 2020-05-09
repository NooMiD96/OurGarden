using Core.Constants;

using DataBase.Abstraction.Identity;
using DataBase.Abstraction.Repositories;
using DataBase.Context;
using DataBase.Repository;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using System;
using System.Threading.Tasks;

namespace DependencyInjections
{
    /// <summary>
    /// class for initialize custom DI.
    /// Apply DB migrations and Initialize admins
    /// </summary>
    public static class DataBaseDependencyInjection
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

            services.AddTransient<IOurGardenRepository, OurGardenRepository>();
        }

        public static async Task ApplyDatabaseMigrations(IServiceProvider serviceProvider, IConfiguration Configuration)
        {
            using var scope = serviceProvider.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<OurGardenContext>();
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<ApplicationRole>>();

            try
            {
                await dbContext.Database.MigrateAsync();

                var roleNames = UserRoles.RoleList;
                IdentityResult roleResult;

                foreach (var roleName in roleNames)
                {
                    var roleExist = await roleManager.RoleExistsAsync(roleName);
                    if (!roleExist)
                    {
                        roleResult = await roleManager.CreateAsync(new ApplicationRole(roleName));

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

                    var _user = await userManager.FindByNameAsync(userName);
                    if (_user == null)
                    {
                        var poweruser = new ApplicationUser
                        {
                            UserName = userName,
                            Email = email
                        };

                        var createPowerUser = await userManager.CreateAsync(poweruser, password);
                        if (createPowerUser.Succeeded)
                        {
                            await userManager.AddToRoleAsync(poweruser, UserRoles.Admin);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"\r\n\r\ninfo: Trouble with first connection to identity database:\n{ex.Message}\r\n\r\n");
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
        }
    }
}
