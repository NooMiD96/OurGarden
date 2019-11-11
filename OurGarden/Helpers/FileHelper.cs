using Database.Repositories;

using Microsoft.AspNetCore.Http;

using Model.DB;

using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Threading.Tasks;

namespace Web.Controllers.AdminApi
{
    public class FileHelper
    {
        readonly string STATIC_FOLDER = "wwwroot";
        readonly string FILE_FOLDER = "images";
        const int MAX_PIXEL = 400;

        readonly IOurGardenRepository _repository;

        public FileHelper(IOurGardenRepository repository)
        {
            _repository = repository;
        }

        private string GetFileExtension(string fileName)
        {
            var split = fileName.Split(".");

            return split[split.Length - 1];
        }

        private async Task<Photo> AddFile(string url,  Guid? guid = null, string previewUrl = null)
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

            await _repository.AddFile(file);
            return file;
        }

        public async Task<Photo> AddFileWithPreviewToRepository(IFormFile photo)
        {
            var guid = Guid.NewGuid();
            var path = $"{FILE_FOLDER}/{guid.ToString()}.{GetFileExtension(photo.FileName)}";
            var previewPath = $"{FILE_FOLDER}/{guid.ToString()}-preview.{GetFileExtension(photo.FileName)}";

            using (var previewImage = GetPreview(photo))
            {
                using (var fileStream = new FileStream(Path.Combine(Directory.GetCurrentDirectory(), STATIC_FOLDER, path), FileMode.Create))
                {
                    await photo.CopyToAsync(fileStream);
                }
                using (var fileStream = new FileStream(Path.Combine(Directory.GetCurrentDirectory(), STATIC_FOLDER, previewPath), FileMode.Create))
                {
                   previewImage.Save(fileStream, ImageFormat.Jpeg);
                }
            }

            return await AddFile(path, guid, previewPath);
        }

        public async Task<Photo> AddFileToRepository(IFormFile photo)
        {
            var guid = Guid.NewGuid();
            var path = $"{FILE_FOLDER}/{guid.ToString()}.{GetFileExtension(photo.FileName)}";

            using (var fileStream = new FileStream(Path.Combine(Directory.GetCurrentDirectory(), STATIC_FOLDER, path), FileMode.Create))
            {
                await photo.CopyToAsync(fileStream);
            }

            return await AddFile(path, guid);
        }

        public async ValueTask<bool> RemoveFileFromRepository(Photo photo, bool updateDB = true)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), STATIC_FOLDER, photo.Url);
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }

            filePath = Path.Combine(Directory.GetCurrentDirectory(), STATIC_FOLDER, photo.PreviewUrl ?? "");
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }

            await _repository.DeleteFile(photo.PhotoId, updateDB);

            return true;
        }

        private Bitmap GetPreview(IFormFile photo)
        {
            var image = Image.FromStream(photo.OpenReadStream(), true, true);

            var originalWidth = image.Width;
            var originalHeight = image.Height;

            double factor;
            if (originalWidth > originalHeight)
            {
                factor = (double)MAX_PIXEL / originalWidth;
            }
            else
            {
                factor = (double)MAX_PIXEL / originalHeight;
            }

            var size = new Size((int)(originalWidth * factor), (int)(originalHeight * factor));

            return new Bitmap(image, size);
        }

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
    }
}
