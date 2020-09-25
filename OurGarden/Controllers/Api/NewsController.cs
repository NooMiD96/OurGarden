using ApiService.Abstraction.Api;

using Microsoft.AspNetCore.Mvc;

using System.Threading.Tasks;

namespace Web.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : BaseController
    {
        #region Fields
        
        private readonly INewsControllerService _service;

        #endregion

        #region .ctor

        public NewsController(INewsControllerService service)
        {
            _service = service;
        }

        #endregion

        #region API

        [HttpGet("[action]")]
        public async Task<IActionResult> GetBreadcrumb([FromQuery] string newsId)
        {
            var execResult = await _service.GetBreadcrumb(newsId);

            if (execResult.IsSuccess)
                return Success(execResult.Result);
            else
                return BadRequest(execResult.Error);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllNews()
        {
            var execResult = await _service.GetAllNews();

            if (execResult.IsSuccess)
                return Success(execResult.Result);
            else
                return BadRequest(execResult.Error);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetNews([FromQuery]string newsId)
        {
            var execResult = await _service.GetNews(newsId);

            if (execResult.IsSuccess)
                return Success(execResult.Result);
            else
                return BadRequest(execResult.Error);
        }

        #endregion
    }
}
