using Database.Contexts;
using Database.Repositories;

using Microsoft.EntityFrameworkCore;

using Model.DB;
using Model.DTO.Order;

using Services.EMail;

using System;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Services.Controllers.AdminApi
{
    public class OrderControllerService
    {
        private readonly OurGardenRepository _repository;
        private readonly OurGardenContext _context;
        private readonly IEmailSender _emailSender;

        public OrderControllerService(IOurGardenRepository repository,
                                      IEmailSender emailSender)
        {
            _repository = repository as OurGardenRepository;
            _context = _repository._context;
            _emailSender = emailSender;
        }

        public async ValueTask<(bool isSuccess, string error)> AddOrder(OrderCreateDTO orderDTO)
        {
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
                        Phone = orderDTO.Phone
                    };

                    await _repository.AddOrder(order);
                    await _repository.AddClient(client);

                    order.OrderPositions = orderDTO.OrderPositions.Select(x =>
                            new OrderPosition()
                            {
                                OrderPositionId = 0,

                                Number = x.Number,
                                Price = 0,

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
                catch (Exception)
                {
                    transaction.Rollback();

                    return (false, "Ошибка при обнавлении категории. Возможно подкатегория или товар с такой категорией уже существуют");
                }
        }
    }
}
