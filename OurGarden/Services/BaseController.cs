using Microsoft.AspNetCore.Mvc;

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