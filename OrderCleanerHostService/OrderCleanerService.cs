using DataBase.Abstraction.Model;
using DataBase.Context;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

using OrderCleanerHostService.Abstraction;

using System;
using System.Linq;
using System.Threading.Tasks;

namespace Services.BackgroundWork.OrderCleaner
{
    public class OrderCleanerService : IOrderCleanerService
    {
        const int MonthMaxDiff = 3;

        #region Fields

        readonly ILogger _logger;

        private readonly IServiceProvider _services;

        #endregion

        #region .ctor

        public OrderCleanerService(IServiceProvider services, ILogger<OrderCleanerService> logger)
        {
            _services = services;
            _logger = logger;
        }

        #endregion

        #region IOrderCleanerService Impl

        public async Task DoWork()
        {
            _logger.LogInformation($"OrderCleanerService is working.");

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
                    _logger.LogError(ex, $"OrderCleanerService: {ex.Message}");
                }

            _logger.LogInformation($"OrderCleanerService is worked.");
        }

        #endregion
    }
}
