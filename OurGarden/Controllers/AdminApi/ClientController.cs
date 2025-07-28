using Core.Constants;
using DataBase.Abstraction.Model;
using DataBase.Abstraction.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using Web.Services;

namespace Web.Controllers.AdminApi;

[Route("apiAdmin/[controller]")]
[Authorize(Roles = UserRoles.Admin + ", " + UserRoles.Employee)]
[ApiController]
public class ClientController(IOurGardenRepository repository, ILogger<ClientController> logger) : BaseController
{
    private const string CONTROLLER_LOCATE = "AdminApi.ClientController";

    [HttpGet("[action]")]
    public async Task<IActionResult> GetAll()
    {
        const string API_LOCATE = CONTROLLER_LOCATE + ".GetAll";

        try
        {
            var result = await repository.GetClients();
            return Success(result);
        }
        catch (Exception ex)
        {
            return LogBadRequest(
                logger,
                API_LOCATE,
                exception: ex
            );
        }
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> AddOrUpdate([FromForm]Client clientDTO)
    {
        const string API_LOCATE = CONTROLLER_LOCATE + ".AddOrUpdate";

        try
        {
            if (clientDTO.ClientId <= 0)
            {
                var newClient = new Client()
                {
                    Email = clientDTO.Email,
                    FIO = clientDTO.FIO,
                    Phone = clientDTO.Phone,
                    IsIncludeInMailing = clientDTO.IsIncludeInMailing,
                };
                await repository.AddClient(newClient);
            }
            else
            {
                var oldClient = await repository.GetClient(clientDTO.ClientId);

                oldClient.Email = clientDTO.Email;
                oldClient.FIO = clientDTO.FIO;
                oldClient.Phone = clientDTO.Phone;
                oldClient.IsIncludeInMailing = clientDTO.IsIncludeInMailing;

                await repository.UpdateClient(oldClient);
            }

            return Success(true);
        }
        catch (Exception ex)
        {
            return LogBadRequest(
                logger,
                API_LOCATE,
                exception: ex
            );
        }
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> Delete([FromQuery]string clientId)
    {
        if (Int32.TryParse(clientId, out var id))
            await repository.DeleteClient(id);

        return Success(true);
    }
}