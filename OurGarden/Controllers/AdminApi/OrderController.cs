using ApiService.Abstraction.DTO.OrderDTO;

using Core.Constants;

using DataBase.Abstraction.Repositories;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using System;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Controllers.AdminApi
{
    [ValidateAntiForgeryToken]
    [Authorize(Roles = UserRoles.Admin + ", " + UserRoles.Employee)]
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : BaseController
    {
        private readonly IOurGardenRepository _repository;
        private readonly ILogger _logger;
        private const string CONTROLLER_LOCATE = "AdminApi.OrderController";

        public OrderController(IOurGardenRepository repository,
                               ILogger<OrderController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAll()
        {
            var orders = await _repository.GetOrders(includeProductInfo: true);
            var statusList = await _repository.GetStatusList();

            return Success(new
            {
                orders = orders.OrderByDescending(x => x.Date).Select(o =>
                {
                    var orderDTO = new OrderAdminDTO()
                    {
                        Date = o.Date,
                        Description = o.Description,
                        Email = o.Email,
                        FIO = o.FIO,
                        OrderId = o.OrderId,
                        Phone = o.Phone,
                        Status = o.Status,
                        StatusId = o.StatusId,
                        TotalPrice = o.TotalPrice,
                        OrderPositions = o.OrderPositions.Select(op => new OrderPositionAdminDTO()
                        {
                            OrderPositionId = op.OrderPositionId,
                            Number = op.Number,
                            Price = op.Price,
                            OldProductAlias = op.Name,
                            OrderId = o.OrderId,
                            ProductAlias = op.Product.Alias,
                            ProductId = op.Product.ProductId,
                            SubcategoryAlias = op.Product.Subcategory.Alias,
                            SubcategoryId = op.Product.Subcategory.SubcategoryId,
                            CategoryAlias = op.Product.Subcategory.Category.Alias,
                            CategoryId = op.Product.Subcategory.Category.CategoryId,
                        })
                    };

                    return orderDTO;
                }),
                statusList
            });
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> Get([FromQuery]int orderId)
        {
            const string API_LOCATE = CONTROLLER_LOCATE + ".Get";

            var order = await _repository.GetOrder(orderId);

            if (order is null)
            {
                return LogBadRequest(
                    _logger,
                    API_LOCATE,
                    customError: $"Что-то пошло не так, не удалось найти заказ.\n\tНомер заказа: {orderId}"
                );
            }

            return Success(order);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Update([FromBody]OrderUpdateDTO orderDTO)
        {
            const string API_LOCATE = CONTROLLER_LOCATE + ".Update";

            try
            {
                var order = await _repository.GetOrder(orderDTO.OrderId);

                if (order is null)
                {
                    return LogBadRequest(
                        _logger,
                        API_LOCATE,
                        customError: $"Что-то пошло не так, не удалось найти заказ.\n\tНомер заказа: {orderDTO.OrderId}"
                    );
                }

                var status = await _repository.GetStatus(orderDTO.StatusId);
                if (status is null)
                {
                    return LogBadRequest(
                        _logger,
                        API_LOCATE,
                        customError: $"Что-то пошло не так, не удалось найти данный статус заказа.\n\tНомер статуса: {orderDTO.StatusId}"
                    );
                }

                order.Status = status;
                order.Description = orderDTO.Description;

                await _repository.UpdateOrder(order);

                return Success(true);
            }
            catch (Exception ex)
            {
                return LogBadRequest(
                    _logger,
                    API_LOCATE,
                    exception: ex
                );
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Delete([FromQuery]int orderId)
        {
            await _repository.DeleteOrder(orderId);
            return Success(true);
        }
    }
}