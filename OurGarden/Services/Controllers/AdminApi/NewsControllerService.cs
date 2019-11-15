using Core.Helpers;

using Database.Contexts;
using Database.Repositories;

using Microsoft.Extensions.Logging;

using Model.DB;
using Model.DTO;

using System;
using System.Threading.Tasks;

using Web.Controllers.AdminApi;

namespace Web.Services.Controllers.AdminApi
{
    public class NewsControllerService
    {
        private readonly OurGardenRepository _repository;
        private readonly OurGardenContext _context;
        private readonly FileHelper _fileHelper;
        private readonly ILogger _logger;
        private const string CONTROLLER_LOCATE = "AdminApi.NewsController.Service";

        public NewsControllerService(IOurGardenRepository repository, ILogger logger)
        {
            _repository = repository as OurGardenRepository;
            _context = _repository._context;
            _fileHelper = new FileHelper(_repository);
            _logger = logger;
        }

        public async ValueTask<(bool isSuccess, string error)> UpdateNews(NewsDTO newsDTO, News oldNews)
        {
            const string API_LOCATE = CONTROLLER_LOCATE + ".UpdateNews";

            using (var transaction = await _context.Database.BeginTransactionAsync())
                try
                {
                    // Создаём новую категорию
                    var file = default(Photo);
                    if (newsDTO.File == null)
                    {
                        file = _fileHelper.ClonePhoto(oldNews.Photo);
                        _context.Remove(oldNews.Photo);
                    }
                    else
                    {
                        file = await _fileHelper.AddFileToRepository(newsDTO.File);
                        await _fileHelper.RemoveFileFromRepository(oldNews.Photo, false);
                    }

                    var newNews = new News()
                    {
                        Title = newsDTO.Title,
                        Alias = newsDTO.Title.TransformToId(),
                        Date = DateTime.Now,
                        Description = newsDTO.Description,

                        Photo = file
                    };
                    _context.Add(newNews);

                    _context.Remove(oldNews);

                    await _context.SaveChangesAsync();

                    transaction.Commit();
                    return (true, null);
                }
                catch (Exception ex)
                {
                    transaction.Rollback();

                    _logger.LogError(ex, $"{DateTime.Now}:\n\t{API_LOCATE}\n\terr: {ex.Message}\n\t{ex.StackTrace}");

                    return (false, "Ошибка при обнавлении товара. Возможно данный товара уже существуют в данной категории-подкатегории");
                }
        }
    }
}
