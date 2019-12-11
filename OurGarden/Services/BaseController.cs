using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using System;

using static Web.Helpers.LogHelper;

namespace Web.Controllers
{
    public class BaseController : ControllerBase
    {
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
            var returnErrorString = LogError(logger,
                                             apiLocate,
                                             exception,
                                             customeError,
                                             returnStatusCode);

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