using ApiService.Abstraction.Api;
using ApiService.Abstraction.Core;
using ApiService.Abstraction.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Web.Services;

namespace Web.Controllers.Api;

[Route("api/[controller]")]
[ApiController]
public class HomeController(ILogger<HomeController> logger, IHomeControllerService homeConstollerService, ISeoService seoService) : BaseController
{
    [HttpGet("[action]")]
    public async Task<IActionResult> GetPageInfo([FromQuery] int pageInfoId)
    {
        var execResult = await homeConstollerService.GetPageInfo(pageInfoId);

        if (execResult.IsSuccess)
            return Success(execResult.Result);
        else
            return BadRequest(execResult.Error);
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> SendFeedback([FromBody] FeedbackDTO feedbackDTO)
    {
        var execResult = await homeConstollerService.SendFeedback(feedbackDTO);

        if (execResult.IsSuccess)
            return Success(execResult.Result);
        else
            return BadRequest(execResult.Error);
    }

    [HttpGet("[action]")]
    public async Task<IActionResult> GetPageSEOParams([FromQuery] string pathname)
    {
        var execResult = await seoService.GetPageSeoInformation(pathname);

        if (execResult.IsSuccess)
            return Success(execResult.Result);
        else
            return BadRequest(execResult.Error);
    }

    [HttpPost("[action]")]
    public void LogWebAppError([FromQuery] string errorString)
    {
        logger.LogError(errorString);
    }
}