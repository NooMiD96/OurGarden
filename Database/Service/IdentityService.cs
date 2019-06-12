using Core.Constants;

using Microsoft.AspNetCore.Identity;

using System.Linq;
using System.Threading.Tasks;

namespace Database.Service
{
    public static class UserManagerExtensions
    {
        public static async Task<string> GetRoleAsync<T>(this UserManager<T> userManager, T user) where T : class =>
            (await userManager.GetRolesAsync(user)).FirstOrDefault() ?? UserRoles.User;

        public static async Task<IdentityResult> AddToRoleAsync<T>(this UserManager<T> userManager, T user, string role) where T : class =>
            await userManager.AddToRoleAsync(user, role);
    }
}
