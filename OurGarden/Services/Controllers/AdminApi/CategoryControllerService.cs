using Core.Helpers;

using Database.Contexts;
using Database.Repositories;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

using Model.DB;
using Model.DTO;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Web.Controllers.AdminApi;

namespace Web.Services.Controllers.AdminApi
{
    public class CategoryControllerService
    {
        private readonly OurGardenRepository _repository;
        private readonly OurGardenContext _context;
        private readonly FileHelper _fileHelper;
        private readonly ILogger _logger;
        private const string CONTROLLER_LOCATE = "AdminApi.CategoryController.Service";

        public CategoryControllerService(IOurGardenRepository repository,
                                         ILogger logger)
        {
            _repository = repository as OurGardenRepository;
            _context = _repository._context;
            _fileHelper = new FileHelper(_repository);
            _logger = logger;
        }

        private async ValueTask<(Category category, string error)> CreateCategory(CategoryDTO categoryDTO,
                                                                                  ICollection<Photo> defaultPhotoList = null,
                                                                                  List<Photo> scheduleAddedPhotoList = null,
                                                                                  List<Photo> scheduleDeletePhotoList = null)
        {
            var category = new Category()
            {
                CategoryId = categoryDTO.Alias.TransformToId(),

                Alias = categoryDTO.Alias,
                IsVisible = categoryDTO.IsVisible ?? true,

                Photos = new List<Photo>()
            };

            //Добавляем и проверяем можем ли мы добавить данную категорию
            var (isSuccess, error) = await _repository.AddCategory(category);
            if (!isSuccess)
            {
                return (null, error);
            }

            if (defaultPhotoList != null)
            {
                while (defaultPhotoList.Count > 0)
                {
                    var photo = defaultPhotoList.ElementAt(0);

                    defaultPhotoList.Remove(photo);
                    category.Photos.Add(photo);
                }
            }

            await LoadFilesToCategory(category,
                                      categoryDTO,
                                      scheduleAddedPhotoList,
                                      scheduleDeletePhotoList);

            await _context.SaveChangesAsync();

            return (category, null);
        }

        private async Task LoadFilesToCategory(Category category,
                                               CategoryDTO categoryDTO,
                                               List<Photo> scheduleAddedPhotoList = null,
                                               List<Photo> scheduleDeletePhotoList = null)
        {
            const string API_LOCATE = CONTROLLER_LOCATE + ".LoadFilesToCategory";

            if (categoryDTO.AddFiles != null && categoryDTO.AddFiles.Count != 0)
            {
                for (var i = 0; i < categoryDTO.AddFiles.Count; i += 2)
                {
                    var photoFile = categoryDTO.AddFiles.ElementAt(i);
                    var previewFile = categoryDTO.AddFiles.ElementAt(i + 1);

                    var photo = await _fileHelper.AddFileToRepository(photoFile, previewFile, updateDB: false);

                    category.Photos.Add(photo);

                    if (scheduleAddedPhotoList != null)
                        scheduleAddedPhotoList.Add(photo);
                }
            }

            if (!String.IsNullOrEmpty(categoryDTO.RemoveFiles))
            {
                var parsedIds = new List<Guid>();

                try
                {
                    parsedIds = categoryDTO.RemoveFiles
                        .Split(',')
                        .Select(x => new Guid(x))
                        .ToList();
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"{DateTime.Now}:\n\t{API_LOCATE}\n\terr: Не удалось распарсить строку {categoryDTO.RemoveFiles}\n\tmes: {ex.Message}\n\t{ex.StackTrace}");
                }

                var removePhotos = category.Photos
                    .Where(x => parsedIds.Any(id => id == x.PhotoId))
                    .ToList();

                foreach (var photo in removePhotos)
                {
                    await _repository.DeleteFile(photo.PhotoId, updateDB: false);
                    category.Photos.Remove(photo);

                    if (scheduleDeletePhotoList != null)
                        scheduleDeletePhotoList.Add(photo);
                }
            }

            if (categoryDTO.UpdateFiles != null && categoryDTO.UpdateFiles.Count != 0)
            {
                for (var i = 0; i < categoryDTO.UpdateFiles.Count; i++)
                {
                    var newPreview = categoryDTO.UpdateFiles.ElementAt(i);
                    if (!Guid.TryParse(newPreview.FileName, out var fileGuid))
                    {
                        continue;
                    }

                    var file = category.Photos.FirstOrDefault(x => x.PhotoId == fileGuid);
                    if (file != null)
                    {
                        _fileHelper.UpdateFilePreview(file, newPreview);
                    }
                }
            }
        }

        /// <summary>
        /// Добавление новой категории
        /// </summary>
        public async ValueTask<(bool isSuccess, string error)> AddCategory(CategoryDTO categoryDTO)
        {
            var (category, error) = await CreateCategory(categoryDTO);

            return (category != null, error);
        }

        /// <summary>
        /// Обновление категории, включая её потомков
        /// </summary>
        public async ValueTask<(bool isSuccess, string error)> FullUpdateCategory(CategoryDTO categoryDTO, Category oldCategory)
        {
            const string API_LOCATE = CONTROLLER_LOCATE + ".FullUpdateCategory";

            // В случае когда нам не удаётся обновить данную модель
            // Мы должны удалить те фото, которые были добавлены
            var scheduleAddedPhotoList = new List<Photo>();

            // Если обновление прошло успешно
            // То нужно окончательно удалить ненужные фото
            var scheduleDeletePhotoList = new List<Photo>();

            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                (bool isSuccess, string error) cancelUpdate((bool isSuccess, string error) result)
                {
                    transaction.Rollback();
                    return result;
                }

                try
                {
                    #region Create new category and migrate/update photo list

                    var (newCategory, error) = await CreateCategory(categoryDTO,
                                                                    defaultPhotoList: oldCategory.Photos,
                                                                    scheduleAddedPhotoList: scheduleAddedPhotoList,
                                                                    scheduleDeletePhotoList: scheduleDeletePhotoList);

                    if (newCategory is null)
                    {
                        return cancelUpdate((false, error));
                    }

                    var newCategoryId = newCategory.CategoryId;
                    newCategory = null;

                    #endregion

                    // Для старой Entry (категории) загружаем из базы коллекцию (лист) подкатегорий
                    await _context.Entry(oldCategory).Collection(x => x.Subcategories).LoadAsync();

                    // Поскольку по окончанию цикла мы сохраняем изменения в БД
                    // Список подкатегорий уменьшается, поэтому используется цикл while
                    while (oldCategory.Subcategories.Count != 0)
                    {
                        var oldSubcategory = oldCategory.Subcategories.ElementAt(0);
                        var newSubcategory = default(Subcategory);

                        // Загружаем для подкатегории фотографию
                        await _context.Entry(oldSubcategory).Reference(x => x.Photo).LoadAsync();

                        // Создаём новую подкатегорию с "новой" фотографией
                        var guid = Guid.NewGuid();
                        newSubcategory = new Subcategory()
                        {
                            CategoryId = newCategoryId,
                            SubcategoryId = oldSubcategory.SubcategoryId,

                            Alias = oldSubcategory.Alias,
                            Photo = _fileHelper.ClonePhoto(oldSubcategory.Photo),
                            Products = new List<Product>()
                        };

                        // Удаляем фотографию для старой
                        _context.Photo.Remove(oldSubcategory.Photo);

                        // Загружаем список продуктов
                        await _context.Entry(oldSubcategory).Collection(x => x.Products).LoadAsync();
                        foreach (var product in oldSubcategory.Products)
                        {
                            await _context.Entry(product).Collection(x => x.Photos).LoadAsync();

                            var newProduct = new Product()
                            {
                                CategoryId = newSubcategory.CategoryId,
                                SubcategoryId = newSubcategory.SubcategoryId,
                                ProductId = product.ProductId,

                                Alias = product.Alias,
                                Price = product.Price,
                                Description = product.Description,

                                Photos = product.Photos.Select(photo =>
                                {
                                    _context.Remove(photo);

                                    return _fileHelper.ClonePhoto(photo);
                                }).ToList()
                            };

                            newSubcategory.Products.Add(newProduct);
                        }

                        // Добовляем новую подкатегорию
                        _context.Add(newSubcategory);

                        // Теперь мы можем изменить заказы, т.к. новая категория с подкатегорией и продуктами добавлены
                        var orderList = _context.OrderPosition
                            .Include(x => x.Product)
                            .Where(
                                order => oldSubcategory.Products.Any(
                                    product => product.CategoryId == order.Product.CategoryId
                                               && product.SubcategoryId == order.Product.SubcategoryId
                                               && product.ProductId == order.Product.ProductId
                            )
                        ).ToList();

                        // Обновляем ссылку на продукт
                        orderList.ForEach(order =>
                        {
                            var newProduct = newSubcategory.Products.First(product => oldSubcategory.CategoryId == order.Product.CategoryId
                                                                                      && product.SubcategoryId == order.Product.SubcategoryId
                                                                                      && product.ProductId == order.Product.ProductId);

                            order.Product = newProduct;

                            _context.Update(order);
                        });

                        // Теперь старая подкатегория не нужно
                        _context.Remove(oldSubcategory.Photo);
                        _context.Remove(oldSubcategory);

                        // Сохраняем изменения
                        await _context.SaveChangesAsync();
                    }

                    // Если всё прошло удачно, удаляем старую категорию
                    await _repository.DeleteCategory(oldCategory.CategoryId);

                    transaction.Commit();

                    foreach (var photo in scheduleDeletePhotoList)
                    {
                        await _fileHelper.RemoveFileFromRepository(photo, updateDB: false);
                    }

                    return (true, null);
                }
                catch (Exception ex)
                {
                    foreach (var photo in scheduleAddedPhotoList)
                    {
                        await _fileHelper.RemoveFileFromRepository(photo, updateDB: false);
                    }

                    _logger.LogError(ex, $"{DateTime.Now}:\n\t{API_LOCATE}\n\terr: {ex.Message}\n\t{ex.StackTrace}");
                    return cancelUpdate((
                        false,
                        $"Ошибка при обновлении категории. Возможно подкатегория и товар с такой категорией уже существует. Текст ошибки: {ex.Message}"
                    ));
                }
            }
        }

        /// <summary>
        /// Обновление категории, не включая потомков
        /// </summary>
        /// <param name="categoryDTO"></param>
        /// <param name="oldCategory"></param>
        /// <returns></returns>
        public async ValueTask<(bool isSuccess, string error)> UpdateCategory(CategoryDTO categoryDTO, Category oldCategory)
        {
            await LoadFilesToCategory(oldCategory, categoryDTO);

            oldCategory.Alias = categoryDTO.Alias;
            oldCategory.IsVisible = categoryDTO.IsVisible ?? true;

            return await _repository.UpdateCategory(oldCategory);
        }

        /// <summary>
        /// Удаление категории
        /// </summary>
        public async ValueTask<bool> DeleteCategory(string categoryId)
        {
            var category = await _repository.GetCategory(categoryId);

            foreach (var photo in category.Photos)
            {
                await _fileHelper.RemoveFileFromRepository(photo, updateDB: false);
            }

            await _context.Entry(category)
                .Collection(x => x.Subcategories)
                .LoadAsync();

            foreach (var subcategory in category.Subcategories)
            {
                await _context.Entry(subcategory)
                    .Reference(x => x.Photo)
                    .LoadAsync();

                await _fileHelper.RemoveFileFromRepository(subcategory.Photo, updateDB: false);

                await _context.Entry(subcategory)
                    .Collection(x => x.Products)
                    .LoadAsync();

                foreach (var product in subcategory.Products)
                {
                    await _context.Entry(product)
                        .Collection(x => x.Photos)
                        .LoadAsync();

                    foreach (var photo in product.Photos)
                    {
                        await _fileHelper.RemoveFileFromRepository(photo, updateDB: false);
                    }
                }
            }

            await _repository.DeleteCategory(category);

            return true;
        }
    }
}
