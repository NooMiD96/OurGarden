using Core.Constants;

using Database.Repositories;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Model.DB;
using Model.DTO;
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
        private readonly IOurGardenRepository _repository;
        public VideoController(IOurGardenRepository repository)
        {
            _repository = repository;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddOrUpdate(
            [FromForm]VideoDTO video)
        {
            try
            {
                if ((video?.VideoId ?? 0) <= 0)
                {
                    var newVideo = new Video()
                    {
                        Date = DateTime.Now,
                        Description = video.Description,
                        Title = video.Title,
                        Url = video.Url,
                    };
                    await _repository.AddVideo(newVideo);
                    return Success(newVideo);
                }
                else
                {
                    var oldVideo = await _repository.GetVideo(video.VideoId);
                    if (
                        !video.Description.Equals(oldVideo.Description)
                        || !video.Title.Equals(oldVideo.Title) 
                        || !video.Url.Equals(oldVideo.Url)
                    )
                    {
                        oldVideo.Title = video.Title;
                        oldVideo.Description = video.Description;
                        oldVideo.Url = video.Url;

                        await _repository.UpdateVideo(oldVideo);
                        return Success(video);
                    }
                    return Success(video);
                }
               
            }
            catch (Exception)
            {
                return BadRequest("Что-то пошло не так, повторите попытку");
            }
        }       

        [HttpPost("[action]")]
        public async Task<IActionResult> Delete(
            [FromQuery]string videoId)
        {
            int id = 0;
            if (int.TryParse(videoId, out id))
                await _repository.DeleteVideo(id);

            return Success(true);
        }
    }
}