using ApiService.Abstraction.Core;
using ApiService.Abstraction.DTO;

using Core.Helpers;

using DataBase.Abstraction.Model;
using DataBase.Abstraction.Repositories;
using DataBase.Context;
using DataBase.Repository;

using Microsoft.Extensions.Logging;

using PhotoService.Abstraction;
using PhotoService.Abstraction.Model;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web.Services.Controllers.AdminApi
{
    public class NewsControllerService
    {
        private readonly OurGardenRepository _repository;
        private readonly OurGardenContext _context;
        private readonly ILogger _logger;
        private readonly IPhotoSaver _photoSaver;
        private readonly IPhotoEntityUpdater _photoEntityUpdater;

        public NewsControllerService(IOurGardenRepository repository,
                                     ILogger logger,
                                     IPhotoSaver photoSaver,
                                     IPhotoEntityUpdater photoEntityUpdater)
        {
            _repository = repository as OurGardenRepository;
            _context = _repository.Context;
            _logger = logger;
            _photoSaver = photoSaver;
            _photoEntityUpdater = photoEntityUpdater;
        }

        private async ValueTask<(News entity, string error)> CreateNews(NewsDTO entityDTO,
                                                                        ICollection<Photo> defaultPhotoList = null,
                                                                        List<Photo> scheduleAddedPhotoList = null,
                                                                        List<Photo> scheduleDeletePhotoList = null)
        {
            var entity = new News()
            {
                NewsId = entityDTO.Alias.TransformToId(),
                Alias = entityDTO.Alias,
                Date = DateTime.UtcNow,
                Description = entityDTO.Description,

                SeoTitle = entityDTO.SeoTitle,
                SeoDescription = entityDTO.SeoDescription,
                SeoKeywords = entityDTO.SeoKeywords,

                Photos = new List<Photo>()
            };

            //Добавляем и проверяем можем ли мы добавить данную категорию
            var (isSuccess, error) = await _repository.AddNews(entity);
            if (!isSuccess)
            {
                return (null, error);
            }

            _photoEntityUpdater.MovePhotosToEntity(entity, defaultPhotoList);

            await _photoEntityUpdater.LoadPhotosToEntity(entity,
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

        public async ValueTask<(bool isSuccess, string error)> FullUpdateNews(NewsDTO newsDTO, News oldNews)
        {
            /// В случае когда нам не удаётся обновить данную модель
            /// Мы должны удалить те фото, которые были добавлены
            var scheduleAddedPhotoList = new List<Photo>();

            /// Если обновление прошло успешно
            /// То нужно окончательно удалить ненужные фото
            var scheduleDeletePhotoList = new List<Photo>();

            using var transaction = await _context.Database.BeginTransactionAsync();
            (bool isSuccess, string error) cancelUpdate((bool isSuccess, string error) result)
            {
                transaction.Rollback();
                return result;
            }

            try
            {
                #region Create new entity and migrate/update photo list

                var (newNews, error) = await CreateNews(newsDTO,
                                                        defaultPhotoList: oldNews.Photos,
                                                        scheduleAddedPhotoList: scheduleAddedPhotoList,
                                                        scheduleDeletePhotoList: scheduleDeletePhotoList);

                if (newNews is null)
                {
                    return cancelUpdate((false, error));
                }

                #endregion

                /// Теперь старая сущность не нужна
                _context.Remove(oldNews);

                await _context.SaveChangesAsync();

                transaction.Commit();

                foreach (var photo in scheduleDeletePhotoList)
                {
                    await _photoSaver.RemoveFileFromRepository(photo, updateDB: false);
                }

                return (true, null);
            }
            catch (Exception ex)
            {
                foreach (var photo in scheduleAddedPhotoList)
                {
                    await _photoSaver.RemoveFileFromRepository(photo, updateDB: false);
                }

                var errMsg = "Ошибка при обновлении товара. Возможно товар с таким наименованем уже существует.";

                _logger.LogError(ex, errMsg);

                return cancelUpdate((
                    false,
                    $"{errMsg} Текст ошибки: {ex.Message}"
                ));
            }
        }

        public async ValueTask<(bool isSuccess, string error)> UpdateNews(NewsDTO entityDTO, News oldEntity)
        {
            await _photoEntityUpdater.LoadPhotosToEntity(oldEntity, entityDTO, maxPixel: 1600);

            oldEntity.Alias = entityDTO.Alias;
            oldEntity.Description = entityDTO.Description;

            oldEntity.SeoTitle = entityDTO.SeoTitle;
            oldEntity.SeoDescription = entityDTO.SeoDescription;
            oldEntity.SeoKeywords = entityDTO.SeoKeywords;

            return await _repository.UpdateNews(oldEntity);
        }

        public async ValueTask<(bool isSuccess, string error)> DeleteNews(string newsId)
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
                await _photoSaver.RemoveFileFromRepository(photo, updateDB: false);
            }

            await _repository.DeleteNews(entity);

            return (true, null);
        }
    }
}
