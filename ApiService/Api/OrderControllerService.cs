using ApiService.Abstraction.Api;
using ApiService.Abstraction.Core;
using ApiService.Abstraction.DTO.OrderDTO;
using ApiService.Abstraction.Model;

using Core.Helpers;

using DataBase.Abstraction.Model;
using DataBase.Abstraction.Repositories;
using DataBase.Context;
using DataBase.Repository;

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

        private readonly IEmailService _emailService;

        private readonly ILogger _logger;

        #endregion

        #region .ctor

        public OrderControllerService(IOurGardenRepository repository,
                                      IEmailService emailService,
                                      ILogger<OrderControllerService> logger)
        {
            _repository = repository;
            _context = (repository as OurGardenRepository).Context;
            _emailService = emailService;
            _logger = logger;
        }

        #endregion

        /// <inheritdoc/>
        public async Task<ServiceExecuteResult<int>> AddOrder(OrderCreateDTO orderDTO)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();

            var orderId = -1;
            try
            {
                /// Создаём рыбу модели заказа
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

                /// Прокидываем связь в позиции заказа
                /// с настоящим товаром
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

                /// Подгружаем товары, которые мы связали на прошлом шагу
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

                var msg = $"Не удалось создать заказ по след. причине: {ex.Message}";
                _logger.LogError(ex, $"{msg}. Модель запроса:\n{JsonHelper.Serialize(orderDTO)}");

                return new ServiceExecuteResult<int>
                {
                    IsSuccess = false,
                    Error = msg,
                    Result = 0
                };
            }

            try
            {
                if (orderId <= 0)
                {
                    throw new Exception($"Отсутствует номер заказа.");
                }

                await _emailService.SendOrderInformation(orderId);
            }
            catch (Exception ex)
            {
                var msg = $"Не удалось отправить письмо на почту по след. причине: {ex.Message}";
                _logger.LogError(ex, msg);

                return new ServiceExecuteResult<int>
                {
                    IsSuccess = false,
                    Error = msg,
                    Result = orderId != -1 ? orderId : 0
                };
            }

            return new ServiceExecuteResult<int>
            {
                IsSuccess = true,
                Result = orderId,
            };
        }
    }
}
