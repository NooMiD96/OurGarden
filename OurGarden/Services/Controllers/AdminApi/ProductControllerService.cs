using ApiService.Abstraction.Core;
using ApiService.Abstraction.DTO.ProductDTO;

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

namespace Web.Services.Controllers.AdminApi
{
    public class ProductControllerService
    {
        private readonly OurGardenRepository _repository;
        private readonly OurGardenContext _context;
        private readonly IPhotoSaver _photoSaver;
        private readonly IPhotoEntityUpdater _photoEntityUpdater;
        private readonly ILogger _logger;

        public ProductControllerService(IOurGardenRepository repository,
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

        private async ValueTask<(Product product, string error)> CreateProduct(ProductDTO entityDTO,
                                                                               ICollection<Photo> defaultPhotoList = null,
                                                                               List<Photo> scheduleAddedPhotoList = null,
                                                                               List<Photo> scheduleDeletePhotoList = null)
        {
            var product = new Product()
            {
                CategoryId = entityDTO.NewCategoryId,
                SubcategoryId = entityDTO.NewSubcategoryId,
                ProductId = entityDTO.Alias.TransformToId(),

                Alias = entityDTO.Alias,
                Price = entityDTO.Price,
                Description = entityDTO.Description,
                IsVisible = entityDTO.IsVisible ?? true,

                SeoTitle = entityDTO.SeoTitle,
                SeoDescription = entityDTO.SeoDescription,
                SeoKeywords = entityDTO.SeoKeywords,

                Photos = new List<Photo>()
            };

            //Добавляем и проверяем можем ли мы добавить данную категорию
            var (isSuccess, error) = await _repository.AddProduct(product);
            if (!isSuccess)
            {
                return (null, error);
            }

            _photoEntityUpdater.MovePhotosToEntity(product, defaultPhotoList);

            await _photoEntityUpdater.LoadPhotosToEntity(product,
                                                  entityDTO,
                                                  scheduleAddedPhotoList,
                                                  scheduleDeletePhotoList);

            await _context.SaveChangesAsync();

            return (product, null);
        }

        public async ValueTask<(bool isSuccess, string error)> AddProduct(ProductDTO productDTO)
        {
            var (product, error) = await CreateProduct(productDTO);

            return (product != null, error);
        }

        public async ValueTask<(bool isSuccess, string error)> FullUpdateProduct(ProductDTO productDTO, Product oldProduct)
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

                var (newProduct, error) = await CreateProduct(productDTO,
                                                              defaultPhotoList: oldProduct.Photos,
                                                              scheduleAddedPhotoList: scheduleAddedPhotoList,
                                                              scheduleDeletePhotoList: scheduleDeletePhotoList);

                if (newProduct is null)
                {
                    return cancelUpdate((false, error));
                }

                #endregion

                // Теперь мы можем изменить заказы, т.к. новая категория с подкатегорией и продуктами добавлены
                var orderList = _context.OrderPosition
                        .Where(
                            order => productDTO.CategoryId == order.Product.CategoryId
                                        && productDTO.SubcategoryId == order.Product.SubcategoryId
                                        && productDTO.ProductId == order.Product.ProductId
                        ).ToList();

                // Обновляем ссылку на продукт
                orderList.ForEach(order =>
                {
                    order.Product = newProduct;

                    _context.Update(order);
                });

                // Теперь старая подкатегория не нужна
                _context.Remove(oldProduct);

                await _context.SaveChangesAsync();

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

                var errMsg = "Ошибка при обновлении товара. Возможно товар с таким наименованем уже существует.";

                _logger.LogError(ex, errMsg);

                return cancelUpdate((
                    false,
                    $"{errMsg} Текст ошибки: {ex.Message}"
                ));
            }
        }

        public async ValueTask<(bool isSuccess, string error)> UpdateProduct(ProductDTO productDTO, Product oldProduct)
        {
            await _photoEntityUpdater.LoadPhotosToEntity(oldProduct, productDTO);

            oldProduct.Alias = productDTO.Alias;
            oldProduct.IsVisible = productDTO.IsVisible ?? true;
            oldProduct.Price = productDTO.Price;
            oldProduct.Description = productDTO.Description;

            oldProduct.SeoTitle = productDTO.SeoTitle;
            oldProduct.SeoDescription = productDTO.SeoDescription;
            oldProduct.SeoKeywords = productDTO.SeoKeywords;

            return await _repository.UpdateProduct(oldProduct);
        }

        public async ValueTask<(bool isSuccess, string error)> DeleteProduct(string categoryId, string subcategoryId, string productId)
        {
            var product = await _repository.GetProduct(categoryId, subcategoryId, productId);

            if (product is null)
            {
                return (
                    false,
                    $"Что-то пошло не так, не удалось найти товар.\n\tКатегория: {categoryId}\n\tПодкатегория: {subcategoryId}\n\tТовар: {productId}"
                );
            }

            foreach (var photo in product.Photos)
            {
                await _photoSaver.RemoveFileFromRepository(photo, updateDB: false);
            }

            await _repository.DeleteProduct(product);

            return (true, null);
        }
    }
}
