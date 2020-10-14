using ApiService.Abstraction.Core;
using ApiService.Abstraction.DTO;

using Core.Constants;

using DataBase.Abstraction.Repositories;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using PhotoService.Abstraction;

using System;
using System.Threading.Tasks;

using Web.Services.Controllers.AdminApi;

namespace Web.Controllers.AdminApi
{
    [ValidateAntiForgeryToken]
    [Authorize(Roles = UserRoles.Admin + ", " + UserRoles.Employee)]
    [Route("apiAdmin/[controller]")]
    [ApiController]
    public class GalleryController : BaseController
    {
        private readonly IOurGardenRepository _repository;
        private readonly GalleryControllerService _service;
        private readonly ILogger _logger;
        private const string CONTROLLER_LOCATE = "AdminApi.GalleryController";
        private const string ERROR = "Что-то пошло не так, повторите попытку.";

        public GalleryController(IOurGardenRepository repository,
                                 ILogger<GalleryController> logger,
                                 IPhotoSaver photoSaver,
                                 IPhotoEntityUpdater photoEntityUpdater)
        {
            _repository = repository;
            _logger = logger;
            _service = new GalleryControllerService(repository, photoSaver, photoEntityUpdater);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetGalleries()
        {
            var galleries = await _repository.GetGalleries();
            return Success(galleries);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddOrUpdate([FromForm]GalleryDTO galleryDTO)
        {
            const string API_LOCATE = CONTROLLER_LOCATE + ".AddOrUpdate";
            var error = ERROR;

            try
            {
                bool isSuccess;

                if (galleryDTO.GalleryId <= 0)
                {
                    (isSuccess, error) = await _service.AddGallery(galleryDTO);
                }
                else
                {
                    var oldGallery = await _repository.GetGallery(galleryDTO.GalleryId);

                    if (oldGallery is null)
                        return LogBadRequest(
                            _logger,
                            API_LOCATE,
                            customError: $"Что-то пошло не так, не удалось найти галерею.\n\tГалерея: {galleryDTO.GalleryId}"
                        );

                    (isSuccess, error) = await _service.UpdateGallery(galleryDTO, oldGallery);
                }

                if (!isSuccess)
                    return LogBadRequest(
                        _logger,
                        API_LOCATE,
                        customError: error
                    );

                return Success(isSuccess);
            }
            catch (Exception ex)
            {
                return LogBadRequest(
                    _logger,
                    API_LOCATE,
                    exception: ex,
                    customError: error
                );
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Delete([FromQuery]int galleryId)
        {
            const string API_LOCATE = CONTROLLER_LOCATE + ".Delete";

            var (isSuccess, error) = await _service.DeleteGallery(galleryId);

            if (isSuccess)
                return Success(isSuccess);
            else
                return LogBadRequest(
                    _logger,
                    API_LOCATE,
                    customError: error
                );
        }
    }
}