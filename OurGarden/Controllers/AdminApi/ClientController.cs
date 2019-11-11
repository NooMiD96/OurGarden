using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Constants;
using Database.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.DB;

namespace Web.Controllers.AdminApi
{
    [Route("api/[controller]")]
    [Authorize(Roles = UserRoles.Admin + ", " + UserRoles.Employee)]
    [ApiController]
    public class ClientController : BaseController
    {
        private readonly IOurGardenRepository _repository;
        public ClientController(IOurGardenRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var result = await _repository.GetClients();
                return Success(result);
            }
            catch (Exception)
            {
                return BadRequest("Что-то пошло не так, повторите попытку");
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddOrUpdate([FromForm]Client client)
        {
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
            catch (Exception)
            {
                return BadRequest("Что-то пошло не так, повторите попытку");
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Delete(
            [FromQuery]string clientId)
        {
            int id = 0;
            if (int.TryParse(clientId, out id))
                await _repository.DeleteClient(id);

            return Success(true);
        }
    }
}