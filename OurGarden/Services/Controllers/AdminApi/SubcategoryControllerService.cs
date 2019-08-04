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
    public class SubcategoryControllerService
    {
        private readonly OurGardenRepository _repository;
        private readonly OurGardenContext _context;
        public SubcategoryControllerService(IOurGardenRepository repository)
        {
            _repository = repository as OurGardenRepository;
            _context = _repository._context;
        }

        public async ValueTask<(bool isSuccess, string error)> UpdateSubcategory(SubcategoryDTO subcategoryDTO, Subcategory oldSubcategory)
        {
            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    // Создаём новую подкатегорию
                    var fileHelper = new FileHelper(_repository);
                    var file = await fileHelper.AddFileToRepository(subcategoryDTO.Url);

                    var newSubcategory = new Subcategory()
                    {
                        SubcategoryId = StringHelper.Transform(subcategoryDTO.Alias),
                        CategoryId = subcategoryDTO.NewCategoryId,
                        Alias = subcategoryDTO.Alias,
                        Photo = file
                    };
                    await _repository.AddSubcategory(newSubcategory);
                    var newSubcategoryId = new {
                        SubcategoryId = newSubcategory.SubcategoryId,
                        CategoryId = newSubcategory.CategoryId
                    };             

                    // Загружаем список продуктов
                    await _context.Entry(oldSubcategory).Collection(x => x.Products).LoadAsync();
                    newSubcategory.Products = oldSubcategory.Products.Select(product =>
                    {
                        // Загружаем список фотографий для данного продукта
                        _context.Entry(product).Collection(x => x.Photos).LoadAsync().GetAwaiter().GetResult();

                        return new Product()
                        {
                            CategoryId = newSubcategoryId.CategoryId,
                            SubcategoryId = newSubcategoryId.SubcategoryId,
                            ProductId = product.ProductId,

                            Alias = product.Alias,
                            Price = product.Price,
                            Description = product.Description,

                            Photos = product.Photos.Select(photo =>
                            {
                                var id = Guid.NewGuid();

                                _context.Remove(photo);

                                return new Photo()
                                {
                                    Date = DateTime.Now,
                                    Name = id.ToString(),
                                    PhotoId = id,
                                    Url = photo.Url
                                };
                            }).ToList()
                        };
                    }).ToList();

                    // Теперь мы можем изменить заказы, т.к. новая подкатегория и продукты добавлены
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

                    // Уберем старые продукты 
                    _context.RemoveRange(oldSubcategory.Products);

                    // Теперь старая подкатегория не нужна
                    _context.Remove(oldSubcategory);

                    // Сохраняем изменения
                    await _context.SaveChangesAsync();

                    transaction.Commit();
                    return (true, null);
                }
                catch (Exception ex)
                {
                    transaction.Rollback();

                    return (false, "Ошибка при обнавлении подкатегории.");
                }
            }
        }
    }
}
