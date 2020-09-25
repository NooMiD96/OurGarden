using DataBase.Abstraction.Model;
using DataBase.Abstraction.Repositories;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using System;
using System.Threading.Tasks;

namespace Web.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class GalleryController : BaseController
    {
        #region Fields

        /// <summary>
        /// Логгер.
        /// </summary>
        private readonly ILogger _logger;

        /// <summary>
        /// 
        /// </summary>
        private readonly IOurGardenRepository _repository;

        #endregion

        #region .ctor

        public GalleryController(ILogger<GalleryController> logger,
                                 IOurGardenRepository repository)
        {
            _logger = logger;
            _repository = repository;
        }

        #endregion

        #region API

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
            {
                var msg = $"Не удалось найти галерею с идентификатором \"{galleryIdentify}\".";
                _logger.LogError(msg);
                return BadRequest(msg);
            }

            return Success(gallery.Photos);
        }

        #endregion
    }
}
