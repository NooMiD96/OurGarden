using Core.Helpers;

using Database.Contexts;
using Database.Repositories;

using Microsoft.Extensions.Logging;

using Model.DB;
using Model.DTO;

using System.Collections.Generic;
using System.Threading.Tasks;

using Web.Controllers.AdminApi;
using Web.Helpers;

namespace Web.Services.Controllers.AdminApi
{
    public class GalleryControllerService
    {
        private readonly OurGardenRepository _repository;
        private readonly OurGardenContext _context;
        private readonly FileHelper _fileHelper;
        private readonly PhotoHelper _photoHelper;

        public GalleryControllerService(IOurGardenRepository repository, ILogger logger)
        {
            _repository = repository as OurGardenRepository;
            _context = _repository._context;
            _fileHelper = new FileHelper(repository);
            _photoHelper = new PhotoHelper(repository, logger);
        }

        public async ValueTask<(bool isSuccess, string error)> AddGallery(GalleryDTO entityDTO)
        {
            var gallery = new Gallery()
            {
                Alias = entityDTO.Name.TransformToId(),
                Name = entityDTO.Name,
                IsVisible = entityDTO.IsVisible ?? true,

                Photos = new List<Photo>()
            };

            //Добавляем и проверяем можем ли мы добавить данную категорию
            var (isSuccess, error) = await _repository.AddGallery(gallery);
            if (!isSuccess)
                return (isSuccess, error);

            await _photoHelper.LoadPhotosToEntity(gallery, entityDTO);

            await _context.SaveChangesAsync();

            return (true, null);
        }

        public async ValueTask<(bool isSuccess, string error)> UpdateGallery(GalleryDTO galleryDTO, Gallery oldGallery)
        {
            if (oldGallery.Name != galleryDTO.Name)
            {
                var entity = await _repository.GetGallery(galleryDTO.Name.TransformToId());

                if (entity != null)
                    return (false, "Галерея с таким наименованием уже существует");
            }

            await _photoHelper.LoadPhotosToEntity(oldGallery, galleryDTO);

            oldGallery.Alias = galleryDTO.Name.TransformToId();
            oldGallery.Name = galleryDTO.Name;
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
                await _fileHelper.RemoveFileFromRepository(photo, updateDB: false);
            }

            await _repository.DeleteGallery(galleryId);

            return (true, null);
        }
    }
}
