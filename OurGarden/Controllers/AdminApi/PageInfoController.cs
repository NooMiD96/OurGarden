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
public class PageInfoController(IPageInfoControllerService service) : BaseController
{
    [HttpGet("[action]")]
    public async Task<IActionResult> GetPageInfos()
    {
        var execResult = await service.GetPageInfos();

        if (execResult.IsSuccess)
            return Success(execResult.Result);
        else
            return BadRequest(execResult.Error);
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> AddOrUpdate([FromForm] PageInfoDTO pageInfoDTO)
    {
        var execResult = await service.AddOrUpdate(pageInfoDTO);

        if (execResult.IsSuccess)
            return Success(execResult.Result);
        else
            return BadRequest(execResult.Error);
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> Delete([FromQuery] int pageInfoId)
    {
        var execResult = await service.DeletePageInfo(pageInfoId);

        if (execResult.IsSuccess)
            return Success(execResult.Result);
        else
            return BadRequest(execResult.Error);
    }
}