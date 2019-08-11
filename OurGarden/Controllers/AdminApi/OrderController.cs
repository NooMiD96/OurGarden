using Core.Constants;

using Database.Repositories;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Model.DB;
using Model.DTO.Order;

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
        public readonly IOurGardenRepository _repository;
        public OrderController(IOurGardenRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAll()
        {
            var orders = await _repository.GetOrders();
            var statusList = await _repository.GetStatusList();

            return Success(new
            {
                orders = orders.OrderByDescending(x => x.Date).Select(x =>
                {
                    foreach (var orderPos in x.OrderPositions)
                        orderPos.Order = null;

                    return x;
                }),
                statusList
            });
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> Get(
            [FromQuery]int orderId)
        {
            var order = await _repository.GetOrder(orderId);

            if (order == null)
                return BadRequest("Что-то пошло не так, повторите попытку");

            return Success(order);
        }        

        [HttpPost("[action]")]
        public async Task<IActionResult> Update([FromBody]OrderUpdateDTO orderDTO)
        {
            try
            {
                var order = await _repository.GetOrder(orderDTO.OrderId);
                if (order == null)
                {
                    return BadRequest("Не удалось найти заказ, повторите попытку.");
                }

                var status = await _repository.GetStatus(orderDTO.StatusId);
                if (status == null)
                {
                    return BadRequest("Не удалось найти данный статус заказа, повторите попытку.");
                }
                order.Status = status;
                order.Description = orderDTO.Description;

                await _repository.UpdateOrder(order);

                return Success(true);
            }
            catch (Exception)
            {
                return BadRequest("Что-то пошло не так, повторите попытку");
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