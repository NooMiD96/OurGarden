using Microsoft.Extensions.Logging;

using PhotoService.Abstraction;
using PhotoService.Abstraction.Model;

using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Threading.Tasks;

namespace PhotoService
{
    public class PhotoSaver : IPhotoSaver
    {
        #region Static

        /// <summary>
        /// Получение расширения по имени файла. Стандартное - jpg.
        /// </summary>
        private static string GetFileExtension(string fileName)
        {
            var fileExtension = Path.GetExtension(fileName);
            
            if (String.IsNullOrEmpty(fileExtension))
            {
                return "jpg";
            }

            return fileExtension[1..];
        }

        /// <summary>
        /// Получение превью изображения.
        /// Чтобы не нагружать сеть клиента и быстрой загрузки всех имеющихся изображений.
        /// </summary>
        private static Bitmap GetPreview(Stream photo, int maxPixel = IPhotoSaver.MAX_PIXEL)
        {
            var image = Image.FromStream(photo, useEmbeddedColorManagement: true, validateImageData: true);

            var originalWidth = image.Width;
            var originalHeight = image.Height;

            double factor;
            if (originalWidth > originalHeight)
            {
                factor = (double)maxPixel / originalWidth;
            }
            else
            {
                factor = (double)maxPixel / originalHeight;
            }

            var size = new Size((int)(originalWidth * factor), (int)(originalHeight * factor));

            return new Bitmap(image, size);
        }

        #endregion

        #region Fields

        /// <summary>
        /// Общедоступная директория
        /// </summary>
        private readonly string _publicDirectory = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");

        /// <summary>
        /// Логгер
        /// </summary>
        private readonly ILogger _logger;

        /// <summary>
        /// Репозиторий по работе с фото
        /// </summary>
        private readonly IPhotoSaverRepository _repository;

        #endregion

        #region .ctor

        public PhotoSaver(ILogger<PhotoSaver> logger,
                          IPhotoSaverRepository repository)
        {
            _logger = logger;
            _repository = repository;
        }

        #endregion

        #region Public

        /// <inheritdoc/>
        public async Task<Photo> AddFileToRepository(Stream photo,
                                                     string photoFileName,
                                                     Stream previewPhoto,
                                                     string previewPhotoFileName,
                                                     bool updateDB = true,
                                                     int maxPixel = IPhotoSaver.MAX_PIXEL)
        {
            var guid = Guid.NewGuid();
            var path = Path.Combine(IPhotoSaver.IMAGES_FOLDER, $"{guid}.{GetFileExtension(photoFileName)}");
            var previewPath = Path.Combine(IPhotoSaver.IMAGES_FOLDER, $"{guid}-preview.{GetFileExtension(previewPhotoFileName)}");

            using var fileStream = new FileStream(Path.Combine(_publicDirectory, path), FileMode.Create);
            await photo.CopyToAsync(fileStream);

            if (previewPath != null)
            {
                using var previewImage = GetPreview(previewPhoto, maxPixel);
                using var previewFileStream = new FileStream(Path.Combine(_publicDirectory, previewPath), FileMode.Create);
                previewImage.Save(previewFileStream, ImageFormat.Jpeg);
            }

            return await AddImage(url: path,
                                  guid: guid,
                                  fileName: photoFileName,
                                  previewUrl: previewPath,
                                  updateDB: updateDB);
        }

        /// <inheritdoc/>
        public void UpdateFilePreview(Photo file,
                                      Stream newPreviewPhoto,
                                      string newPreviewPhotoFileName,
                                      int maxPixel = IPhotoSaver.MAX_PIXEL)
        {
            if (String.IsNullOrEmpty(file.PreviewUrl))
            {
                file.PreviewUrl = Path.Combine(IPhotoSaver.IMAGES_FOLDER, $"{file.PhotoId}-preview.{GetFileExtension(newPreviewPhotoFileName)}");
            }

            var previewPath = Path.Combine(_publicDirectory, file.PreviewUrl);
            if (File.Exists(previewPath))
            {
                File.Delete(previewPath);
            }

            using var previewImage = GetPreview(newPreviewPhoto, maxPixel);
            using var fileStream = new FileStream(Path.Combine(_publicDirectory, previewPath), FileMode.Create);
            previewImage.Save(fileStream, ImageFormat.Jpeg);
        }

        /// <inheritdoc/>
        public async ValueTask<bool> RemoveFileFromRepository(Photo photo, bool updateDB = true)
        {
            var filePath = Path.Combine(_publicDirectory, photo.Url);
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }

            filePath = Path.Combine(_publicDirectory, photo.PreviewUrl ?? "");
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }

            await _repository.RemovePhoto(photo.PhotoId, updateDB);

            return true;
        }

        #endregion

        #region Private

        private async Task<Photo> AddImage(string url,
                                           Guid? guid = null,
                                           string fileName = null,
                                           string previewUrl = null,
                                           bool updateDB = true)
        {
            var id = guid ?? Guid.NewGuid();

            var photo = new Photo()
            {
                PhotoId = id,
                Name = fileName ?? id.ToString(),
                Date = DateTime.Now,
                Url = url,
                PreviewUrl = previewUrl
            };

            await _repository.AddPhoto(photo, updateDB);

            return photo;
        }

        #endregion
    }
}
