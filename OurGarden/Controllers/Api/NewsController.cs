using ApiService.Abstraction.Api;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Web.Services;

namespace Web.Controllers.Api;

[Route("api/[controller]")]
[ApiController]
public class NewsController(INewsControllerService service) : BaseController
{
    [HttpGet("[action]")]
    public async Task<IActionResult> GetBreadcrumb([FromQuery] string newsId)
    {
        var execResult = await service.GetBreadcrumb(newsId);

        if (execResult.IsSuccess)
            return Success(execResult.Result);
        else
            return BadRequest(execResult.Error);
    }

    [HttpGet("[action]")]
    public async Task<IActionResult> GetAllNews()
    {
        var execResult = await service.GetAllNews();

        if (execResult.IsSuccess)
            return Success(execResult.Result);
        else
            return BadRequest(execResult.Error);
    }

    [HttpGet("[action]")]
    public async Task<IActionResult> GetNews([FromQuery]string newsId)
    {
        var execResult = await service.GetNews(newsId);

        if (execResult.IsSuccess)
            return Success(execResult.Result);
        else
            return BadRequest(execResult.Error);
    }
}
