using Core.Constants;

using Database.Repositories;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Model.DB;

using System;
using System.Threading.Tasks;

namespace Web.Controllers.AdminApi
{
    [ValidateAntiForgeryToken]
    [Authorize(Roles = UserRoles.Admin + ", " + UserRoles.Employee)]
    [Route("api/[controller]")]
    [ApiController]
    public class VideoController : ControllerBase
    {
        public readonly IOurGardenRepository _repository;
        public VideoController(IOurGardenRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllVideo()
        {
            var video = await _repository.GetVideo();
            return Ok(video);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetVideo(
            [FromQuery]int videoId)
        {
            var video = await _repository.GetVideo(videoId);

            if (video == null)
                return BadRequest();

            return Ok(video);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddVideo(
            [FromForm]Video video)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                await _repository.AddVideo(video);
                return Ok(video);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> UpdateVideo(
            [FromForm]Video video)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }
               
                await _repository.UpdateVideo(video);

                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteVideo(
            [FromQuery]int videoId)
        {
            await _repository.DeleteVideo(videoId);
            return Ok();
        }
    }
}