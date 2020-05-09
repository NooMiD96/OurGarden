using ApiService.Abstraction.DTO;

using Core.Helpers;

using DataBase.Abstraction.Model;
using DataBase.Abstraction.Repositories;
using DataBase.Context;
using DataBase.Repository;

using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using Web.Controllers.AdminApi;
using Web.Helpers;

namespace Web.Services.Controllers.AdminApi
{
    public class NewsControllerService
    {
        private readonly OurGardenRepository _repository;
        private readonly OurGardenContext _context;
        private readonly FileHelper _fileHelper;
        private readonly PhotoHelper _photoHelper;

        public NewsControllerService(IOurGardenRepository repository, ILogger logger)
        {
            _repository = repository as OurGardenRepository;
            _context = _repository.Context;
            _fileHelper = new FileHelper(repository);
            _photoHelper = new PhotoHelper(repository, logger);
        }

        private async ValueTask<(News entity, string error)> CreateNews(NewsDTO entityDTO,
                                                                        ICollection<Photo> defaultPhotoList = null,
                                                                        List<Photo> scheduleAddedPhotoList = null,
                                                                        List<Photo> scheduleDeletePhotoList = null)
        {
            var entity = new News()
            {
                Title = entityDTO.Title,
                Alias = entityDTO.Title.TransformToId(),
                Date = DateTime.Now,
                Description = entityDTO.Description,

                Photos = new List<Photo>()
            };

            //Добавляем и проверяем можем ли мы добавить данную категорию
            var (isSuccess, error) = await _repository.AddNews(entity);
            if (!isSuccess)
            {
                return (null, error);
            }

            _photoHelper.MovePhotosToEntity(entity, defaultPhotoList);

            await _photoHelper.LoadPhotosToEntity(entity,
                                                  entityDTO,
                                                  scheduleAddedPhotoList,
                                                  scheduleDeletePhotoList,
                                                  maxPixel: 1600);

            await _context.SaveChangesAsync();

            return (entity, null);
        }

        public async ValueTask<(bool isSuccess, string error)> AddNews(NewsDTO entityDTO)
        {
            var (entity, error) = await CreateNews(entityDTO);

            return (entity != null, error);
        }

        public async ValueTask<(bool isSuccess, string error)> UpdateNews(NewsDTO entityDTO, News oldEntity)
        {
            await _photoHelper.LoadPhotosToEntity(oldEntity, entityDTO, maxPixel: 1600);

            oldEntity.Alias = entityDTO.Title.TransformToId();
            oldEntity.Title = entityDTO.Title;
            oldEntity.Description = entityDTO.Description;

            return await _repository.UpdateNews(oldEntity);
        }

        public async ValueTask<(bool isSuccess, string error)> DeleteNews(int newsId)
        {
            var entity = await _repository.GetNews(newsId);

            if (entity is null)
            {
                return (
                    false,
                    $"Что-то пошло не так, не удалось найти новость.\nНовость: {newsId}"
                );
            }

            foreach (var photo in entity.Photos)
            {
                await _fileHelper.RemoveFileFromRepository(photo, updateDB: false);
            }

            await _repository.DeleteNews(entity);

            return (true, null);
        }
    }
}
