using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.NodeServices;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Services.SSR
{
    public class GetAssets
    {
        private readonly INodeServices _nodeServices;
        private readonly string _currentDirectory;

        public GetAssets(INodeServices nodeServices)
        {
            _nodeServices = nodeServices;
            _currentDirectory = Directory.GetCurrentDirectory();
        }

        public async ValueTask<(string[] js, string[] css)> Bundles(string host, string path)
        {
#if DEBUG
            var pathToScript = "./src/boot-bundles/getBundles";
#else
            var pathToScript = "../../wwwroot/bundles/getBundles";
#endif
            var result = await _nodeServices.InvokeAsync<JObject>(pathToScript, host, path, _currentDirectory);

            return (
                result.GetValue("js").Select(x => x["publicPath"].Value<string>()).ToArray(),
                result.GetValue("css").Select(x => x["publicPath"].Value<string>()).ToArray()
            );
        }
    }
}
