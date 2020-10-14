using DataBase.Abstraction.Model;

using Microsoft.EntityFrameworkCore;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace DataBase.Repository
{
    public partial class OurGardenRepository
    {
        public async Task<PageInfo> GetPageInfo(int pageInfoId) => await Context.PageInfo.FirstOrDefaultAsync(x => x.PageInfoId == pageInfoId);

        public async Task<IEnumerable<PageInfo>> GetPageInfos() => await Context.PageInfo.ToListAsync();

        public async Task AddPageInfo(PageInfo pageInfo)
        {
            Context.PageInfo.Add(pageInfo);
            await Context.SaveChangesAsync();
        }

        public async Task UpdatePageInfo(PageInfo pageInfo)
        {
            Context.PageInfo.Update(pageInfo);
            await Context.SaveChangesAsync();
        }
    }
}
