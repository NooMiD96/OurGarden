using Database.Service;

using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using Model.Identity;

using System.Threading.Tasks;

using static Core.Antiforgery.Xsrf;

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

        //[HttpPost("[action]")]
        //public async Task<IActionResult> Registration([FromBody] RegistrationModel userModel)
        //{
        //    var user = new ApplicationUser
        //    {
        //        UserName = userModel.UserName,
        //        Email = userModel.Email
        //    };
        //    _logger.LogDebug($"Registration: UserName:{user.UserName}, Email:{user.Email}");

        //    if (userModel.IsValid(_userManager, user, out var error))
        //    {
        //        _logger.LogDebug($"Registration: Model is valid");

        //        var result = await _userManager.CreateAsync(user, userModel.Password);
        //        if (result.Succeeded)
        //        {
        //            _logger.LogDebug($"Registration: Create user is Succeeded");

        //            //var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
        //            //var callbackUrl = Url.EmailConfirmationLink(user.Id, code, Request.Scheme);
        //            //await _emailSender.SendEmailConfirmationAsync(model.Email, callbackUrl);

        //            //await _context.AddNewUserAsync(user.Id);
        //            await _userManager.AddToRoleAsync(user, UserRoles.User);
        //            await _signInManager.SignInAsync(user, isPersistent: true);

        //            return Success(_service.SuccessUserAuth(user.UserName, UserRoles.User));
        //        }
        //        else
        //        {
        //            _logger.LogDebug($"Registration: Create user is Failure");

        //            // TODO: can't create
        //            // return error description
        //            return BadRequest(result.Errors.FirstOrDefault()?.Description ?? _pleaseTryAgain);
        //        }
        //    }
        //    _logger.LogDebug($"Registration: Model is invalid");

        //    // TODO: not valid
        //    // return error description
        //    return BadRequest(error.Description ?? _pleaseTryAgain);
        //}

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
                    //if (result.RequiresTwoFactor)
                    //    return RedirectToAction(nameof(LoginWith2fa), new { returnUrl, model.RememberMe });
                    //if (result.IsLockedOut)
                    //    return RedirectToAction(nameof(Lockout));

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
                return Success(XsrfToXpt(_antiforgery.GetAndStoreTokens(HttpContext)));
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
