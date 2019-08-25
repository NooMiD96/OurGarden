using Database.Repositories;

using Microsoft.AspNetCore.Mvc;

using Model.DTO.Order;

using Services.EMail;

using System.Threading.Tasks;

using Web.Services.Controllers.AdminApi;

namespace Web.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : BaseController
    {
        private readonly IOurGardenRepository _repository;
        private readonly IEmailSender _emailSender;
        private readonly OrderControllerService _service;

        public OrderController([FromServices] IOurGardenRepository repository,
                               [FromServices] IEmailSender emailSender)
        {
            _repository = repository;
            _emailSender = emailSender;
            _service = new OrderControllerService(_repository, _emailSender);
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
