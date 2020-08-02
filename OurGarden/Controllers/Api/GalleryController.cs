using DataBase.Abstraction.Model;
using DataBase.Abstraction.Repositories;

using Microsoft.AspNetCore.Mvc;

using System;
using System.Threading.Tasks;

namespace Web.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class GalleryController : BaseController
    {
        private readonly IOurGardenRepository _repository;

        public GalleryController(IOurGardenRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetGalleries()
        {
            var galleries = await _repository.GetGalleries();
            return Success(galleries);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetGallery([FromQuery] string galleryIdentify)
        {
            Gallery gallery;
            if (Int32.TryParse(galleryIdentify, out var galleryId))
            {
                gallery = await _repository.GetGallery(galleryId);
            }
            else
            {
                gallery = await _repository.GetGallery(galleryIdentify);
            }

            if (gallery == null)
                return BadRequest($"Не удалось найти галерею с идентификатором \"{galleryIdentify}\".");

            return Success(gallery.Photos);
        }
    }
}
