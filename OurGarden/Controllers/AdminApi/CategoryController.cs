using ApiService.Abstraction.AdminApi;
using ApiService.Abstraction.DTO;
using Core.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Web.Services;

namespace Web.Controllers.AdminApi;

[ValidateAntiForgeryToken]
[Authorize(Roles = UserRoles.Admin + ", " + UserRoles.Employee)]
[Route("apiAdmin/[controller]")]
[ApiController]
public class CategoryController(ICategoryControllerService service) : BaseController
{
    [HttpGet("[action]")]
    public async Task<IActionResult> GetCategories()
    {
        var execResult = await service.GetCategories();

        if (execResult.IsSuccess)
            return Success(execResult.Result);
        else
            return BadRequest(execResult.Error);
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> AddOrUpdate([FromForm]CategoryDTO categoryDTO)
    {
        var execResult = await service.AddOrUpdate(categoryDTO);

        if (execResult.IsSuccess)
            return Success(execResult.Result);
        else
            return BadRequest(execResult.Error);
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> Delete([FromQuery]string categoryId)
    {
        var execResult = await service.DeleteCategory(categoryId);

        if (execResult.IsSuccess)
            return Success(execResult.Result);
        else
            return BadRequest(execResult.Error);
    }
}