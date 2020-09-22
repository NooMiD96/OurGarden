using ApiService.Abstraction.Api;
using ApiService.Abstraction.DTO.OrderDTO;

using Core.Helpers;

using DataBase.Abstraction.Model;
using DataBase.Abstraction.Repositories;
using DataBase.Context;
using DataBase.Repository;

using EmailService.Abstraction;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

using System;
using System.Linq;
using System.Threading.Tasks;

namespace ApiService.Api
{
    /// <summary>
    /// Избавиться от <see cref="OurGardenContext"/>
    /// </summary>
    public class OrderControllerService : IOrderControllerService
    {
        #region Fields

        private readonly IOurGardenRepository _repository;

        private readonly OurGardenContext _context;

        private readonly IEmailSender _emailSender;

        private readonly ILogger _logger;

        #endregion

        #region .ctor

        public OrderControllerService(IOurGardenRepository repository,
                                      IEmailSender emailSender,
                                      ILogger<OrderControllerService> logger)
        {
            _repository = repository;
            _context = (repository as OurGardenRepository).Context;
            _emailSender = emailSender;
            _logger = logger;
        }

        #endregion

        /// <inheritdoc/>
        public async ValueTask<(bool isSuccess, string error)> AddOrder(OrderCreateDTO orderDTO)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();

            var orderId = -1;
            try
            {
                var order = new Order()
                {
                    OrderId = 0,
                    FIO = orderDTO.FIO,
                    Phone = orderDTO.Phone,
                    Email = orderDTO.Email,
                    Date = DateTime.Now,
                    StatusId = (int)OrderStatusEnum.New,
                    TotalPrice = 0
                };

                var client = new Client()
                {
                    Email = orderDTO.Email,
                    FIO = orderDTO.FIO,
                    Phone = orderDTO.Phone,
                    IsIncludeInMailing = true
                };

                await _repository.AddOrder(order);
                await _repository.AddClient(client);

                order.OrderPositions = orderDTO.OrderPositions.Select(x =>
                    new OrderPosition()
                    {
                        OrderPositionId = 0,

                        Number = x.Number,
                        Price = 0,
                        Name = "",

                        OrderId = order.OrderId,

                        CategoryId = x.Product.CategoryId,
                        SubcategoryId = x.Product.SubcategoryId,
                        ProductId = x.Product.ProductId
                    })
                    .ToList();

                await _repository.UpdateOrder(order);

                await _context.Entry(order)
                    .Collection(x => x.OrderPositions)
                    .Query()
                    .Include(x => x.Product)
                    .LoadAsync();

                foreach (var orderPos in order.OrderPositions)
                {
                    orderPos.Price = orderPos.Product.Price;
                    orderPos.Name = orderPos.Product.Alias;
                }

                order.TotalPrice = order.OrderPositions.Select(x => x.Number * x.Price).Sum();

                await _repository.UpdateOrder(order);

                orderId = order.OrderId;

                transaction.Commit();
            }
            catch (Exception ex)
            {
                transaction.Rollback();

                _logger.LogError(ex, $"Не удалось создать заказ, DTO: {JsonHelper.Serialize(orderDTO)}");
                return (false, "Не удалось создать заказ!");
            }

            try
            {
                if (orderId <= 0)
                {
                    throw new Exception($"Отсутствует номер заказа.");
                }
                var task = _emailSender.SendOrderInformation(orderId);
                task.Start(TaskScheduler.Default);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Не удалось оповестить покупателя.");
            }

            return (true, null);
        }
    }
}
