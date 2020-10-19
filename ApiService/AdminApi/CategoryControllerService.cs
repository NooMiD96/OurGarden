using ApiService.Abstraction.AdminApi;
using ApiService.Abstraction.Core;
using ApiService.Abstraction.DTO;
using ApiService.Abstraction.Model;
using ApiService.Core.Admin;

using Core.Helpers;

using DataBase.Abstraction.Model;
using DataBase.Abstraction.Repositories;
using DataBase.Context;
using DataBase.Repository;

using Microsoft.Extensions.Logging;

using PhotoService.Abstraction;
using PhotoService.Abstraction.Model;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiService.AdminApi
{
    public class CategoryControllerService : AdminCRUDService<Category, CategoryDTO>, ICategoryControllerService, IAdminCRUDService<Category, CategoryDTO>
    {
        #region Fields

        /// <summary>
        /// Репо БД
        /// </summary>
        private readonly IOurGardenRepository _repository;

        /// <summary>
        /// Оригинальный контекст БД
        /// </summary>
        [Obsolete]
        private readonly OurGardenContext _context;

        /// <summary>
        /// Логгер
        /// </summary>
        private readonly ILogger _logger;

        /// <summary>
        /// Сервис сохранения фотографий
        /// </summary>
        private readonly IPhotoSaver _photoSaver;

        /// <summary>
        /// Сервис обновления фотографий у существующего объекта
        /// </summary>
        private readonly IPhotoEntityUpdater _photoEntityUpdater;

        #endregion

        #region .ctor

        /// <summary>
        /// .ctor
        /// </summary>
        public CategoryControllerService(ILogger<CategoryControllerService> logger,
                                         IOurGardenRepository repository,
                                         IPhotoSaver photoSaver,
                                         IPhotoEntityUpdater photoEntityUpdater) : base(repository,
                                                                                        photoSaver,
                                                                                        photoEntityUpdater)
        {
            _repository = repository;
            _context = (_repository as OurGardenRepository).Context;
            _logger = logger;
            _photoSaver = photoSaver;
            _photoEntityUpdater = photoEntityUpdater;
        }

        #endregion

        #region ICategoryControllerService Impl

        /// <inheritdoc/>
        public async Task<ServiceExecuteResult<IEnumerable<Category>>> GetCategories()
        {
            try
            {
                var categories = (
                        await _repository.GetCategories(isGetOnlyVisible: false)
                    )
                    .OrderBy(x => x.Alias)
                    .ToList();

                foreach (var category in categories)
                {
                    category.Photos = category.Photos.OrderBy(x => x.Date).ToList();
                }

                return new ServiceExecuteResult<IEnumerable<Category>>
                {
                    IsSuccess = true,
                    Result = categories
                };
            }
            catch (Exception ex)
            {
                var msg = $"Не удалось получить список категорий. ${ex.Message}";
                _logger.LogError(ex, msg);

                return new ServiceExecuteResult<IEnumerable<Category>>
                {
                    IsSuccess = false,
                    Error = msg
                };
            }
        }

        /// <inheritdoc/>
        public async Task<ServiceExecuteResult<bool>> AddOrUpdate(CategoryDTO entityDTO)
        {
            try
            {
                if (String.IsNullOrEmpty(entityDTO?.CategoryId))
                {
                    var (entity, error) = await this.CreateEntity(
                        entityDTO,
                        addEntityDbFunc: _repository.AddCategory);

                    if (entity == null)
                    {
                        return new ServiceExecuteResult<bool>
                        {
                            IsSuccess = false,
                            Error = error
                        };
                    }

                    return new ServiceExecuteResult<bool>
                    {
                        IsSuccess = true,
                        Result = true
                    };
                }
                else
                {
                    var oldEntity = await _repository.GetCategory(entityDTO.CategoryId);

                    if (oldEntity is null)
                    {
                        var msg = $"Не удалось найти категорию с именем \"{entityDTO.Alias}\" (идентификатором \"{entityDTO.CategoryId}\")";
                        _logger.LogError(msg);

                        return new ServiceExecuteResult<bool>
                        {
                            IsSuccess = false,
                            Error = msg
                        };
                    }

                    if (oldEntity.Alias.TransformToId() != oldEntity.Alias.TransformToId())
                    {
                        var (isSuccess, error) = await FullUpdate(entityDTO, oldEntity);

                        return new ServiceExecuteResult<bool>
                        {
                            IsSuccess = isSuccess,
                            Result = isSuccess,
                            Error = error
                        };
                    }
                    else
                    {
                        var (isSuccess, error) = await this.UpdateEntity(
                            oldEntity,
                            entityDTO,
                            updateEntityDbFunc: _repository.UpdateCategory);

                        return new ServiceExecuteResult<bool>
                        {
                            IsSuccess = isSuccess,
                            Result = isSuccess,
                            Error = error
                        };
                    }
                }
            }
            catch (Exception ex)
            {
                var msg = $"В результате добавления/обновления произошла ошибка: {ex.Message}";
                _logger.LogError($"{msg}\nModel: {JsonHelper.Serialize(entityDTO)}");

                return new ServiceExecuteResult<bool>
                {
                    IsSuccess = false,
                    Error = msg
                };
            }
        }

        /// <inheritdoc/>
        public async Task<ServiceExecuteResult<bool>> DeleteCategory(string categoryId)
        {
            try
            {
                var entity = await _repository.GetCategory(categoryId);
                if (entity is null)
                {
                    var msg = $"Не удалось удалить категорию с идентификатором \"{categoryId}\" так как такая категория не найдена.";
                    _logger.LogError(msg);

                    return new ServiceExecuteResult<bool>
                    {
                        IsSuccess = false,
                        Error = msg
                    };
                }

                await Delete(entity);

                return new ServiceExecuteResult<bool>
                {
                    IsSuccess = true,
                    Result = true
                };
            }
            catch (Exception ex)
            {
                var msg = $"Не удалось удалить категорию с идентификатором \"{categoryId}\" по след. причине: {ex.Message}";
                _logger.LogError(msg);

                return new ServiceExecuteResult<bool>
                {
                    IsSuccess = false,
                    Error = msg
                };
            }
        }

        #endregion

        #region Private

        private async ValueTask<(bool isSuccess, string error)> FullUpdate(CategoryDTO categoryDTO, Category oldCategory)
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

                var (newCategory, error) = await this.CreateEntity(categoryDTO,
                                                                   addEntityDbFunc: _repository.AddCategory,
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

                    // Загружаем для подкатегории фотографии
                    await _repository.LoadPhotoCollection(oldSubcategory);

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
                        await _repository.LoadPhotoCollection(product);

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
                    await _repository.SaveChangesAsync();
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
        /// Функция по обновлению полей сущности. Используется во многих местах,
        /// поэтому приведена единая.
        /// </summary>
        /// <param name="entity">Исходный объект</param>
        /// <param name="entityDTO">ДТО</param>
        public override void UpdateEntityObjectAction(Category entity, CategoryDTO entityDTO)
        {
            entity.CategoryId = entityDTO.Alias.TransformToId();

            entity.Alias = entityDTO.Alias;
            entity.IsVisible = entityDTO.IsVisible ?? true;
            entity.Description = entityDTO.Description;

            entity.SeoTitle = entityDTO.SeoTitle;
            entity.SeoDescription = entityDTO.SeoDescription;
            entity.SeoKeywords = entityDTO.SeoKeywords;
        }

        private async Task Delete(Category category)
        {
            foreach (var photo in category.Photos)
            {
                await _photoSaver.RemoveFileFromRepository(photo, updateDB: false);
            }

            await _context.Entry(category)
                .Collection(x => x.Subcategories)
                .LoadAsync();

            foreach (var subcategory in category.Subcategories)
            {
                await _repository.LoadPhotoCollection(subcategory);
                foreach (var photo in subcategory.Photos)
                {
                    await _photoSaver.RemoveFileFromRepository(photo, updateDB: false);
                }

                await _context.Entry(subcategory)
                    .Collection(x => x.Products)
                    .LoadAsync();

                foreach (var product in subcategory.Products)
                {
                    await _repository.LoadPhotoCollection(product);
                    foreach (var photo in product.Photos)
                    {
                        await _photoSaver.RemoveFileFromRepository(photo, updateDB: false);
                    }
                }
            }

            await _repository.DeleteCategory(category);
        }

        #endregion
    }
}
