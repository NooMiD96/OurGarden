using DataBase.Abstraction.Model;

using Microsoft.EntityFrameworkCore;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataBase.Repository
{
    public partial class OurGardenRepository
    {
        public async Task<IEnumerable<Order>> GetOrders(bool includeProductInfo = false)
        {
            var query = Context.Order
                .Include(x => x.OrderPositions)
                .Include(x => x.Status)
                .AsQueryable();

            if (includeProductInfo)
            {
                query = query
                    .Include(x => x.OrderPositions)
                        .ThenInclude(x => x.Product)
                            .ThenInclude(x => x.Subcategory)
                                .ThenInclude(x => x.Category);
            }

            return await query.ToListAsync();
        }

        public async Task<Order> GetOrder(int orderId, bool includeProductInfo = false)
        {
            var query = Context.Order
                .Include(x => x.OrderPositions)
                .Include(x => x.Status)
                .AsQueryable();

            if (includeProductInfo)
            {
                query = query
                    .Include(x => x.OrderPositions)
                        .ThenInclude(x => x.Product)
                            .ThenInclude(x => x.Subcategory)
                                .ThenInclude(x => x.Category);
            }

            var order = await query.FirstOrDefaultAsync(x => x.OrderId == orderId);

            return order;
        }

        public async Task AddOrder(Order order)
        {
            Context.Order.Add(order);
            await Context.SaveChangesAsync();
        }

        public async Task UpdateOrder(Order order)
        {
            Context.Order.Update(order);
            await Context.SaveChangesAsync();
        }

        public async Task DeleteOrder(int orderId)
        {
            var order = await Context.Order
                .Include(x => x.OrderPositions)
                .Include(x => x.Status)
                .FirstOrDefaultAsync(x => x.OrderId == orderId);
            if (order == null)
                return;
            Context.Order.Remove(order);

            await Context.SaveChangesAsync();
        }

        public async Task<OrderStatus> GetStatus(int statusId) =>
            await Context.Status.FirstOrDefaultAsync(x => x.StatusId == statusId);
        public async Task<IEnumerable<OrderStatus>> GetStatusList() =>
            await Context.Status.ToListAsync();
    }
}
