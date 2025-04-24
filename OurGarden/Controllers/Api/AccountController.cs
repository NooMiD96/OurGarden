using Core.Antiforgery;
using DataBase.Abstraction.Identity;
using DataBase.Core;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Web.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : BaseController
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly AccountService _service;
        private readonly IAntiforgery _antiforgery;

        const string _pleaseTryAgain = "Повторите попытку позже";
        const string _incorrectCredentials = "Неверный логин или пароль";

        public AccountController(UserManager<ApplicationUser> userManager,
                                 SignInManager<ApplicationUser> signInManager,
                                 IAntiforgery antiforgery)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _service = new AccountService();
            _antiforgery = antiforgery;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Authentication([FromBody] LoginModel userModel)
        {
            if (userModel.IsValid(out var error))
            {
                var user = await _userManager.FindByNameAsync(userModel.UserName);
                if (user is null) return BadRequest(_incorrectCredentials);

                var isPasswordCanPass = await _signInManager.CheckPasswordSignInAsync(user, userModel.Password, false);
                if (!isPasswordCanPass.Succeeded) return BadRequest(_incorrectCredentials);

                var result = await _signInManager.PasswordSignInAsync(
                    user,
                    userModel.Password,
                    isPersistent: true,
                    lockoutOnFailure: false
                );

                if (result.Succeeded)
                {
                    var userRoleDefined = await _userManager.GetRoleAsync(user);

                    return Success(_service.SuccessUserAuth(user.UserName, userRoleDefined));
                }
                else
                {
                    // TODO: can't login
                    // return error description
                    return BadRequest(_pleaseTryAgain);
                }
            }
            else
            {
                // TODO: not valid
                // return error description
                return BadRequest(error.Description ?? _pleaseTryAgain);
            }
        }

        [HttpPost("[action]")]
        public IActionResult ReNewXSRF([FromBody] RegistrationModel model)
        {
            if (model == null)
            {
                throw new System.ArgumentNullException(nameof(model));
            }

            if (_signInManager.IsSignedIn(User))
            {
                return Success(Xsrf.XsrfToXpt(_antiforgery.GetAndStoreTokens(HttpContext)));
            }
            return BadRequest("Не удалось получить подтверждение. " + _pleaseTryAgain);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Logout()
        {
            var userName = User.Identity.Name;
            await _signInManager.SignOutAsync();
            return Success(_service.SuccessLogOut(userName));
        }
    }
}
