using DataBase.Abstraction;
using DataBase.Abstraction.Model;
using DataBase.Core;

using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DataBase.Repository
{
    public partial class OurGardenRepository
    {
        private const string __entity_alredy_exists = "Запись с такими ключевыми параметрами уже существует.";
        private const string __entity_not_found = "Запись с такими ключевыми параметрами не найдена.";

        #region Category

        private async Task<IEnumerable<Category>> GetCategoryImpl(string categoryId = null,
                                                                  string search = null,
                                                                  bool isGetOnlyVisible = false,
                                                                  bool includeSubcategory = false)
        {
            var query = Context.Category.Include(x => x.Photos).AsQueryable();

            if (includeSubcategory)
            {
                query = query.Include(x => x.Subcategories);
            }

            if (!String.IsNullOrEmpty(categoryId))
            {
                query = query.Where(x => x.CategoryId == categoryId);
            }

            if (!String.IsNullOrEmpty(search))
            {
                var expression = GetSearchExpression<Category>(search);

                query = query.Where(expression);
            }

            if (isGetOnlyVisible)
            {
                query = query.Where(x => x.IsVisible == true);
            }

            return await query.ToListAsync();
        }

        #endregion Category

        #region Subcategory

        private async Task<IEnumerable<Subcategory>> GetSubcategoriesImpl(string categoryId = null,
                                                                          string subcategoryId = null,
                                                                          string search = null,
                                                                          bool isGetOnlyVisible = false,
                                                                          bool includeProducts = false)
        {
            var query = Context.Subcategory
                .Include(x => x.Photos)
                .AsQueryable();

            if (includeProducts)
            {
                query = query.Include(x => x.Products);
            }

            if (!String.IsNullOrEmpty(categoryId))
            {
                query = query.Where(x => x.CategoryId == categoryId);
            }

            if (!String.IsNullOrEmpty(subcategoryId))
            {
                query = query.Where(x => x.SubcategoryId == subcategoryId);
            }

            if (!String.IsNullOrEmpty(search))
            {
                var expression = GetSearchExpression<Subcategory>(search);

                query = query.Where(expression);
            }

            if (isGetOnlyVisible)
            {
                query = query.Where(x => x.IsVisible == true);
            }

            return await query.ToListAsync();
        }

        #endregion Subcategory

        #region Product

        private async Task<IEnumerable<Product>> GetProductsImpl(string categoryId = null,
                                                                 string productId = null,
                                                                 string subcategoryId = null,
                                                                 string search = null,
                                                                 bool isGetOnlyVisible = false)
        {
            var query = Context.Product.Include(x => x.Photos).AsQueryable();

            if (!String.IsNullOrEmpty(productId))
            {
                query = query.Where(x => x.ProductId == productId);
            }

            if (!String.IsNullOrEmpty(subcategoryId))
            {
                query = query.Where(x => x.SubcategoryId == subcategoryId);
            }

            if (!String.IsNullOrEmpty(categoryId))
            {
                query = query.Where(x => x.CategoryId == categoryId);
            }

            if (!String.IsNullOrEmpty(search))
            {
                var expression = GetSearchExpression<Product>(search);

                query = query.Where(expression);
            }

            if (isGetOnlyVisible)
            {
                query = query.Where(x => x.IsVisible == true);
            }

            return await query.ToListAsync();
        }

        #endregion Product

        #region News

        private async Task<IEnumerable<News>> GetNewsImpl(int? newsId = null,
                                                          string alias = null,
                                                          bool includeDescriptions = true)
        {
            var query = Context.News.AsQueryable();

            if (newsId.HasValue)
            {
                query = query.Where(x => x.NewsId == newsId);
            }

            if (!String.IsNullOrEmpty(alias))
            {
                query = query.Where(x => x.Alias == alias);
            }

            if (!includeDescriptions)
            {
                query = query.Select(x => new News()
                {
                    NewsId = x.NewsId,
                    Title = x.Title,
                    Alias = x.Alias,
                    Date = x.Date,
                    Description = null,
                    Photos = x.Photos,
                });
            }
            else
            {
                query = query.Include(x => x.Photos);
            }

            return await query.ToListAsync();
        }

        #endregion News

        #region General

        private Expression<Func<T, bool>> GetSearchExpression<T>(string search) where T : IAlias
        {
            var searchStrings = search.Split(" ");

            Expression<Func<T, bool>> combineExpressions = x => x.Alias.Contains(searchStrings[0]);

            for (int i = 0; i < searchStrings.Length; i++)
            {
                var str = searchStrings[i];
                if (String.IsNullOrEmpty(str))
                {
                    continue;
                }

                Expression<Func<T, bool>> expr = x => x.Alias.Contains(str);
                combineExpressions = combineExpressions.Or(expr);
            }

            return combineExpressions;
        }

        private async ValueTask<(bool isSuccess, string error, T findedEntity)> AddNewEntityImpl<T>(T entity)
        {
            try
            {
                var values = GetKeyValues(entity);

                var contextEntity = await Context.FindAsync(entity.GetType(), values);

                if (contextEntity != null && contextEntity is T)
                {
                    return (false, __entity_alredy_exists, (T)contextEntity);
                }

                Context.Add(entity);
                await Context.SaveChangesAsync();

                return (true, null, default);
            }
            catch (Exception ex)
            {
                return (false, $"Не удалось сохранить запись, ошибка: {ex.Message}", default);
            }
        }

        private async ValueTask<(bool isSuccess, string error)> UpdateEntityImpl<T>(T entity)
        {
            try
            {
                var values = GetKeyValues(entity);

                var contextEntity = await Context.FindAsync(entity.GetType(), values);

                if (contextEntity == null)
                {
                    return (false, __entity_not_found);
                }

                Context.Update(entity);
                await Context.SaveChangesAsync();

                return (true, null);
            }
            catch (Exception ex)
            {
                return (false, $"Не удалось обновить запись, ошибка: {ex.Message}");
            }
        }

        private object[] GetKeyValues<T>(T entity)
        {
            var keys = Context
                .Model
                .FindEntityType(typeof(T))
                .FindPrimaryKey()
                .Properties
                .Select(x => x.Name)
                .ToList();

            var values = new object[keys.Count];

            for (var i = 0; i < keys.Count; i++)
            {
                var key = keys[i];

                values[i] = entity
                    .GetType()
                    .GetProperty(key)
                    .GetValue(entity);
            }

            return values;
        }

        #endregion
    }
}
