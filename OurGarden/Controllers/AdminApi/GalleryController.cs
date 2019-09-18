using Core.Constants;
using Core.Helpers;

using Database.Repositories;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
    [Route("api/[controller]")]
    [ApiController]
    public class GalleryController : BaseController
    {
        private readonly IOurGardenRepository _repository;
        public GalleryController(IOurGardenRepository repository)
        {
            _repository = repository;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddOrUpdate(
            [FromForm]GalleryDTO gallery)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Что-то пошло не так, повторите попытку");
            }

            try
            {
                if (gallery.GalleryId <= 0)
                {
                    var newGallery = new Gallery() {
                        Name = gallery.Name,
                        Alias = gallery.Name.TransformToId(),
                        Description = gallery.Description,
                        Photos = new List<Photo>()
                    };
                    foreach (var file in gallery.AddFiles)
                    {
                        var fileHelper = new FileHelper(_repository);
                        var photo = await fileHelper.AddFileToRepository(file);
                        newGallery.Photos.Add(photo);
                    }
                    await _repository.AddGallery(newGallery);
                }
                else
                {
                    var oldGallery = await _repository.GetGallery(gallery.GalleryId);
                    oldGallery.Name = gallery.Name;
                    oldGallery.Description = gallery.Description;

                    if (gallery.AddFiles!= null && gallery.AddFiles.Any())
                    {
                        foreach (var file in gallery.AddFiles)
                        {
                            var fileHelper = new FileHelper(_repository);
                            var photo = await fileHelper.AddFileToRepository(file);
                            oldGallery.Photos.Add(photo);
                        }
                    }                   
                    if (gallery.RemoveFiles.Any(x => !String.IsNullOrEmpty(x)))
                    {
                        var removeFiles = oldGallery.Photos
                            .Where(x => gallery.RemoveFiles.Any(y => y == x.Name))
                            .ToList();
                        foreach (var file in removeFiles)
                        {
                            await _repository.DeleteFile(file.PhotoId, false);
                            oldGallery.Photos.Remove(file);
                        }                        
                    }
                    await _repository.UpdateGallery(oldGallery);
                }
                return Success(gallery);
            }
            catch (Exception)
            {
                return BadRequest("Что-то пошло не так, повторите попытку");
            }
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> Delete(
            [FromQuery]int galleryId)
        {
            await _repository.DeleteGallery(galleryId);
            return Success(true);
        }
    }
}