using DataBase.Abstraction.Model;
using DataBase.Abstraction.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using Web.Services;

namespace Web.Controllers.Api;

[Route("api/[controller]")]
[ApiController]
public class GalleryController(ILogger<GalleryController> logger, IOurGardenRepository repository) : BaseController
{
    [HttpGet("[action]")]
    public async Task<IActionResult> GetGalleries()
    {
        var galleries = await repository.GetGalleries();
        return Success(galleries);
    }

    [HttpGet("[action]")]
    public async Task<IActionResult> GetGallery([FromQuery] string galleryIdentify)
    {
        Gallery gallery;
        if (Int32.TryParse(galleryIdentify, out var galleryId))
        {
            gallery = await repository.GetGallery(galleryId);
        }
        else
        {
            gallery = await repository.GetGallery(galleryIdentify);
        }

        if (gallery == null)
        {
            var msg = $"Не удалось найти галерею с идентификатором \"{galleryIdentify}\".";
            logger.LogError(msg);
            return BadRequest(msg);
        }

        return Success(gallery.Photos);
    }
}
