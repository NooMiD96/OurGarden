using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

using System.Threading.Tasks;

namespace Web.Middlewares
{
    public class PermissionMiddleware
    {
        private readonly RequestDelegate _next;

#pragma warning disable IDE0052 // Remove unread private members
#pragma warning disable CA1823 // Remove unread private members
        private readonly string[] _adminUrls = new[] {
            "todolist"
        };
#pragma warning restore CA1823 // Remove unread private members
#pragma warning restore IDE0052 // Remove unread private members

        public PermissionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public Task Invoke(HttpContext httpContext)
        {

            return _next(httpContext);
        }
    }

    public static class PermissionMiddlewareExtensions
    {
        public static IApplicationBuilder UsePermissionMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<PermissionMiddleware>();
        }
    }
}
