using ApiService.Abstraction.DTO.OrderDTO;

using DataBase.Abstraction.Repositories;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

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

        public OrderController(IOurGardenRepository repository,
                               IEmailSender emailSender,
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
