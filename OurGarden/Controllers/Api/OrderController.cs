using ApiService.Abstraction.Api;
using ApiService.Abstraction.DTO.OrderDTO;

using Microsoft.AspNetCore.Mvc;

using System.Threading.Tasks;

namespace Web.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : BaseController
    {
        private readonly IOrderControllerService _service;

        public OrderController(IOrderControllerService service)
        {
            _service = service;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddOrder([FromBody]OrderCreateDTO orderDTO)
        {
            var execResult = await _service.AddOrder(orderDTO);

            if (execResult.IsSuccess)
                return Success(execResult.Result);
            else
                return BadRequest(execResult.Error, execResult.Result);
        }
    }
}
