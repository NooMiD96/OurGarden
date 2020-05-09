using DataBase.Abstraction;
using DataBase.Abstraction.Model;

using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataBase.Repository
{
    /// <summary>
    /// Часть класса по работе с категориями.
    /// </summary>
    public partial class OurGardenRepository
    {
        private const string __category_alredy_exist = "Не удалось {0} категорию с наименованием \"{1}\" поскольку уже существует категория с наименованием \"{2}\".";

        public async Task<IEnumerable<Category>> GetCategories(bool isGetOnlyVisible = false) =>
            await GetCategoryImpl(isGetOnlyVisible: isGetOnlyVisible);

        public async Task<Category> GetCategory(string categoryId, bool includeSubcategory = false) =>
            (
                await GetCategoryImpl(categoryId: categoryId, includeSubcategory: includeSubcategory)
            )
            .FirstOrDefault();

        public async Task<IEnumerable<IItemDictionary>> GetSimpleCategories(bool includeSubcategory = false)
        {
            IQueryable<IItemDictionary> query;

            if (includeSubcategory)
            {
                query = Context
                    .Category
                    .Select(cat => new ItemDictionary()
                    {
                        ItemId = cat.CategoryId,
                        Alias = cat.Alias,
                        SubDictionary = cat.Subcategories.Select(sub => new ItemDictionary()
                        {
                            ItemId = sub.SubcategoryId,
                            Alias = sub.Alias,
                            SubDictionary = null
                        })
                    })
                    .AsQueryable();
            }
            else
            {
                query = Context
                    .Category
                    .Select(cat => new ItemDictionary()
                    {
                        ItemId = cat.CategoryId,
                        Alias = cat.Alias,
                        SubDictionary = null
                    })
                    .AsQueryable();
            }

            return await query.ToListAsync();
        }

        public async ValueTask<(bool isSuccess, string error)> AddCategory(Category category)
        {
            const string crudName = "добавить";

            var (isSuccess, error, findedEntity) = await AddNewEntityImpl(category);
            if (!isSuccess && error == __entity_alredy_exists)
            {
                error = String.Format(
                    __category_alredy_exist,
                    crudName,
                    category.Alias,
                    findedEntity.Alias
                );
            }

            return (isSuccess, error);
        }

        public async ValueTask<(bool isSuccess, string error)> UpdateCategory(Category category)
        {
            var result = await UpdateEntityImpl(category);

            return result;
        }

        public async Task DeleteCategory(string categoryId)
        {
            var category = await Context.Category.FirstOrDefaultAsync(x => x.CategoryId == categoryId);
            if (category == null)
                return;
            Context.Category.Remove(category);
            await Context.SaveChangesAsync();
        }

        public async Task DeleteCategory(Category category)
        {
            Context.Category.Remove(category);
            await Context.SaveChangesAsync();
        }
    }
}
