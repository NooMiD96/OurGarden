using Microsoft.AspNetCore.NodeServices;
using Microsoft.Extensions.Logging;

using Newtonsoft.Json.Linq;

using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

using static Web.Helpers.LogHelper;

namespace Web.Services.SSR
{
    public class GetAssets
    {
        private readonly INodeServices _nodeServices;
        private readonly string _currentDirectory;
        private readonly ILogger _logger;

        public GetAssets(INodeServices nodeServices, ILogger logger)
        {
            _nodeServices = nodeServices;
            _currentDirectory = Directory.GetCurrentDirectory();
            _logger = logger;
        }

        public async ValueTask<(string[] js, string[] css)> Bundles(string host, string path, bool isPageNotFound)
        {
            try
            {
#if DEBUG
                var pathToScript = "./Web/ClientApp/src/boot-bundles/getBundles";
#else
                var pathToScript = "./wwwroot/bundles/getBundles";
#endif
                var result = await _nodeServices.InvokeAsync<JObject>(pathToScript, host, path, _currentDirectory, isPageNotFound);

                if (result.TryGetValue("js", out var jsJson) && result.TryGetValue("css", out var cssJson))
                {
                    return (
                        jsJson.Select(x => x["publicPath"].Value<string>()).ToArray(),
                        cssJson.Select(x => x["publicPath"].Value<string>()).ToArray()
                    );
                }
                else
                {
                    LogError(_logger,
                             "GetBundles",
                             customeError: $"Error in getting bundles\nReturn obj:\n{result.ToString()}");
                }
            }
            catch (Exception ex)
            {
                LogError(_logger, "GetBundles", ex);
            }
            
            return default;
        }
    }
}
