#pragma warning disable CA1822 // Mark members as static

using ApiService.Abstraction;

using DataBase.Abstraction;
using DataBase.Abstraction.Model;
using DataBase.Abstraction.Repositories;

using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Web.Controllers.AdminApi;

namespace Web.Helpers
{
    public class PhotoHelper
    {
        private readonly IOurGardenRepository _repository;
        private readonly FileHelper _fileHelper;
        private readonly ILogger _logger;
        private const string CONTROLLER_LOCATE = "Service.PhotoHelper";

        public PhotoHelper(IOurGardenRepository repository, ILogger logger)
        {
            _repository = repository;
            _logger = logger;
            _fileHelper = new FileHelper(_repository);
        }

        public async Task LoadPhotosToEntity<TType, TTypeDTO>(TType entity,
                                                              TTypeDTO entityDTO,
                                                              List<Photo> scheduleAddedPhotoList = null,
                                                              List<Photo> scheduleDeletePhotoList = null,
                                                              int maxPixel = FileHelper.MAX_PIXEL) where TType : IPhoto
                                                                                                   where TTypeDTO : IPhotoDTO
        {
            const string API_LOCATE = CONTROLLER_LOCATE + ".LoadFilesToEntity";

            if (entityDTO.AddFiles != null && entityDTO.AddFiles.Count != 0)
            {
                for (var i = 0; i < entityDTO.AddFiles.Count; i += 2)
                {
                    var photoFile = entityDTO.AddFiles.ElementAt(i);
                    var previewFile = entityDTO.AddFiles.ElementAt(i + 1);

                    var photo = await _fileHelper.AddFileToRepository(photoFile, previewFile, updateDB: false, maxPixel: maxPixel);

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
                    _logger.LogError(ex, $"{DateTime.Now}:\n\t{API_LOCATE}\n\terr: Не удалось распарсить строку {entityDTO.RemoveFiles}\n\tmes: {ex.Message}\n\t{ex.StackTrace}");
                }

                var removePhotos = entity.Photos
                    .Where(x => parsedIds.Any(id => id == x.PhotoId))
                    .ToList();

                foreach (var photo in removePhotos)
                {
                    await _repository.DeleteFile(photo.PhotoId, updateDB: false);
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
                        _fileHelper.UpdateFilePreview(file, newPreview, maxPixel: maxPixel);
                    }
                }
            }
        }

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
    }
}

#pragma warning restore CA1822 // Mark members as static
