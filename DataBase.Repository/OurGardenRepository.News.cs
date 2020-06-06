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
        private const string __news_alredy_exist = "Не удалось {0} новость с заданным заголовком \"{1}\" поскольку уже существует новость с заголовком \"{2}\".";

        public async Task<IEnumerable<News>> GetNews(bool includeDescriptions = true) =>
            await GetNewsImpl(includeDescriptions: includeDescriptions);

        public async Task<News> GetNews(string newsId, bool includeDescriptions = true) =>
            (
                await GetNewsImpl(newsId: newsId, includeDescriptions: includeDescriptions)
            )
            .FirstOrDefault();

        public async Task<IEnumerable<IBreadcrumb>> GetNewsBreadcrumb(string newsId)
        {
            var result = new List<IBreadcrumb>();

            var news = await Context.News
                .Select(x => new
                {
                    x.NewsId,
                    x.Alias,
                })
                .FirstOrDefaultAsync(x => x.NewsId == newsId);

            if (news is null)
                return result;

            result.Add(new Breadcrumb()
            {
                DisplayName = news.Alias,
                Url = $"News/{news.NewsId}",
            });

            return result;
        }

        public async ValueTask<(bool isSuccess, string error)> AddNews(News news)
        {
            const string crudName = "добавить";

            var (isSuccess, error, findedEntity) = await AddNewEntityImpl(news);
            if (!isSuccess && error == __entity_alredy_exists)
            {
                error = String.Format(
                    __news_alredy_exist,
                    crudName,
                    news.Alias,
                    findedEntity.Alias
                );
            }

            return (isSuccess, error);
        }

        public async ValueTask<(bool isSuccess, string error)> UpdateNews(News news)
        {
            var result = await UpdateEntityImpl(news);
            return result;
        }

        public async Task DeleteNews(string newsId)
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
