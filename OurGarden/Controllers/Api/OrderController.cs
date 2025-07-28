using ApiService.Abstraction.Api;
using ApiService.Abstraction.DTO.OrderDTO;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Web.Services;

namespace Web.Controllers.Api;

[Route("api/[controller]")]
[ApiController]
public class OrderController(IOrderControllerService service) : BaseController
{
    [HttpPost("[action]")]
    public async Task<IActionResult> AddOrder([FromBody]OrderCreateDTO orderDTO)
    {
        var execResult = await service.AddOrder(orderDTO);

        if (execResult.IsSuccess)
            return Success(execResult.Result);
        else
            return BadRequest(execResult.Error, execResult.Result);
    }
}
