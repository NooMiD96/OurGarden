using DataBase.Abstraction.Model;

using Microsoft.EntityFrameworkCore;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace DataBase.Repository
{
    public partial class OurGardenRepository
    {
        public async Task<IEnumerable<Client>> GetClients()
        {
            return await Context.Clients.ToListAsync();
        }

        public async Task<Client> GetClient(int clientId)
        {
            return await Context.Clients.FirstOrDefaultAsync(x => x.ClientId == clientId);
        }

        public async Task AddClient(Client client)
        {
            var clientEntity = await Context.Clients.FirstOrDefaultAsync(x => x.Email == client.Email);
            if (clientEntity is null)
            {
                Context.Clients.Add(client);
                await Context.SaveChangesAsync();
            }
        }

        public async Task UpdateClient(Client client)
        {
            Context.Update(client);
            await Context.SaveChangesAsync();
        }

        public async Task DeleteClient(int clientId)
        {
            var client = await Context.Clients.FirstOrDefaultAsync(x => x.ClientId == clientId);
            if (client == null)
                return;

            Context.Remove(client);
            await Context.SaveChangesAsync();
        }
    }
}
