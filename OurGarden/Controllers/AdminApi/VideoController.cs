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
    public class VideoController : BaseController
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
                return BadRequest("Что-то пошло не так, повторите попытку");
            }

            try
            {
                await _repository.AddVideo(video);
                return Success(video);
            }
            catch (Exception)
            {
                return BadRequest("Что-то пошло не так, повторите попытку");
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
                    return BadRequest("Что-то пошло не так, повторите попытку");
                }
               
                await _repository.UpdateVideo(video);

                return Success(true);
            }
            catch (Exception)
            {
                return BadRequest("Что-то пошло не так, повторите попытку");
            }
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> Delete(
            [FromQuery]int videoId)
        {
            await _repository.DeleteVideo(videoId);
            return Success(true);
        }
    }
}