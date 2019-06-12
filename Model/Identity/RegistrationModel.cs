using Microsoft.AspNetCore.Identity;

using System.Linq;
using System.Threading.Tasks;

namespace Model.Identity
{
    public class RegistrationModel
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        /// <summary>
        /// Check Password of User
        /// </summary>
        /// <typeparam name="T">Usually it is ApplicationUser</typeparam>
        /// <param name="userManager">The manager which give Validation Rules</param>
        /// <param name="errors">If Password is not valid then return rules which not passed, else return null</param>
        /// <returns></returns>
        public bool IsValid<T>(UserManager<T> userManager, T user, out IdentityError error) where T: class
        {
            IdentityError returnErrors = null;
            async ValueTask<bool> IsNotValid(object x)
            {
                IdentityResult validResul;
                switch (x)
                {
                    case IPasswordValidator<T> p:
                        validResul = await p.ValidateAsync(userManager, user, Password);
                        break;
                    case IUserValidator<T> u:
                        validResul = await u.ValidateAsync(userManager, user);
                        break;
                    default:
                        return true;
                }
                if (!validResul.Succeeded)
                {
                    returnErrors = validResul.Errors.FirstOrDefault();
                    return true;
                }
                else
                {
                    return false;
                }
            }

            var IsAnyPasswordRulesNotPassed = userManager.PasswordValidators
                .Any(x => IsNotValid(x).GetAwaiter().GetResult());
            var IsAnyUserRulesNotPassed = userManager.UserValidators
                .Any(x => IsNotValid(x).GetAwaiter().GetResult());
            error = returnErrors;
            return !(IsAnyPasswordRulesNotPassed || IsAnyUserRulesNotPassed);
        }
    }
}
