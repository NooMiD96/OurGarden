using Database.Repositories;

using Microsoft.AspNetCore.Http;

using Model.DB;

using System;
using System.IO;
using System.Threading.Tasks;

namespace Web.Controllers.AdminApi
{
    public class FileHelper
    {
        readonly string STATIC_FOLDER = "wwwroot";
        readonly string FILE_FOLDER = "images";

        public readonly IOurGardenRepository _repository;
        public FileHelper(IOurGardenRepository repository)
        {
            _repository = repository;
        }

        private string GetFileExtension(string fileName)
        {
            var split = fileName.Split(".");

            return split[split.Length - 1];
        }

        private async Task<Photo> AddFile(string url, Guid? guid = null)
        {
            var id = guid ?? Guid.NewGuid();

            var file = new Photo()
            {
                PhotoId = id,
                Name = id.ToString(),
                Date = DateTime.Now,
                Url = url
            };

            await _repository.AddFile(file);
            return file;
        }

        public Photo ClonePhoto(string url)
        {
            var guid = Guid.NewGuid();

            return new Photo()
            {
                PhotoId = guid,
                Name = guid.ToString(),
                Date = DateTime.Now,
                Url = url
            };
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

        public async Task<Photo> AddFileToRepository(string photoUrl)
        {
            return await AddFile(photoUrl);
        }

        public async ValueTask<bool> RemoveFileFromRepository(Photo photo, bool updateDB = true)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), STATIC_FOLDER, photo.Url);
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }

            await _repository.DeleteFile(photo.PhotoId, updateDB);

            return true;
        }
    }
}
