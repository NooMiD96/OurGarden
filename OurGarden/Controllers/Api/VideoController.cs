using DataBase.Abstraction.Repositories;

using Microsoft.AspNetCore.Mvc;

using System.Threading.Tasks;

namespace Web.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideoController : BaseController
    {
        private readonly IOurGardenRepository _repository;

        public VideoController(IOurGardenRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllVideo()
        {
            var video = await _repository.GetVideo();
            return Success(video);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetVideo([FromQuery]int videoId)
        {
            var video = await _repository.GetVideo(videoId);

            if (video == null)
                return BadRequest("Что-то пошло не так, повторите попытку");

            return Success(video);
        }
    }
}
