using Core;
using Core.Helpers;

using Database.Contexts;
using Database.Repositories;

using Microsoft.EntityFrameworkCore;

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

        public CategoryControllerService(IOurGardenRepository repository)
        {
            _repository = repository as OurGardenRepository;
            _context = _repository._context;
            _fileHelper = new FileHelper(_repository);
        }

        public async ValueTask<(bool isSuccess, string error)> UpdateCategory(CategoryDTO categoryDTO, Category oldCategory)
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
                    var file = default(Photo);
                    if (categoryDTO.File == null)
                    {
                        file = _fileHelper.ClonePhoto(oldCategory.Photo.Url);
                        _context.Remove(oldCategory.Photo);
                    }
                    else
                    {
                        file = await _fileHelper.AddFileToRepository(categoryDTO.File);
                        await _fileHelper.RemoveFileFromRepository(oldCategory.Photo, false);
                    }

                    var newCategory = new Category()
                    {
                        CategoryId = categoryDTO.Alias.TransformToId(),

                        Alias = categoryDTO.Alias,

                        Photo = file
                    };
                    var result = await _repository.AddCategory(newCategory);
                    if (!result.isSuccess)
                    {
                        return cancelUpdate(result);
                    }

                    var newCategoryId = newCategory.CategoryId;
                    newCategory = null;

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
                            Photo = _fileHelper.ClonePhoto(oldSubcategory.Photo.Url),
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

                                    return _fileHelper.ClonePhoto(photo.Url);
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
                    return (true, null);
                }
                catch (Exception ex)
                {
                    Console.Error.WriteLine($"err: {ex.Message}");
                    return cancelUpdate((
                        false,
                        $"Ошибка при обновлении категории. Возможно подкатегория и товар с такой категорией уже существует. Текст ошибки: {ex.Message}"
                    ));
                }
            }
        }
    }
}
