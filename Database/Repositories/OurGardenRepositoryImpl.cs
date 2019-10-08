﻿using Microsoft.EntityFrameworkCore;

using Model.DB;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Database.Repositories
{
    public partial class OurGardenRepository : IOurGardenRepository
    {
        private const string __entity_alredy_exists = "Запись с такими ключевыми параметрами уже существует.";
        private const string __entity_not_found = "Запись с такими ключевыми параметрами не найдена.";

        #region Category

        private async Task<IEnumerable<Category>> GetCategoryImpl(string categoryId = null,
                                                                  bool isGetOnlyVisible = false)
        {
            var query = _context.Category.Include(x => x.Photo).AsQueryable();

            if (!String.IsNullOrEmpty(categoryId))
            {
                query = query.Where(x => x.CategoryId == categoryId);
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
                                                                          bool isGetOnlyVisible = false)
        {
            var query = _context.Subcategory
                .Include(x => x.Photo)
                .AsQueryable();

            if (!String.IsNullOrEmpty(categoryId))
            {
                query = query.Where(x => x.CategoryId == categoryId);
            }

            if (!String.IsNullOrEmpty(subcategoryId))
            {
                query = query.Where(x => x.SubcategoryId == subcategoryId);
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
            var query = _context.Product.Include(x => x.Photos).AsQueryable();

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
                query = query.Where(x => x.Alias.Contains(search));
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
            var query = _context.News.Include(x => x.Photo).AsQueryable();

            if (!newsId.HasValue)
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
                    Photo = x.Photo,
                });
            }

            return await query.ToListAsync();
        }

        #endregion News

        #region General

        private async ValueTask<(bool isSuccess, string error)> AddNewEntityImpl<T>(T entity)
        {
            try
            {
                var values = GetKeyValues(entity);

                var contextEntity = await _context.FindAsync(entity.GetType(), values);

                if (contextEntity != null)
                {
                    return (false, __entity_alredy_exists);
                }

                _context.Add(entity);
                await _context.SaveChangesAsync();

                return (true, null);
            }
            catch (Exception ex)
            {
                return (false, $"Не удалось сохранить запись, ошибка: {ex.Message}");
            }
        }

        private async ValueTask<(bool isSuccess, string error)> UpdateEntityImpl<T>(T entity)
        {
            try
            {
                var values = GetKeyValues(entity);

                var contextEntity = await _context.FindAsync(entity.GetType(), values);

                if (contextEntity == null)
                {
                    return (false, __entity_not_found);
                }

                _context.Update(entity);
                await _context.SaveChangesAsync();

                return (true, null);
            }
            catch (Exception ex)
            {
                return (false, $"Не удалось обновить запись, ошибка: {ex.Message}");
            }
        }

        private object[] GetKeyValues<T>(T entity)
        {
            var keys = _context
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
