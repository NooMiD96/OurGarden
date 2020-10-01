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

        public IActionResult BadRequest<T>(string res, T data = default)
        {
            return BadRequest(new { error = res, data });
        }

        public IActionResult LogBadRequest(ILogger logger,
                                           string apiLocate,
                                           [FromServices] Exception exception = null,
                                           string customError = null,
                                           int returnStatusCode = 200)
        {
            var returnErrorString = LogError(logger,
                                             apiLocate,
                                             exception,
                                             customError,
                                             returnStatusCode);

            return returnStatusCode switch
            {
                404 => NotFound(new { error = returnErrorString }),
                _ => BadRequest(returnErrorString),
            };
        }
    }
}