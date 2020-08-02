using Core.Helpers;

using DataBase.Abstraction.Model;

using Microsoft.EntityFrameworkCore;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace DataBase.Repository
{
    public partial class OurGardenRepository
    {
        public async Task<IEnumerable<Gallery>> GetGalleries() =>
            await Context.Gallery
                .Include(x => x.Photos)
                .ToListAsync();

        public async Task<Gallery> GetGallery(int galleryId) =>
            await Context.Gallery
                .Include(x => x.Photos)
                .FirstOrDefaultAsync(x => x.GalleryId == galleryId);

        public async Task<Gallery> GetGallery(string galleryName)
        {
            var normilazyName = galleryName.TransformToId();

            return await Context.Gallery
                .Include(x => x.Photos)
                .FirstOrDefaultAsync(x => x.NormalizeAlias == normilazyName);
        }

        public async ValueTask<(bool isSuccess, string error)> AddGallery(Gallery gallery)
        {
            var entity = await Context
                .Gallery
                .FirstOrDefaultAsync(x => x.GalleryId == gallery.GalleryId || x.Alias == gallery.Alias);

            if (entity != null)
                return (false, "Галерея с таким наименованием уже существует");

            Context.Add(gallery);
            await Context.SaveChangesAsync();

            return (true, null);
        }

        public async ValueTask<(bool isSuccess, string error)> UpdateGallery(Gallery gallery)
        {
            Context.Update(gallery);
            await Context.SaveChangesAsync();

            return (true, null);
        }

        public async Task DeleteGallery(int galleryId)
        {
            var gallery = await Context.Gallery
                .Include(x => x.Photos)
                .FirstOrDefaultAsync(x => x.GalleryId == galleryId);

            if (gallery == null)
                return;

            Context.Remove(gallery);

            await Context.SaveChangesAsync();
        }
    }
}
