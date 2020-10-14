using Microsoft.AspNetCore.Http;
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
        #region Fields

        /// <summary>
        /// Общедоступная директория
        /// </summary>
        private readonly string _publicDirectory = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
        
        /// <summary>
        /// Репозиторий по работе с фото
        /// </summary>
        private readonly IPhotoSaverRepository _repository;

        /// <summary>
        /// Логгер
        /// </summary>
        private readonly ILogger<PhotoSaver> _logger;

        #endregion

        #region .ctor

        public PhotoSaver(ILogger<PhotoSaver> logger,
                          IPhotoSaverRepository repository)
        {
            _repository = repository;
            _logger = logger;
        }

        #endregion

        #region Public

        /// <summary>
        /// Сохраняет фотографию на диск и в БД.
        /// При наличии превью изображения, сохраняет и его.
        /// </summary>
        public async Task<Photo> AddFileToRepository(IFormFile photo,
                                                     IFormFile previewPhoto = null,
                                                     bool updateDB = true,
                                                     int maxPixel = IPhotoSaver.MAX_PIXEL)
        {
            var guid = Guid.NewGuid();
            /// Относительный путь, который является и путём к файлу и ссылкой на файл
            var path = $"{IPhotoSaver.IMAGES_FOLDER}/{guid}.{GetFileExtension(photo.FileName)}";
            /// Относительный путь, который является и путём к файлу и ссылкой на файл
            var previewPath = previewPhoto != null
                ? Path.Combine(IPhotoSaver.IMAGES_FOLDER, $"{guid}-preview.{GetFileExtension(previewPhoto.FileName)}")
                : null;

            using (var fileStream = new FileStream(Path.Combine(_publicDirectory, path), FileMode.Create))
            {
                await photo.CopyToAsync(fileStream);
            }

            if (previewPath != null)
            {
                using var previewImage = GetPreview(previewPhoto, maxPixel);
                using var fileStream = new FileStream(Path.Combine(_publicDirectory, previewPath), FileMode.Create);
                previewImage.Save(fileStream, ImageFormat.Jpeg);
            }

            return await AddImage(url: path,
                                  guid: guid,
                                  fileName: photo.FileName,
                                  previewUrl: previewPath,
                                  updateDB: updateDB);
        }

        /// <summary>
        /// Обновление фотографии есть обновление его превью изображения.
        /// В случае, если такого изображения не было, то будет создано новое из переданного.
        /// </summary>
        public void UpdateFilePreview(Photo file,
                                      IFormFile newPreviewPhoto,
                                      int maxPixel = IPhotoSaver.MAX_PIXEL)
        {
            if (String.IsNullOrEmpty(file.PreviewUrl))
            {
                file.PreviewUrl = $"{IPhotoSaver.IMAGES_FOLDER}/{file.PhotoId}-preview.{GetFileExtension(newPreviewPhoto.FileName)}";
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

        /// <summary>
        /// Удаляет фото из БД и с диска.
        /// </summary>
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

        #region Static

        /// <summary>
        /// Получение расширения по имени файла. Стандартное - jpg.
        /// </summary>
        static private string GetFileExtension(string fileName)
        {
            var split = fileName.Split(".");

            if (split.Length == 1)
            {
                return "jpg";
            }

            return split[^1];
        }

        /// <summary>
        /// Получение превью изображения.
        /// Чтобы не нагружать сеть клиента и быстрой загрузки всех имеющихся изображений.
        /// </summary>
        static private Bitmap GetPreview(IFormFile photo, int maxPixel = IPhotoSaver.MAX_PIXEL)
        {
            var image = Image.FromStream(photo.OpenReadStream(), true, true);

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
