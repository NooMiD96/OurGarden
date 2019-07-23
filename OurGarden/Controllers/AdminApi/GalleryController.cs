﻿using Core.Constants;
using Core.Helpers;

using Database.Repositories;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Model.DB;

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
    public class GalleryController : ControllerBase
    {
        public readonly IOurGardenRepository _repository;
        public GalleryController(IOurGardenRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetGalleries()
        {
            var galleries = await _repository.GetGalleries();
            return Ok(galleries);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetGallery(
            [FromQuery]int galleryId)
        {
            var gallery = await _repository.GetGallery(galleryId);

            if (gallery == null)
                return BadRequest();

            return Ok(gallery);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddGallery(
            [FromForm]Gallery gallery)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                gallery.Photos = new List<Photo>();
                foreach (var file in gallery.AddPhotos)
                {
                    var fileHelper = new FileHelper(_repository);
                    var photo  = await fileHelper.AddFileToRepository(file);
                    gallery.Photos.Add(photo);
                }
                await _repository.AddGallery(gallery);
                return Ok(gallery);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> UpdateGallery(
            [FromForm]Gallery gallery)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }

                var oldGallery = await _repository.GetGallery(gallery.GalleryId);
                if (oldGallery == null)
                {
                    return Conflict();
                }
                oldGallery.Name = gallery.Name;
                oldGallery.Alias = StringHelper.Transform(gallery.Name);
                oldGallery.Description = gallery.Description;

                foreach (var photoId in gallery.RemovePhotos)
                {
                    var photo = oldGallery.Photos.FirstOrDefault(x => x.PhotoId == photoId);
                    if (photo == null)
                        continue;
                    oldGallery.Photos.Remove(photo);
                }

                foreach (var file in gallery.AddPhotos)
                {
                    var fileHelper = new FileHelper(_repository);
                    var photo = await fileHelper.AddFileToRepository(file);
                    oldGallery.Photos.Add(photo);
                }

                await _repository.UpdateGallery(gallery);

                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteGallery(
            [FromQuery]int galleryId)
        {
            await _repository.DeleteGallery(galleryId);
            return Ok();
        }
    }
}