using Database.Repositories;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using Model.DTO.Order;

using Services.EMail;

using System.Threading.Tasks;

using Web.Services.Controllers.Api;

namespace Web.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : BaseController
    {
        private readonly OrderControllerService _service;

        public OrderController([FromServices] IOurGardenRepository repository,
                               [FromServices] IEmailSender emailSender,
                               ILogger<OrderController> logger)
        {
            _service = new OrderControllerService(repository, emailSender, logger);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddOrder([FromBody]OrderCreateDTO orderDTO)
        {
            var (isSuccess, error) = await _service.AddOrder(orderDTO);

            if (isSuccess)
                return Success(true);
            else
                return BadRequest(error);
        }
    }
}
