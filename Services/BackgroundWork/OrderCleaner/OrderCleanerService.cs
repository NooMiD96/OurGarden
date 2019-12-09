using Database.Contexts;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

using Model.DB;

using System;
using System.Linq;
using System.Threading.Tasks;

namespace Services.BackgroundWork.OrderCleaner
{
    public class OrderCleanerService : IOrderCleanerService
    {
        const int MonthMaxDiff = 3;
        readonly ILogger _logger;
        private readonly IServiceProvider _services;

        public OrderCleanerService(IServiceProvider services, ILogger<OrderCleanerService> logger)
        {
            _services = services;
            _logger = logger;
        }

        public async Task DoWork()
        {
            _logger.LogInformation($"OrderCleanerService is working. {DateTime.UtcNow}");

            using (var scope = _services.CreateScope())
                try
                {
                    var context = scope.ServiceProvider.GetRequiredService<OurGardenContext>();

                    var now = DateTime.Now;

                    var expiredOrders = context.Order
                        .Where(
                            x => EF.Functions.DateDiffMonth(x.Date, now) >= MonthMaxDiff
                                && (x.StatusId == (int)OrderStatusEnum.Closed || x.StatusId == (int)OrderStatusEnum.Canceled)
                        );

                    context.RemoveRange(expiredOrders);

                    await context.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    // TODO: Send email
                    _logger.LogError($"OrderCleanerService: {ex.Message}\n{ex.StackTrace}\n{ex.InnerException}");
                }

            _logger.LogInformation($"OrderCleanerService is worked. {DateTime.UtcNow}");
        }
    }
}
