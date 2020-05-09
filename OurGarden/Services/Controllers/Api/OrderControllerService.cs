using ApiService.Abstraction.DTO.OrderDTO;

using Core.Helpers;

using DataBase.Abstraction.Model;
using DataBase.Abstraction.Repositories;
using DataBase.Context;
using DataBase.Repository;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

using Services.EMail;

using System;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Services.Controllers.Api
{
    public class OrderControllerService
    {
        private readonly OurGardenRepository _repository;
        private readonly OurGardenContext _context;
        private readonly IEmailSender _emailSender;
        private readonly ILogger _logger;
        private const string CONTROLLER_LOCATE = "Api.OrderController.Service";

        public OrderControllerService(IOurGardenRepository repository,
                                      IEmailSender emailSender,
                                      ILogger logger)
        {
            _repository = repository as OurGardenRepository;
            _context = _repository.Context;
            _emailSender = emailSender;
            _logger = logger;
        }

        public async ValueTask<(bool isSuccess, string error)> AddOrder(OrderCreateDTO orderDTO)
        {
            const string API_LOCATE = CONTROLLER_LOCATE + ".AddOrder";

            using (var transaction = await _context.Database.BeginTransactionAsync())
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

                    var task = new Task(async () =>
                    {
                        await _emailSender.SendOrderInformation(order.OrderId);
                    });
                    task.Start(TaskScheduler.Default);

                    transaction.Commit();
                    return (true, null);
                }
                catch (Exception ex)
                {
                    transaction.Rollback();

                    _logger.LogError(ex, $"{DateTime.Now}:\n\t{API_LOCATE}\n\tmes: Не удалось создать заказ, DTO: {JsonHelper.Serialize(orderDTO)}\n\terr: {ex.Message}\n\t{ex.StackTrace}");
                    return (false, "Не удалось создать заказ!");
                }
        }
    }
}
