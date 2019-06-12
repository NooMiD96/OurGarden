using System.IO;
using System.Threading.Tasks;

namespace Web.Controllers.Services
{
    public static class ControllersServices
    {
        static public async Task<string> GetJsonFromBodyRequestAsync(Stream body)
        {
            string content;
            using (var reader = new StreamReader(body))
            {
                content = await reader.ReadToEndAsync();
            }
            return content;
        }
    }
}
