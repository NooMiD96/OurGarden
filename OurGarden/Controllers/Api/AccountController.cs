using Core.Antiforgery;
using DataBase.Abstraction.Identity;
using DataBase.Core;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Web.Services;

namespace Web.Controllers.Api;

[Route("api/[controller]")]
[ApiController]
public class AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IAntiforgery antiforgery) : BaseController
{
    private readonly AccountService _service = new AccountService();

    const string _pleaseTryAgain = "Повторите попытку позже";
    const string _incorrectCredentials = "Неверный логин или пароль";

    [HttpPost("[action]")]
    public async Task<IActionResult> Authentication([FromBody] LoginModel userModel)
    {
        if (userModel.IsValid(out var error))
        {
            var user = await userManager.FindByNameAsync(userModel.UserName);
            if (user is null) return BadRequest(_incorrectCredentials);

            var isPasswordCanPass = await signInManager.CheckPasswordSignInAsync(user, userModel.Password, false);
            if (!isPasswordCanPass.Succeeded) return BadRequest(_incorrectCredentials);

            var result = await signInManager.PasswordSignInAsync(
                user,
                userModel.Password,
                isPersistent: true,
                lockoutOnFailure: false
            );

            if (result.Succeeded)
            {
                var userRoleDefined = await userManager.GetRoleAsync(user);

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

        if (signInManager.IsSignedIn(User))
        {
            return Success(Xsrf.XsrfToXpt(antiforgery.GetAndStoreTokens(HttpContext)));
        }
        return BadRequest("Не удалось получить подтверждение. " + _pleaseTryAgain);
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> Logout()
    {
        var userName = User.Identity.Name;
        await signInManager.SignOutAsync();
        return Success(_service.SuccessLogOut(userName));
    }
}
