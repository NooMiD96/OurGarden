using Core.Helpers;

using Database.Contexts;
using Database.Repositories;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

using Model.DB;
using Model.DTO.Subcategory;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Web.Controllers.AdminApi;
using Web.Helpers;

namespace Web.Services.Controllers.AdminApi
{
    public class SubcategoryControllerService
    {
        private readonly OurGardenRepository _repository;
        private readonly OurGardenContext _context;
        private readonly FileHelper _fileHelper;
        private readonly PhotoHelper _photoHelper;
        private readonly ILogger _logger;
        private const string CONTROLLER_LOCATE = "AdminApi.SubcategoryController.Service";

        public SubcategoryControllerService(IOurGardenRepository repository,
                                            ILogger logger)
        {
            _repository = repository as OurGardenRepository;
            _context = _repository._context;
            _logger = logger;
            _fileHelper = new FileHelper(repository);
            _photoHelper = new PhotoHelper(repository, logger);
        }

        private async ValueTask<(Subcategory subcategory, string error)> CreateSubcategory(SubcategoryDTO entityDTO,
                                                                                           ICollection<Photo> defaultPhotoList = null,
                                                                                           List<Photo> scheduleAddedPhotoList = null,
                                                                                           List<Photo> scheduleDeletePhotoList = null)
        {
            var subcategory = new Subcategory()
            {
                CategoryId = entityDTO.NewCategoryId,
                SubcategoryId = entityDTO.Alias.TransformToId(),

                Alias = entityDTO.Alias,
                IsVisible = entityDTO.IsVisible ?? true,

                Products = new List<Product>(),
                Photos = new List<Photo>()
            };

            //Добавляем и проверяем можем ли мы добавить данную категорию
            var (isSuccess, error) = await _repository.AddSubcategory(subcategory);
            if (!isSuccess)
            {
                return (null, error);
            }

            _photoHelper.MovePhotosToEntity(subcategory, defaultPhotoList);

            await _photoHelper.LoadPhotosToEntity(subcategory,
                                                  entityDTO,
                                                  scheduleAddedPhotoList,
                                                  scheduleDeletePhotoList);

            await _context.SaveChangesAsync();

            return (subcategory, null);
        }

        public async ValueTask<(bool isSuccess, string error)> AddSubcategory(SubcategoryDTO subcategoryDTO)
        {
            var (subcategory, error) = await CreateSubcategory(subcategoryDTO);

            return (subcategory != null, error);
        }

        public async ValueTask<(bool isSuccess, string error)> FullUpdateSubcategory(SubcategoryDTO subcategoryDTO, Subcategory oldSubcategory)
        {
            const string API_LOCATE = CONTROLLER_LOCATE + ".FullUpdateSubcategory";

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
                    #region Create new entity and migrate/update photo list

                    var (newSubcategory, error) = await CreateSubcategory(subcategoryDTO,
                                                                          defaultPhotoList: oldSubcategory.Photos,
                                                                          scheduleAddedPhotoList: scheduleAddedPhotoList,
                                                                          scheduleDeletePhotoList: scheduleDeletePhotoList);

                    if (newSubcategory is null)
                    {
                        return cancelUpdate((false, error));
                    }

                    #endregion

                    // Загружаем список продуктов
                    await _context
                        .Entry(oldSubcategory)
                        .Collection(x => x.Products)
                        .LoadAsync();

                    foreach (var product in oldSubcategory.Products)
                    {
                        await _context
                            .Entry(product)
                            .Collection(x => x.Photos)
                            .LoadAsync();

                        var newProduct = new Product()
                        {
                            CategoryId = newSubcategory.CategoryId,
                            SubcategoryId = newSubcategory.SubcategoryId,
                            ProductId = product.ProductId,

                            Alias = product.Alias,
                            Price = product.Price,
                            Description = product.Description,

                            Photos = new List<Photo>()
                        };

                        _photoHelper.MovePhotosToEntity(newProduct, product.Photos);

                        newSubcategory.Products.Add(newProduct);
                    }

                    // Теперь мы можем изменить заказы, т.к. новая подкатегория и продукты добавлены
                    var orderList = _context.OrderPosition
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

                    // Теперь старая подкатегория не нужна
                    _context.Remove(oldSubcategory);

                    // Сохраняем изменения
                    await _context.SaveChangesAsync();

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
                        $"Ошибка при обновлении подкатегории. Возможно товар с такой подкатегорией уже существует. Текст ошибки: {ex.Message}"
                    ));
                }
            }
        }

        public async ValueTask<(bool isSuccess, string error)> UpdateSubcategory(SubcategoryDTO subcategoryDTO, Subcategory oldSubcategory)
        {
            await _photoHelper.LoadPhotosToEntity(oldSubcategory, subcategoryDTO);

            oldSubcategory.Alias = subcategoryDTO.Alias;
            oldSubcategory.IsVisible = subcategoryDTO.IsVisible ?? true;

            return await _repository.UpdateSubcategory(oldSubcategory);
        }

        public async ValueTask<(bool isSuccess, string error)> DeleteSubcategory(string categoryId, string subcategoryId)
        {
            var subcategory = await _repository.GetSubcategory(categoryId, subcategoryId);

            if (subcategory is null)
            {
                return (
                    false,
                    $"Что-то пошло не так, не удалось найти подкатегорию.\n\tКатегория: {categoryId}\n\tПодкатегория: {subcategoryId}"
                );
            }

            foreach (var photo in subcategory.Photos)
            {
                await _fileHelper.RemoveFileFromRepository(photo, updateDB: false);
            }

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

            await _repository.DeleteSubcategory(subcategory);

            return (true, null);
        }
    }
}
