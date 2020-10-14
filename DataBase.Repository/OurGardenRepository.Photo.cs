using Microsoft.EntityFrameworkCore;

using PhotoService.Abstraction.Model;

using System;
using System.Threading.Tasks;

namespace DataBase.Repository
{
    public partial class OurGardenRepository
    {
        /// <inheritdoc/>
        /// <seealso cref="IPhotoSaverRepository"/>
        public async Task AddPhoto(Photo photo, bool updateDB = true)
        {
            Context.Photo.Add(photo);

            if (updateDB)
            {
                await Context.SaveChangesAsync();
            }
        }

        /// <inheritdoc/>
        /// <seealso cref="IPhotoSaverRepository"/>
        public async ValueTask<bool> RemovePhoto(Guid photoId, bool updateDB = true)
        {
            var photo = await Context.Photo.FirstOrDefaultAsync(x => x.PhotoId == photoId);
            if (photo == null)
                return false;

            Context.Photo.Remove(photo);

            if (updateDB)
            {
                await Context.SaveChangesAsync();
            }

            return true;
        }
    }
}
