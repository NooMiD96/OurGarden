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
        private const string __news_alredy_exist = "Не удалось {0} новость с заданным заголовком \"{1}\" поскольку уже существует новость с наименованием \"{2}\".";

        public async Task<IEnumerable<News>> GetNews(bool includeDescriptions = true) =>
            await GetNewsImpl(includeDescriptions: includeDescriptions);

        public async Task<News> GetNews(int newsId) =>
            (
                await GetNewsImpl(newsId: newsId)
            )
            .FirstOrDefault();

        public async Task<News> GetNews(string alias, bool includeDescriptions = true) =>
            (
                await GetNewsImpl(alias: alias, includeDescriptions: includeDescriptions)
            )
            .FirstOrDefault();

        public async Task<IEnumerable<IBreadcrumb>> GetNewsBreadcrumb(string alias)
        {
            alias = alias.TransformToId();

            var result = new List<IBreadcrumb>();

            var news = await Context.News
                .Select(x => new
                {
                    x.Alias,
                    x.Title,
                })
                .FirstOrDefaultAsync(x => x.Alias == alias);

            if (news is null)
                return result;

            result.Add(new Breadcrumb()
            {
                DisplayName = news.Title,
                Url = $"News/{news.Alias}",
            });

            return result;
        }

        public async Task<bool> CheckNewsAlias(string alias) =>
            await Context.News.AnyAsync(x => x.Alias == alias);

        public async ValueTask<(bool isSuccess, string error)> AddNews(News news)
        {
            const string crudName = "добавить";

            (bool isSuccess, string error, News findedEntity) = (true, default, default);

            findedEntity = await Context.News.FirstOrDefaultAsync(x => x.Alias == news.Alias);
            if (findedEntity != null)
            {
                isSuccess = false;
                error = __entity_alredy_exists;
            }

            if (isSuccess)
            {
                (isSuccess, error, findedEntity) = await AddNewEntityImpl(news);
            }

            if (!isSuccess && error == __entity_alredy_exists)
            {
                error = String.Format(
                    __news_alredy_exist,
                    crudName,
                    news.Title,
                    findedEntity.Title
                );
            }

            return (isSuccess, error);
        }

        public async ValueTask<(bool isSuccess, string error)> UpdateNews(News news)
        {
            var result = await UpdateEntityImpl(news);
            return result;
        }

        public async Task DeleteNews(int newsId)
        {
            var news = await Context.News.FirstOrDefaultAsync(x => x.NewsId == newsId);
            if (news == null)
                return;
            Context.News.Remove(news);
            await Context.SaveChangesAsync();
        }

        public async ValueTask<bool> DeleteNews(News news)
        {
            Context.News.Remove(news);

            await Context.SaveChangesAsync();

            return true;
        }
    }
}
