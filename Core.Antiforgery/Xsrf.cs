using Core.Helpers;
using Microsoft.AspNetCore.Antiforgery;

namespace Core.Antiforgery
{
    static public class Xsrf
    {
        static public string XsrfToXpt(AntiforgeryTokenSet xpt) => JsonHelper.Serialize(new
        {
            __xpt_cookie = xpt.CookieToken,
            __xpt_request = xpt.RequestToken,
            __xpt_header_name = xpt.HeaderName
        });
    }
}
