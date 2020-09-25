using ApiService.Abstraction.Api;
using ApiService.Abstraction.Core;
using ApiService.Abstraction.DTO;

using Microsoft.AspNetCore.Mvc;

using System.Threading.Tasks;

namespace Web.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : BaseController
    {
        #region Fields

        /// <summary>
        /// Сервис данного контроллера.
        /// </summary>
        private readonly IHomeControllerService _homeConstollerService;

        /// <summary>
        /// Сервис основной домашний страницы
        /// </summary>
        private readonly ISeoService _seoService;

        #endregion

        #region .ctor

        public HomeController(IHomeControllerService homeConstollerService,
                              ISeoService seoService)
        {
            _homeConstollerService = homeConstollerService;
            _seoService = seoService;
        }

        #endregion

        #region API

        [HttpGet("[action]")]
        public async Task<IActionResult> GetPageInfo([FromQuery] int pageInfoId)
        {
            var execResult = await _homeConstollerService.GetPageInfo(pageInfoId);

            if (execResult.IsSuccess)
                return Success(execResult.Result);
            else
                return BadRequest(execResult.Error);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> SendFeedback([FromBody] FeedbackDTO feedbackDTO)
        {
            var execResult = await _homeConstollerService.SendFeedback(feedbackDTO);

            if (execResult.IsSuccess)
                return Success(execResult.Result);
            else
                return BadRequest(execResult.Error);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetPageSEOParams([FromQuery] string pathname)
        {
            var execResult = await _seoService.GetPageSeoInformation(pathname);

            if (execResult.IsSuccess)
                return Success(execResult.Result);
            else
                return BadRequest(execResult.Error);
        }

        #endregion
    }
}