using DataBase.Abstraction;
using DataBase.Abstraction.Repositories;
using DataBase.Context;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataBase.Repository
{
    public partial class OurGardenRepository : IOurGardenRepository
    {
        public readonly OurGardenContext Context;

        public OurGardenRepository(OurGardenContext context)
        {
            Context = context;
        }

        /// <inheritdoc/>
        public async Task LoadPhotoCollection<T>(T model) where T : IPhoto
        {
            await Context.Entry(model)
                .Collection("Photos")
                .LoadAsync();
        }

        /// <inheritdoc/>
        public async Task LoadPhotoCollection<T>(IEnumerable<T> modelList) where T : IPhoto
        {
            for (int i = 0; i < modelList.Count(); i++)
            {
                var model = modelList.ElementAt(i);

                await LoadPhotoCollection(model);
            }
        }

        /// <inheritdoc/>
        public Task<int> SaveChangesAsync()
        {
            return Context.SaveChangesAsync();
        }
    }
}
