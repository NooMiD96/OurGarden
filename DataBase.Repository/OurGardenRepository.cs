using DataBase.Abstraction.Repositories;
using DataBase.Context;

namespace DataBase.Repository
{
    public partial class OurGardenRepository : IOurGardenRepository
    {
        public readonly OurGardenContext Context;

        public OurGardenRepository(OurGardenContext context)
        {
            Context = context;
        }
    }
}
