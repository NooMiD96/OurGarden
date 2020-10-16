using Core.Helpers;

using DataBase.Abstraction.Model;

using Microsoft.EntityFrameworkCore;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace DataBase.Repository
{
    public partial class OurGardenRepository
    {
        public async Task<PageInfo> GetPageInfo(int pageInfoId) => await Context.PageInfo.FirstOrDefaultAsync(x => x.PageInfoId == pageInfoId);

        public async Task<PageInfo> GetPageInfo(string pageInfoAlias)
        {
            var normalizeName = pageInfoAlias.TransformToId();

            return await Context.PageInfo
                .Include(x => x.Photos)
                .FirstOrDefaultAsync(x => x.NormalizeAlias == normalizeName);
        }

        public async Task<IEnumerable<PageInfo>> GetPageInfos() => await Context.PageInfo.ToListAsync();

        public async ValueTask<(bool isSuccess, string error)> AddPageInfo(PageInfo entity)
        {
            var searchEntity = Context.PageInfo.FirstOrDefaultAsync(x => x.PageInfoId == entity.PageInfoId);
            if (!(searchEntity is null))
            {
                return (false, "Данная страница уже существует");
            }

            var normalizeName = entity.Alias.TransformToId();
            searchEntity = Context.PageInfo.FirstOrDefaultAsync(x => x.NormalizeAlias == normalizeName);
            if (!(searchEntity is null))
            {
                return (false, "Страница с данным именем уже существует");
            }

            Context.PageInfo.Add(entity);
            await Context.SaveChangesAsync();

            return (true, default);
        }

        public async ValueTask<(bool isSuccess, string error)> UpdatePageInfo(PageInfo entity)
        {
            var result = await UpdateEntityImpl(entity);

            return result;
        }

        public async Task DeletePageInfo(int pageInfoId)
        {
            var entity = await Context.PageInfo.FirstOrDefaultAsync(x => x.PageInfoId == pageInfoId);
            if (entity == null)
                return;

            await DeletePageInfo(entity);
        }

        public async Task DeletePageInfo(PageInfo pageInfo)
        {
            Context.PageInfo.Remove(pageInfo);
            await Context.SaveChangesAsync();
        }
    }
}
