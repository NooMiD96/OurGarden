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
        private const string __subcategory_alredy_exist = "Не удалось {0} подкатегорию с выбранной категорией \"{1}\" и наименованием \"{2}\" поскольку уже существует подкатегория с наименованием \"{3}\".";

        public async Task<IEnumerable<Subcategory>> GetSubcategories(bool isGetOnlyVisible = false) =>
            await GetSubcategoriesImpl(isGetOnlyVisible: isGetOnlyVisible);

        public async Task<IEnumerable<Subcategory>> GetSubcategories(string categoryId, bool isGetOnlyVisible = false) =>
            await GetSubcategoriesImpl(categoryId: categoryId, isGetOnlyVisible: isGetOnlyVisible);

        public async Task<Subcategory> GetSubcategory(string categoryId, string subcategoryId, bool includeProducts = false) =>
            (
                await GetSubcategoriesImpl(categoryId: categoryId, subcategoryId: subcategoryId, includeProducts: includeProducts)
            )
            .FirstOrDefault();

        public async Task<IEnumerable<IBreadcrumb>> GetSubcategoryBreadcrumb(string categoryId)
        {
            categoryId = categoryId.TransformToId();

            var result = new List<IBreadcrumb>();

            var category = await Context.Category
                .Select(x => new
                {
                    x.CategoryId,
                    x.Alias
                })
                .FirstOrDefaultAsync(x => x.CategoryId == categoryId);

            if (category is null)
                return result;

            result.Add(new Breadcrumb()
            {
                DisplayName = category.Alias,
                Url = $"Catalog/{category.CategoryId}",
            });

            return result;
        }

        public async ValueTask<(bool isSuccess, string error)> AddSubcategory(Subcategory subcategory)
        {
            const string crudName = "добавить";

            var (isSuccess, error, findedEntity) = await AddNewEntityImpl(subcategory);
            if (!isSuccess && error == __entity_alredy_exists)
            {
                if (findedEntity.Category is null)
                {
                    await Context.Entry(findedEntity)
                        .Reference(x => x.Category)
                        .LoadAsync();
                }

                error = String.Format(
                    __subcategory_alredy_exist,
                    crudName,
                    findedEntity.Category.Alias,
                    subcategory.Alias,
                    findedEntity.Alias
                );
            }

            return (isSuccess, error);
        }

        public async ValueTask<(bool isSuccess, string error)> UpdateSubcategory(Subcategory subcategory)
        {
            var result = await UpdateEntityImpl(subcategory);

            return result;
        }

        public async Task DeleteSubcategory(string categoryId, string subcategoryId)
        {
            var subcategory = await Context.Subcategory
                .FirstOrDefaultAsync(x => x.SubcategoryId == subcategoryId && x.CategoryId == categoryId);
            if (subcategory == null)
                return;
            Context.Subcategory.Remove(subcategory);
            await Context.SaveChangesAsync();
        }

        public async Task DeleteSubcategory(Subcategory subcategory)
        {
            Context.Subcategory.Remove(subcategory);
            await Context.SaveChangesAsync();
        }
    }
}
