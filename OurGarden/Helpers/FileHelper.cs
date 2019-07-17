using Database.Repositories;
using Microsoft.AspNetCore.Http;
using Model.DB;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Controllers.AdminApi
{
    public class FileHelper
    {
        public readonly IOurGardenRepository _repository;
        public FileHelper(IOurGardenRepository repository)
        {
            _repository = repository;
        }

        public async Task<Photo> AddFileToRepository(IFormFile photo)
        {
            using (var ms = new MemoryStream())
            {
                photo.CopyTo(ms);
                var fileBytes = ms.ToArray();
                string imreBase64Data = Convert.ToBase64String(fileBytes);
                var file = new Photo()
                {
                    Date = DateTime.Now,
                    Name = photo.Name,
                    PhotoId = Guid.NewGuid(),
                    Url = imreBase64Data
                };
                await _repository.AddFile(file);
                return file;
            }
        }
    }
}
