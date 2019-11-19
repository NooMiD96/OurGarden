using Core.Constants;
using Core.Helpers;

using Database.Repositories;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using Model.DB;
using Model.DTO;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Controllers.AdminApi
{
    [ValidateAntiForgeryToken]
    [Authorize(Roles = UserRoles.Admin + ", " + UserRoles.Employee)]
    [Route("apiAdmin/[controller]")]
    [ApiController]
    public class GalleryController : BaseController
    {
        private readonly IOurGardenRepository _repository;
        private readonly FileHelper _fileHelper;
        private readonly ILogger _logger;
        private const string CONTROLLER_LOCATE = "AdminApi.GalleryController";

        public GalleryController(IOurGardenRepository repository,
                                 ILogger<GalleryController> logger)
        {
            _repository = repository;
            _fileHelper = new FileHelper(repository);
            _logger = logger;
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
            var error = "Что-то пошло не так, повторите попытку.";
            const string API_LOCATE = CONTROLLER_LOCATE + ".AddOrUpdate";

            try
            {
                if (galleryDTO.GalleryId <= 0)
                {
                    var newGallery = new Gallery()
                    {
                        Name = galleryDTO.Name,
                        Alias = galleryDTO.Name.TransformToId(),
                        Photos = new List<Photo>()
                    };

                    foreach (var file in galleryDTO.AddFiles)
                    {
                        var fileHelper = new FileHelper(_repository);
                        var photo = await fileHelper.AddFileWithPreviewToRepository(file);
                        newGallery.Photos.Add(photo);
                    }

                    await _repository.AddGallery(newGallery);
                }
                else
                {
                    var oldGallery = await _repository.GetGallery(galleryDTO.GalleryId);

                    if (oldGallery is null)
                    {
                        return LogBadRequest(
                            _logger,
                            API_LOCATE,
                            $"Что-то пошло не так, не удалось найти галерею.\n\tГалерея: {galleryDTO.GalleryId}"
                        );
                    }

                    oldGallery.Name = galleryDTO.Name;

                    if (galleryDTO.AddFiles != null && galleryDTO.AddFiles.Count != 0)
                    {
                        foreach (var file in galleryDTO.AddFiles)
                        {
                            var photo = await _fileHelper.AddFileWithPreviewToRepository(file);
                            oldGallery.Photos.Add(photo);
                        }
                    }

                    if (!String.IsNullOrEmpty(galleryDTO.RemoveFiles))
                    {
                        var parsedIds = new List<Guid>();
                        try
                        {
                            parsedIds = galleryDTO.RemoveFiles.Split(',').Select(x => new Guid(x)).ToList();
                        }
                        catch (Exception ex)
                        {
                            Console.Error.WriteLine($"err: {ex.Message}");
                            Console.Error.WriteLine(ex.StackTrace);
                            return BadRequest($"Что-то пошло не так, повторите попытку. Ошибка: {ex.Message}");
                        }

                        var removeFiles = oldGallery.Photos
                            .Where(x => parsedIds.Any(y => y == x.PhotoId))
                            .ToList();

                        foreach (var file in removeFiles)
                        {
                            await _repository.DeleteFile(file.PhotoId, false);
                            await _fileHelper.RemoveFileFromRepository(file, false);
                            oldGallery.Photos.Remove(file);
                        }
                    }

                    await _repository.UpdateGallery(oldGallery);
                }

                return Success(galleryDTO);
            }
            catch (Exception ex)
            {
                return LogBadRequest(
                    _logger,
                    API_LOCATE,
                    ex,
                    error
                );
            }
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> Delete([FromQuery]int galleryId)
        {
            await _repository.DeleteGallery(galleryId);
            return Success(true);
        }
    }
}