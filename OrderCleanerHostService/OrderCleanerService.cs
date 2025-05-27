using DataBase.Abstraction.Model;
using DataBase.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Model;
using OrderCleanerHostService.Abstraction;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace OrderCleanerHostService;

public class OrderCleanerService : IOrderCleanerService
{
    #region Consts

    const string HostServiceName = "OrderCleanerService";
    const string HostServiceWorkStart = HostServiceName + " is start working.";
    const string HostServiceWorkEnd = HostServiceName + " is work done.";

    #endregion

    #region Fields

    /// <summary>
    /// Логгер
    /// </summary>
    private readonly ILogger _logger;

    /// <summary>
    /// Настройка клеанера
    /// </summary>
    private readonly OrderCleanerOptions _cleanerOptions;

    /// <summary>
    /// Сервис провайдер
    /// </summary>
    private readonly IServiceProvider _services;

    #endregion

    #region .ctor

    public OrderCleanerService(ILogger<OrderCleanerService> logger,
        IOptions<OrderCleanerOptions> orderCleanerOptions,
        IServiceProvider services)
    {
        _logger = logger;
        _cleanerOptions = orderCleanerOptions.Value;
        _services = services;
    }

    #endregion

    #region IOrderCleanerService Impl

    public async Task DoWork()
    {
        _logger.LogInformation(HostServiceWorkStart);

        try
        {
            using var scope = _services.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<OurGardenContext>();

            var now = DateTime.Now;

            var closedOrders = await context.Order
                .Where(
                    x => x.StatusId == (int)OrderStatusEnum.Closed || x.StatusId == (int)OrderStatusEnum.Canceled
                    //EF.Functions.DateDiffMonth(x.Date, now) >= _cleanerOptions.MonthMaxDiff
                )
                .ToListAsync();

            var expiredOrders = closedOrders.Where(x => (now - x.Date).Days >= _cleanerOptions.MonthMaxDiff * 30);

            context.RemoveRange(expiredOrders);

            await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "OrderCleanerService error: {message}", ex.Message);
        }

        _logger.LogInformation(HostServiceWorkEnd);
    }

    #endregion
}
