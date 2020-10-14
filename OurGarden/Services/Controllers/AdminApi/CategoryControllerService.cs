using ApiService.Abstraction.Core;
using ApiService.Abstraction.DTO;

using Core.Helpers;

using DataBase.Abstraction.Model;
using DataBase.Abstraction.Repositories;
using DataBase.Context;
using DataBase.Repository;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

using PhotoService.Abstraction;
using PhotoService.Abstraction.Model;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Services.Controllers.AdminApi
{
    public class CategoryControllerService
    {
        private readonly OurGardenRepository _repository;
        private readonly OurGardenContext _context;
        private readonly IPhotoSaver _photoSaver;
        private readonly IPhotoEntityUpdater _photoEntityUpdater;
        private readonly ILogger _logger;

        public CategoryControllerService(IOurGardenRepository repository,
                                         ILogger logger,
                                         IPhotoSaver photoSaver,
                                         IPhotoEntityUpdater photoEntityUpdater)
        {
            _repository = repository as OurGardenRepository;
            _context = _repository.Context;
            _logger = logger;
            _photoSaver = photoSaver;
            _photoEntityUpdater = photoEntityUpdater;
        }

        private async ValueTask<(Category category, string error)> CreateCategory(CategoryDTO entityDTO,
                                                                                  ICollection<Photo> defaultPhotoList = null,
                                                                                  List<Photo> scheduleAddedPhotoList = null,
                                                                                  List<Photo> scheduleDeletePhotoList = null)
        {
            var category = new Category()
            {
                CategoryId = entityDTO.Alias.TransformToId(),

                Alias = entityDTO.Alias,
                IsVisible = entityDTO.IsVisible ?? true,

                SeoTitle = entityDTO.SeoTitle,
                SeoDescription = entityDTO.SeoDescription,
                SeoKeywords = entityDTO.SeoKeywords,

                Description = entityDTO.Description,

                Photos = new List<Photo>()
            };

            //Добавляем и проверяем можем ли мы добавить данную категорию
            var (isSuccess, error) = await _repository.AddCategory(category);
            if (!isSuccess)
            {
                return (null, error);
            }

            _photoEntityUpdater.MovePhotosToEntity(category, defaultPhotoList);

            await _photoEntityUpdater.LoadPhotosToEntity(category,
                                                  entityDTO,
                                                  scheduleAddedPhotoList,
                                                  scheduleDeletePhotoList);

            await _context.SaveChangesAsync();

            return (category, null);
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
            // В случае когда нам не удаётся обновить данную модель
            // Мы должны удалить те фото, которые были добавлены
            var scheduleAddedPhotoList = new List<Photo>();

            // Если обновление прошло успешно
            // То нужно окончательно удалить ненужные фото
            var scheduleDeletePhotoList = new List<Photo>();

            using var transaction = await _context.Database.BeginTransactionAsync();
            (bool isSuccess, string error) cancelUpdate((bool isSuccess, string error) result)
            {
                transaction.Rollback();
                return result;
            }

            try
            {
                #region Create new entity and migrate/update photo list

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
                await _context
                    .Entry(oldCategory)
                    .Collection(x => x.Subcategories)
                    .LoadAsync();

                // Поскольку по окончанию цикла мы сохраняем изменения в БД
                // Список подкатегорий уменьшается, поэтому используется цикл while
                while (oldCategory.Subcategories.Count != 0)
                {
                    var oldSubcategory = oldCategory.Subcategories.ElementAt(0);
                    var newSubcategory = default(Subcategory);

                    // Загружаем для подкатегории фотографию
                    await _context
                        .Entry(oldSubcategory)
                        .Collection(x => x.Photos)
                        .LoadAsync();

                    // Создаём новую подкатегорию
                    newSubcategory = new Subcategory()
                    {
                        CategoryId = newCategoryId,
                        SubcategoryId = oldSubcategory.SubcategoryId,

                        SeoTitle = oldSubcategory.SeoTitle,
                        SeoDescription = oldSubcategory.SeoDescription,
                        SeoKeywords = oldSubcategory.SeoKeywords,

                        Description = oldCategory.Description,

                        Alias = oldSubcategory.Alias,
                        Products = new List<Product>(),
                        Photos = new List<Photo>(),
                    };

                    // Удаляем фотографию для старой
                    _photoEntityUpdater.MovePhotosToEntity(newSubcategory, oldSubcategory.Photos);

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

                            SeoTitle = product.SeoTitle,
                            SeoDescription = product.SeoDescription,
                            SeoKeywords = product.SeoKeywords,

                            Photos = new List<Photo>()
                        };

                        _photoEntityUpdater.MovePhotosToEntity(newProduct, product.Photos);

                        newSubcategory.Products.Add(newProduct);
                    }

                    // Добавляем новую подкатегорию
                    _context.Add(newSubcategory);

                    // Теперь мы можем изменить заказы, т.к. новая категория с подкатегорией и продуктами добавлены
                    var categoryKeys = oldSubcategory
                        .Products
                        .Select(x => x.CategoryId);

                    var subcategoryKeys = oldSubcategory
                        .Products
                        .Select(x => x.SubcategoryId);

                    var productKeys = oldSubcategory
                        .Products
                        .Select(x => x.ProductId);

                    var orderList = _context.OrderPosition
                        .Where(
                            order => categoryKeys.Contains(order.Product.CategoryId)
                            && subcategoryKeys.Contains(order.Product.SubcategoryId)
                            && productKeys.Contains(order.Product.ProductId)
                        )
                        .ToList();

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
                    _context.Remove(oldSubcategory);

                    // Сохраняем изменения
                    await _context.SaveChangesAsync();
                }

                // Если всё прошло удачно, удаляем старую категорию
                await _repository.DeleteCategory(oldCategory.CategoryId);

                transaction.Commit();

                foreach (var photo in scheduleDeletePhotoList)
                {
                    await _photoSaver.RemoveFileFromRepository(photo, updateDB: false);
                }

                return (true, null);
            }
            catch (Exception ex)
            {
                foreach (var photo in scheduleAddedPhotoList)
                {
                    await _photoSaver.RemoveFileFromRepository(photo, updateDB: false);
                }

                var errMsg = "Ошибка при обновлении категории. Возможно подкатегория и товар с такой категорией уже существует.";

                _logger.LogError(ex, errMsg);

                return cancelUpdate((
                    false,
                    $"{errMsg} Текст ошибки: {ex.Message}"
                ));
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
            await _photoEntityUpdater.LoadPhotosToEntity(oldCategory, categoryDTO);

            oldCategory.Alias = categoryDTO.Alias;
            oldCategory.IsVisible = categoryDTO.IsVisible ?? true;

            oldCategory.Description = categoryDTO.Description;

            oldCategory.SeoTitle = categoryDTO.SeoTitle;
            oldCategory.SeoDescription = categoryDTO.SeoDescription;
            oldCategory.SeoKeywords = categoryDTO.SeoKeywords;

            return await _repository.UpdateCategory(oldCategory);
        }

        /// <summary>
        /// Удаление категории
        /// </summary>
        public async ValueTask<(bool isSuccess, string error)> DeleteCategory(string categoryId)
        {
            var category = await _repository.GetCategory(categoryId);

            if (category is null)
            {
                return (
                    false,
                    $"Что-то пошло не так, не удалось найти категорию.\n\tКатегория: {categoryId}"
                );
            }

            foreach (var photo in category.Photos)
            {
                await _photoSaver.RemoveFileFromRepository(photo, updateDB: false);
            }

            await _context.Entry(category)
                .Collection(x => x.Subcategories)
                .LoadAsync();

            foreach (var subcategory in category.Subcategories)
            {
                await _context.Entry(subcategory)
                    .Collection(x => x.Photos)
                    .LoadAsync();

                foreach (var photo in subcategory.Photos)
                {
                    await _photoSaver.RemoveFileFromRepository(photo, updateDB: false);
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
                        await _photoSaver.RemoveFileFromRepository(photo, updateDB: false);
                    }
                }
            }

            await _repository.DeleteCategory(category);

            return (true, null);
        }
    }
}
