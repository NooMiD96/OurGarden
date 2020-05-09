using DataBase.Abstraction.Model;

using Microsoft.EntityFrameworkCore;

using System;
using System.Threading.Tasks;

namespace DataBase.Repository
{
    public partial class OurGardenRepository
    {
        public async Task AddFile(Photo photo)
        {
            Context.Photo.Add(photo);

            await Context.SaveChangesAsync();
        }

        public async ValueTask<bool> DeleteFile(Guid photoId, bool updateDB = true)
        {
            var photo = await Context.Photo.FirstOrDefaultAsync(x => x.PhotoId == photoId);
            if (photo == null)
                return false;

            Context.Photo.Remove(photo);

            if (updateDB)
                await Context.SaveChangesAsync();

            return true;
        }
    }
}
