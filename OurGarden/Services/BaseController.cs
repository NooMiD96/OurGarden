using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using System;
using System.Text;

namespace Web.Controllers
{
    public class BaseController : ControllerBase
    {
        private const string ERROR = "Что-то пошло не так, повторите попытку.";

        public IActionResult Success<T>(T res)
        {
            return Ok(new { data = res });
        }

        public IActionResult BadRequest(string res)
        {
            return Ok(new { error = res });
        }

        public IActionResult LogBadRequest(ILogger logger,
                                           string apiLocate,
                                           [FromServices] Exception exception = null,
                                           string customeError = null,
                                           int returnStatusCode = 200)
        {
            var returnErrorString = customeError ?? ERROR;
            var logErrorString = $"{DateTime.Now}:\n{apiLocate}\n{returnErrorString}";

            if (exception != null)
            {
                logErrorString += $"\nERR: {exception.Message}\n{exception.StackTrace}";
                returnErrorString += $" Ошибка: {exception.Message}";
                logger.LogError(exception, logErrorString);
            }
            else
            {
                logger.LogError(logErrorString);
            }

            switch (returnStatusCode)
            {
                case 404:
                    return NotFound(new { error = returnErrorString });

                case 200:
                default:
                    return BadRequest(returnErrorString);
            }
        }
    }
}