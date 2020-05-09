using DataBase.Abstraction.Model;
using DataBase.Abstraction.Repositories;

using Microsoft.AspNetCore.Http;

using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Threading.Tasks;

namespace Web.Controllers.AdminApi
{
    public class FileHelper
    {
        readonly string STATIC_FOLDER;
        readonly string FILE_FOLDER = "images";
        public const int MAX_PIXEL = 400;

        readonly IOurGardenRepository _repository;

        public FileHelper(IOurGardenRepository repository)
        {
            _repository = repository;

            STATIC_FOLDER = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
        }

        static private string GetFileExtension(string fileName)
        {
            var split = fileName.Split(".");

            if (split.Length == 1)
            {
                return "jpg";
            }

            return split[split.Length - 1];
        }

        private async Task<Photo> AddFile(string url,  Guid? guid = null, string previewUrl = null, bool updateDB = true)
        {
            var id = guid ?? Guid.NewGuid();

            var file = new Photo()
            {
                PhotoId = id,
                Name = id.ToString(),
                Date = DateTime.Now,
                Url = url,
                PreviewUrl = previewUrl
            };

            if (updateDB)
                await _repository.AddFile(file);

            return file;
        }

        public async Task<Photo> AddFileToRepository(IFormFile photo, IFormFile previewPhoto = null, bool updateDB = true, int maxPixel = MAX_PIXEL)
        {
            var guid = Guid.NewGuid();
            var path = $"{FILE_FOLDER}/{guid.ToString()}.{GetFileExtension(photo.FileName)}";
            var previewPath = previewPhoto != null
                ? $"{FILE_FOLDER}/{guid.ToString()}-preview.{GetFileExtension(previewPhoto.FileName)}"
                : null;

            using (var fileStream = new FileStream(Path.Combine(STATIC_FOLDER, path), FileMode.Create))
            {
                await photo.CopyToAsync(fileStream);
            }

            if (previewPath != null)
            {
                using (var previewImage = GetPreview(previewPhoto, maxPixel))
                using (var fileStream = new FileStream(Path.Combine(STATIC_FOLDER, previewPath), FileMode.Create))
                {
                    previewImage.Save(fileStream, ImageFormat.Jpeg);
                }
            }

            return await AddFile(path, guid, previewPath, updateDB: updateDB);
        }

        public void UpdateFilePreview(Photo file, IFormFile newPreviewPhoto, int maxPixel = MAX_PIXEL)
        {
            if (String.IsNullOrEmpty(file.PreviewUrl))
            {
                file.PreviewUrl = $"{FILE_FOLDER}/{file.PhotoId.ToString()}-preview.{GetFileExtension(newPreviewPhoto.FileName)}";
            }

            var previewPath = Path.Combine(STATIC_FOLDER, file.PreviewUrl);
            if (File.Exists(previewPath))
            {
                File.Delete(previewPath);
            }

            using (var previewImage = GetPreview(newPreviewPhoto, maxPixel))
            using (var fileStream = new FileStream(Path.Combine(STATIC_FOLDER, previewPath), FileMode.Create))
            {
                previewImage.Save(fileStream, ImageFormat.Jpeg);
            }
        }

        public async ValueTask<bool> RemoveFileFromRepository(Photo photo, bool updateDB = true)
        {
            var filePath = Path.Combine(STATIC_FOLDER, photo.Url);
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }

            filePath = Path.Combine(STATIC_FOLDER, photo.PreviewUrl ?? "");
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }

            await _repository.DeleteFile(photo.PhotoId, updateDB);

            return true;
        }

        static private Bitmap GetPreview(IFormFile photo, int maxPixel = MAX_PIXEL)
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

#pragma warning disable CA1822 // Mark members as static
        public Photo ClonePhoto(Photo photo)
        {
            var guid = Guid.NewGuid();

            return new Photo()
            {
                PhotoId = guid,
                Name = guid.ToString(),
                Date = DateTime.Now,
                Url = photo.Url,
                PreviewUrl = photo.PreviewUrl
            };
        }
#pragma warning restore CA1822 // Mark members as static
    }
}
