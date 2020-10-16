using ApiService.Abstraction.Core;
using ApiService.Abstraction.DTO;

using Core.Helpers;

using DataBase.Abstraction.Model;
using DataBase.Abstraction.Repositories;
using DataBase.Context;
using DataBase.Repository;

using PhotoService.Abstraction;
using PhotoService.Abstraction.Model;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web.Services.Controllers.AdminApi
{
    public class GalleryControllerService
    {
        private readonly IOurGardenRepository _repository;
        private readonly OurGardenContext _context;
        private readonly IPhotoSaver _photoSaver;
        private readonly IPhotoEntityUpdater _photoEntityUpdater;

        public GalleryControllerService(IOurGardenRepository repository,
                                        IPhotoSaver photoSaver,
                                        IPhotoEntityUpdater photoEntityUpdater)
        {
            _repository = repository;
            _context = (_repository as OurGardenRepository).Context;
            _photoSaver = photoSaver;
            _photoEntityUpdater = photoEntityUpdater;
        }

        public async ValueTask<(bool isSuccess, string error)> AddGallery(GalleryDTO entityDTO)
        {
            var gallery = new Gallery()
            {
                Alias = entityDTO.Alias,
                NormalizeAlias = entityDTO.Alias.TransformToId(),
                IsVisible = entityDTO.IsVisible ?? true,

                Photos = new List<Photo>()
            };

            //Добавляем и проверяем можем ли мы добавить данную категорию
            var (isSuccess, error) = await _repository.AddGallery(gallery);
            if (!isSuccess)
                return (isSuccess, error);

            await _photoEntityUpdater.LoadPhotosToEntity(gallery, entityDTO, maxPixel: 1600);

            await _context.SaveChangesAsync();

            return (true, null);
        }

        public async ValueTask<(bool isSuccess, string error)> UpdateGallery(GalleryDTO galleryDTO, Gallery oldGallery)
        {
            if (oldGallery.NormalizeAlias != galleryDTO.Alias.TransformToId())
            {
                var entity = await _repository.GetGallery(galleryDTO.Alias);

                if (entity != null)
                    return (false, "Галерея с таким наименованием уже существует");
            }

            await _photoEntityUpdater.LoadPhotosToEntity(oldGallery, galleryDTO, maxPixel: 1600);

            oldGallery.Alias = galleryDTO.Alias;
            oldGallery.NormalizeAlias = galleryDTO.Alias.TransformToId();
            oldGallery.IsVisible = galleryDTO.IsVisible ?? true;

            return await _repository.UpdateGallery(oldGallery);
        }

        public async ValueTask<(bool isSuccess, string error)> DeleteGallery(int galleryId)
        {
            var gallery = await _repository.GetGallery(galleryId);

            if (gallery is null)
            {
                return (
                    false,
                    $"Что-то пошло не так, не удалось найти галерею.\n\tИД галереи: {galleryId}"
                );
            }

            foreach (var photo in gallery.Photos)
            {
                await _photoSaver.RemoveFileFromRepository(photo, updateDB: false);
            }

            await _repository.DeleteGallery(galleryId);

            return (true, null);
        }
    }
}
