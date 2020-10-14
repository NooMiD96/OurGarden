using ApiService.Abstraction;
using ApiService.Abstraction.Core;

using DataBase.Abstraction;
using DataBase.Abstraction.Repositories;

using Microsoft.Extensions.Logging;

using PhotoService.Abstraction;
using PhotoService.Abstraction.Model;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiService.Core
{
    /// <summary>
    /// Сервис по обновлению модели с фотографиями.
    /// </summary>
    public class PhotoEntityUpdater : IPhotoEntityUpdater
    {
        #region Fields

        /// <summary>
        /// Репозиторий БД
        /// </summary>
        private readonly IOurGardenRepository _repository;

        /// <summary>
        /// Сервис сохранения фотографий
        /// </summary>
        private readonly IPhotoSaver _photoSaver;

        /// <summary>
        /// Логгер
        /// </summary>
        private readonly ILogger _logger;

        #endregion

        #region .ctor

        public PhotoEntityUpdater(IOurGardenRepository repository,
                                  ILogger<PhotoEntityUpdater> logger,
                                  IPhotoSaver photoSaver)
        {
            _repository = repository;
            _logger = logger;
            _photoSaver = photoSaver;
        }

        #endregion

        #region IPhotoEntityUpdater Impl

        /// <inheritdoc/>
        public async Task LoadPhotosToEntity<TType, TTypeDTO>(TType entity,
                                                              TTypeDTO entityDTO,
                                                              List<Photo> scheduleAddedPhotoList = null,
                                                              List<Photo> scheduleDeletePhotoList = null,
                                                              int maxPixel = IPhotoSaver.MAX_PIXEL) where TType : IPhoto
                                                                                                    where TTypeDTO : IPhotoDTO
        {
            if (entityDTO.AddFiles != null && entityDTO.AddFiles.Count != 0)
            {
                for (var i = 0; i < entityDTO.AddFiles.Count; i += 2)
                {
                    var photoFile = entityDTO.AddFiles.ElementAt(i);
                    var previewFile = entityDTO.AddFiles.ElementAt(i + 1);

                    var photo = await _photoSaver.AddFileToRepository(photoFile, previewFile, updateDB: false, maxPixel: maxPixel);

                    entity.Photos.Add(photo);

                    if (scheduleAddedPhotoList != null)
                        scheduleAddedPhotoList.Add(photo);
                }
            }

            if (!String.IsNullOrEmpty(entityDTO.RemoveFiles))
            {
                var parsedIds = new List<Guid>();

                try
                {
                    parsedIds = entityDTO.RemoveFiles
                        .Split(',')
                        .Select(x => new Guid(x))
                        .ToList();
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"При обновлении фотографий не удалось распарсить строку {entityDTO.RemoveFiles}\n\tmes: {ex.Message}\n\t{ex.StackTrace}");
                }

                var removePhotos = entity.Photos
                    .Where(x => parsedIds.Any(id => id == x.PhotoId))
                    .ToList();

                foreach (var photo in removePhotos)
                {
                    await _repository.RemovePhoto(photo.PhotoId, updateDB: false);
                    entity.Photos.Remove(photo);

                    if (scheduleDeletePhotoList != null)
                        scheduleDeletePhotoList.Add(photo);
                }
            }

            if (entityDTO.UpdateFiles != null && entityDTO.UpdateFiles.Count != 0)
            {
                for (var i = 0; i < entityDTO.UpdateFiles.Count; i++)
                {
                    var newPreview = entityDTO.UpdateFiles.ElementAt(i);
                    if (!Guid.TryParse(newPreview.FileName, out var fileGuid))
                    {
                        continue;
                    }

                    var file = entity.Photos.FirstOrDefault(x => x.PhotoId == fileGuid);
                    if (file != null)
                    {
                        _photoSaver.UpdateFilePreview(file, newPreview, maxPixel: maxPixel);
                    }
                }
            }
        }

        /// <inheritdoc/>
        public void MovePhotosToEntity<TType>(TType entity, ICollection<Photo> fileList) where TType : IPhoto
        {
            if (fileList != null)
            {
                while (fileList.Count > 0)
                {
                    var photo = fileList.ElementAt(0);

                    fileList.Remove(photo);
                    entity.Photos.Add(photo);
                }
            }
        }

        #endregion
    }
}
