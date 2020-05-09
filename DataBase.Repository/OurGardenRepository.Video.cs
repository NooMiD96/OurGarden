using DataBase.Abstraction.Model;

using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DataBase.Repository
{
    public partial class OurGardenRepository
    {
        public async Task<IEnumerable<Video>> GetVideo() =>
           await Context.Video
           .ToListAsync();

        public async Task<Video> GetVideo(int videoId) =>
            await Context.Video
            .FirstOrDefaultAsync(x => x.VideoId == videoId);

        public async Task AddVideo(Video video)
        {
            var chek = await Context.Video.FirstOrDefaultAsync(x => x.VideoId == video.VideoId);
            if (chek != null)
            {
                throw new Exception();
            }
            await Context.Video.AddAsync(video);
            await Context.SaveChangesAsync();
        }

        public async Task UpdateVideo(Video video)
        {
            Context.Video.Update(video);
            await Context.SaveChangesAsync();
        }

        public async Task DeleteVideo(int videoId)
        {
            var video = await Context.Video.FirstOrDefaultAsync(x => x.VideoId == videoId);
            if (video == null)
                return;
            Context.Video.Remove(video);
            await Context.SaveChangesAsync();
        }
    }
}
