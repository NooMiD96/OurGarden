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

        [HttpPost("[action]")]
        public async Task<IActionResult> Add(
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
        public async Task<IActionResult> Update(
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
        public async Task<IActionResult> Delete(
            [FromQuery]int videoId)
        {
            await _repository.DeleteVideo(videoId);
            return Ok();
        }
    }
}