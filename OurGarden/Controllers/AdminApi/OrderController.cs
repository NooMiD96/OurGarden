using Core.Constants;

using Database.Repositories;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Model.DB;

using System;
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
            return Success(orders);
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

        [HttpPut("[action]")]
        public async Task<IActionResult> Update(
            [FromQuery]int orderId,
            [FromQuery]int statusId,
            [FromQuery]string description)
        {
            try
            {
                var order = await _repository.GetOrder(orderId);
                if (order == null)
                {
                    return NotFound();
                }

                var status = await _repository.GetStatus(statusId);
                if (status == null)
                {
                    return NotFound();
                }
                order.Status = status;
                order.Description = description;

                await _repository.UpdateOrder(order);

                return Success(true);
            }
            catch (Exception)
            {
                return BadRequest("Что-то пошло не так, повторите попытку");
            }
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> Delete(
            [FromQuery]int orderId)
        {
            await _repository.DeleteNews(orderId);
            return Success(true);
        }
    }
}