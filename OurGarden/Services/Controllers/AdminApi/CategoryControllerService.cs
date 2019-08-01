using Core.Helpers;

using Database.Contexts;
using Database.Repositories;

using Microsoft.EntityFrameworkCore;

using Model.DB;
using Model.DTO;

using System;
using System.Linq;
using System.Threading.Tasks;

using Web.Controllers.AdminApi;

namespace Web.Services.Controllers.AdminApi
{
    public class CategoryControllerService
    {
        private readonly OurGardenRepository _repository;
        private readonly OurGardenContext _context;
        public CategoryControllerService(IOurGardenRepository repository)
        {
            _repository = repository as OurGardenRepository;
            _context = _repository._context;
        }

        public async ValueTask<(bool isSuccess, string error)> UpdateCategory(CategoryDTO categoryDTO, Category oldCategory)
        {
            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    var fileHelper = new FileHelper(_repository);
                    var file = await fileHelper.AddFileToRepository(categoryDTO.Url);

                    var newCategory = new Category()
                    {
                        CategoryId = StringHelper.Transform(categoryDTO.Alias),
                        Alias = categoryDTO.Alias,
                        Photo = file
                    };
                    await _repository.AddCategory(newCategory);

                    await _context.Entry(oldCategory).Collection(x => x.Subcategories).LoadAsync();

                    while (oldCategory.Subcategories.Count != 0)
                    {
                        var oldSubcategory = oldCategory.Subcategories.ElementAt(0);
                        var newSubcategory = default(Subcategory);

                        await _context.Entry(oldSubcategory).Reference(x => x.Photo).LoadAsync();

                        var guid = Guid.NewGuid();
                        newSubcategory = new Subcategory()
                        {
                            CategoryId = newCategory.CategoryId,
                            SubcategoryId = oldSubcategory.SubcategoryId,

                            Alias = oldSubcategory.Alias,
                            Photo = new Photo()
                            {
                                PhotoId = guid,
                                Name = guid.ToString(),
                                Date = DateTime.Now,
                                Url = oldSubcategory.Photo.Url
                            }
                        };

                        _context.Photo.Remove(oldSubcategory.Photo);

                        await _context.Entry(oldSubcategory).Collection(x => x.Products).LoadAsync();
                        newSubcategory.Products = oldSubcategory.Products.Select(product =>
                        {
                            _context.Entry(product).Collection(x => x.Photos).LoadAsync().GetAwaiter().GetResult();

                            return new Product()
                            {
                                CategoryId = newCategory.CategoryId,
                                SubcategoryId = newSubcategory.SubcategoryId,
                                ProductId = product.ProductId,

                                Alias = product.Alias,
                                Price = product.Price,
                                Descriprion = product.Descriprion,

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
                        })
                            .ToList();

                        _context.Add(newSubcategory);

                        var orderList = _context.OrderPosition
                            .Include(x => x.Product)
                            .Where(
                                order => oldSubcategory.Products.Any(
                                    product => product.CategoryId == order.Product.CategoryId
                                               && product.SubcategoryId == order.Product.SubcategoryId
                                               && product.ProductId == order.Product.ProductId
                            )
                        ).ToList();

                        orderList.ForEach(order =>
                        {
                            var newProduct = newSubcategory.Products.First(product => product.CategoryId == order.Product.CategoryId
                                                                                      && product.SubcategoryId == order.Product.SubcategoryId
                                                                                      && product.ProductId == order.Product.ProductId);

                            order.Product = newProduct;

                            _context.Update(order);
                        });

                        _context.Remove(oldSubcategory);

                        await _context.SaveChangesAsync();
                    }

                    await _repository.DeleteCategory(oldCategory.CategoryId);

                    transaction.Commit();
                    return (true, null);
                }
                catch (Exception)
                {
                    transaction.Rollback();

                    return (false, "Ошибка при обнавлении категории. Возможно подкатегория или товар с такой категорией уже существуют");
                }
            }
        }
    }
}
