﻿using Core.Helpers;

using Database.Contexts;
using Database.Repositories;

using Microsoft.EntityFrameworkCore;

using Model.DB;
using Model.DTO.ProductDTO;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Web.Controllers.AdminApi;

namespace Web.Services.Controllers.AdminApi
{
    public class ProductControllerService
    {
        private readonly OurGardenRepository _repository;
        private readonly OurGardenContext _context;
        private readonly FileHelper _fileHelper;

        public ProductControllerService(IOurGardenRepository repository)
        {
            _repository = repository as OurGardenRepository;
            _context = _repository._context;
            _fileHelper = new FileHelper(_repository);
        }

        public async ValueTask<(bool isSuccess, string error)> UpdateProduct(ProductDTO productDTO, Product oldProduct)
        {
            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                (bool isSuccess, string error) cancelUpdate((bool isSuccess, string error) result)
                {
                    transaction.Rollback();
                    return result;
                }

                try
                {
                    // Создаём новую категорию
                    var photos = new List<Photo>();
                    var file = default(Photo);
                    if (productDTO.File == null)
                    {
                        file = _fileHelper.ClonePhoto(oldProduct.Photos.ElementAt(0).Url);
                        _context.RemoveRange(oldProduct.Photos);
                    }
                    else
                    {
                        file = await _fileHelper.AddFileToRepository(productDTO.File);

                        foreach (var photo in oldProduct.Photos)
                            await _fileHelper.RemoveFileFromRepository(photo, false);
                    }
                    photos.Add(file);

                    var product = new Product()
                    {
                        CategoryId = productDTO.NewCategoryId,
                        SubcategoryId = productDTO.NewSubcategoryId,
                        ProductId = productDTO.Alias.TransformToId(),
                        Alias = productDTO.Alias,
                        Price = productDTO.Price,
                        Description = productDTO.Description,
                        Photos = photos
                    };
                    var result = await _repository.AddProduct(product);
                    if (!result.isSuccess)
                    {
                        return cancelUpdate(result);
                    }

                    // Теперь мы можем изменить заказы, т.к. новая категория с подкатегорией и продуктами добавлены
                    var orderList = _context.OrderPosition
                            .Include(x => x.Product)
                            .Where(
                                order => productDTO.CategoryId == order.Product.CategoryId
                                            && productDTO.SubcategoryId == order.Product.SubcategoryId
                                            && productDTO.ProductId == order.Product.ProductId
                            ).ToList();

                    // Обновляем ссылку на продукт
                    orderList.ForEach(order =>
                    {
                        order.Product = product;

                        _context.Update(order);
                    });

                    // Теперь старая подкатегория не нужно
                    _context.Remove(oldProduct);

                    await _context.SaveChangesAsync();

                    transaction.Commit();
                    return (true, null);
                }
                catch (Exception ex)
                {
                    Console.Error.WriteLine($"err: {ex.Message}");
                    Console.Error.WriteLine(ex.StackTrace);
                    return cancelUpdate((
                        false,
                        $"Ошибка при обновлении товара. Возможно товар с таким наименованем уже существует. Текст ошибки: {ex.Message}"
                    ));
                }
            }
        }
    }
}
