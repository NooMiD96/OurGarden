using Core.Helpers;

using DataBase.Abstraction;
using DataBase.Abstraction.Model;

using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataBase.Repository
{
    public partial class OurGardenRepository
    {
        private const string __product_alredy_exist = "Не удалось {0} продукт с выбранной категорией \"{1}\", подкатегорией \"{2}\" и наименованием \"{3}\" поскольку уже существует продукт с наименованием \"{4}\".";

        public async Task<IEnumerable<Product>> GetProducts() => await GetProductsImpl();

        public async Task<IEnumerable<Product>> GetProducts(string categoryId, string subcategoryId, bool isGetOnlyVisible = false) =>
            await GetProductsImpl(categoryId: categoryId, subcategoryId: subcategoryId, isGetOnlyVisible: isGetOnlyVisible);

        public async Task<Product> GetProduct(string categoryId, string subcategoryId, string productId) =>
            (
                await GetProductsImpl(productId: productId, categoryId: categoryId, subcategoryId: subcategoryId)
            )
            .FirstOrDefault();

        public async Task<IEnumerable<IBreadcrumb>> GetProductBreadcrumb(string categoryId, string subcategoryId)
        {
            categoryId = categoryId.TransformToId();
            subcategoryId = subcategoryId.TransformToId();

            var result = new List<IBreadcrumb>();

            var subcategory = await Context.Subcategory
                .Select(x => new
                {
                    CategoryAlias = x.Category.Alias,
                    x.Category.CategoryId,
                    x.SubcategoryId,
                    x.Alias
                })
                .FirstOrDefaultAsync(x => x.CategoryId == categoryId && x.SubcategoryId == subcategoryId);

            if (subcategory is null)
                return result;

            result.Add(new Breadcrumb()
            {
                DisplayName = subcategory.CategoryAlias,
                Url = $"Catalog/{subcategory.CategoryId}"
            });

            result.Add(new Breadcrumb()
            {
                DisplayName = subcategory.Alias,
                Url = $"Catalog/{subcategory.CategoryId}/{subcategory.SubcategoryId}"
            });

            return result;
        }

        public async Task<IEnumerable<IBreadcrumb>> GetProductBreadcrumb(string categoryId, string subcategoryId, string productId)
        {
            categoryId = categoryId.TransformToId();
            subcategoryId = subcategoryId.TransformToId();
            productId = productId.TransformToId();

            var result = new List<IBreadcrumb>();

            var product = await Context.Product
                .Select(x => new
                {
                    CategoryAlias = x.Subcategory.Category.Alias,
                    x.Subcategory.Category.CategoryId,
                    SubcategoryAlias = x.Subcategory.Alias,
                    x.Subcategory.SubcategoryId,
                    x.ProductId,
                    x.Alias
                })
                .FirstOrDefaultAsync(x => x.CategoryId == categoryId
                                          && x.SubcategoryId == subcategoryId
                                          && x.ProductId == productId);

            if (product is null)
                return result;

            result.Add(new Breadcrumb()
            {
                DisplayName = product.CategoryAlias,
                Url = $"Catalog/{product.CategoryId}"
            });

            result.Add(new Breadcrumb()
            {
                DisplayName = product.SubcategoryAlias,
                Url = $"Catalog/{product.CategoryId}/{product.SubcategoryId}"
            });

            result.Add(new Breadcrumb()
            {
                DisplayName = product.Alias,
                Url = $"Catalog/{product.CategoryId}/{product.SubcategoryId}/{product.ProductId}"
            });

            return result;
        }

        public async ValueTask<(bool isSuccess, string error)> AddProduct(Product product)
        {
            const string crudName = "добавить";

            var (isSuccess, error, findedEntity) = await AddNewEntityImpl(product);
            if (!isSuccess && error == __entity_alredy_exists)
            {
                if (findedEntity.Subcategory is null)
                {
                    await Context.Entry(findedEntity)
                        .Reference(x => x.Subcategory)
                        .LoadAsync();
                }

                if (findedEntity.Subcategory.Category is null)
                {
                    await Context.Entry(findedEntity.Subcategory)
                        .Reference(x => x.Category)
                        .LoadAsync();
                }

                error = String.Format(
                    __product_alredy_exist,
                    crudName,
                    findedEntity.Subcategory.Category.Alias,
                    findedEntity.Subcategory.Alias,
                    product.Alias,
                    findedEntity.Alias
                );
            }

            return (isSuccess, error);
        }

        public async ValueTask<(bool isSuccess, string error)> UpdateProduct(Product product)
        {
            var result = await UpdateEntityImpl(product);

            return result;
        }

        public async ValueTask<bool> DeleteProduct(string categoryId, string subcategoryId, string productId)
        {
            var product = await Context
                .Product
                .FirstOrDefaultAsync(x => x.ProductId == productId && x.SubcategoryId == subcategoryId && x.CategoryId == categoryId);

            if (product == null)
                return false;

            Context.Product.Remove(product);
            await Context.SaveChangesAsync();

            return true;
        }

        public async ValueTask<bool> DeleteProduct(Product product)
        {
            Context.Product.Remove(product);
            await Context.SaveChangesAsync();

            return true;
        }
    }
}
