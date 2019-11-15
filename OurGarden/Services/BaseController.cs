using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using System;

namespace Web.Controllers
{
    public class BaseController : ControllerBase
    {
        public IActionResult Success<T>(T res)
        {
            return this.Ok(new { data = res });
        }

        public IActionResult BadRequest(string res)
        {
            return this.Ok(new { error = res });
        }

        public IActionResult LogBadRequest(ILogger logger, string apiLocate, string error)
        {
            logger.LogError($"{DateTime.Now}:\n\t{apiLocate}\n\t{error}");
            return BadRequest(error);
        }

        public IActionResult LogBadRequest(ILogger logger, string apiLocate, [FromServices] Exception ex, string error)
        {
            logger.LogError(ex, $"{DateTime.Now}:\n\t{apiLocate}\n\terr: {ex.Message}\n\t{ex.StackTrace}");
            return BadRequest($"{error} Ошибка: {ex.Message}");
        }


        //public ActionResult<RequestResult<T>> Success<T>(T res)
        //{
        //    return new RequestResult<T>()
        //    {
        //        Data = res
        //    };
        //}

        //public ActionResult<RequestResult<string>> BadRequest(string res)
        //{
        //    return new RequestResult<string>()
        //    {
        //        Data = null,
        //        Error = res,
        //    };
        //}

        //public class RequestResult<T>
        //{
        //    public T Data { get; set; }
        //    public string Error { get; set; }
        //}
    }
}