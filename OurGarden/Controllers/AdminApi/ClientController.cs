using Core.Constants;

using Database.Repositories;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using Model.DB;

using System;
using System.Threading.Tasks;

namespace Web.Controllers.AdminApi
{
    [Route("api/[controller]")]
    [Authorize(Roles = UserRoles.Admin + ", " + UserRoles.Employee)]
    [ApiController]
    public class ClientController : BaseController
    {
        private readonly IOurGardenRepository _repository;
        private readonly ILogger _logger;
        private const string CONTROLLER_LOCATE = "AdminApi.ClientController";

        public ClientController(IOurGardenRepository repository,
                                ILogger<ClientController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAll()
        {
            const string API_LOCATE = CONTROLLER_LOCATE + ".GetAll";

            try
            {
                var result = await _repository.GetClients();
                return Success(result);
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
        public async Task<IActionResult> AddOrUpdate([FromForm]Client client)
        {
            const string API_LOCATE = CONTROLLER_LOCATE + ".AddOrUpdate";

            try
            {
                if (client.ClientId <= 0)
                {
                    var newClient = new Client()
                    {
                        Email = client.Email,
                        FIO = client.FIO,
                        Phone = client.Phone,
                    };
                    await _repository.AddClient(newClient);
                    return Success(newClient);
                }
                else
                {
                    var oldClient = await _repository.GetClient(client.ClientId);
                    if (!client.Email.Equals(oldClient.Email)
                        || !client.FIO.Equals(oldClient.FIO)
                        || !client.Phone.Equals(oldClient.Phone))
                    {
                        oldClient.Email = client.Email;
                        oldClient.FIO = client.FIO;
                        oldClient.Phone = client.Phone;

                        await _repository.UpdateClient(oldClient);
                        return Success(client);
                    }
                    return Success(client);
                }
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
        public async Task<IActionResult> Delete([FromQuery]string clientId)
        {
            if (Int32.TryParse(clientId, out var id))
                await _repository.DeleteClient(id);

            return Success(true);
        }
    }
}