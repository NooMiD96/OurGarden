using ApiService.Abstraction;
using ApiService.Abstraction.Model;

using Microsoft.AspNetCore.NodeServices;
using Microsoft.Extensions.Logging;

using Newtonsoft.Json.Linq;

using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ApiService.Core
{
    /// <summary>
    /// 
    /// </summary>
    [Obsolete]
    public class BundlesService : IBundlesService
    {
        #region Fields

        /// <summary>
        /// Логгер
        /// </summary>
        private readonly ILogger _logger;

        /// <summary>
        /// Node сервис
        /// </summary>
        private readonly INodeServices _nodeServices;

        /// <summary>
        /// Папка из которой выполянется
        /// </summary>
        private readonly string _currentDirectory;

        #endregion

        #region .ctor

        /// <summary>
        /// .ctor
        /// </summary>
        public BundlesService(ILogger<BundlesService> logger,
                              INodeServices nodeServices)
        {
            _logger = logger;
            _nodeServices = nodeServices;
#if DEBUG
            _currentDirectory = Directory.GetCurrentDirectory();
#else
            _currentDirectory = Path.Combine("../", "./OurGarden", Directory.GetCurrentDirectory());
#endif
        }

        #endregion

        #region IBundlesService Impl

        /// <inheritdoc/>
        public async Task<BundlesInformation> GetBundlesInformation(string host, string path, bool isPageNotFound)
        {
            try
            {
#if DEBUG
                var pathToScript = "./Web/ClientApp/src/boot-bundles/getBundles";
#else
                var pathToScript = "./wwwroot/bundles/getBundles";
#endif
                var result = await _nodeServices.InvokeAsync<JObject>(pathToScript, host, path, _currentDirectory, isPageNotFound);

                if (
                    result.TryGetValue("js", out var jsJson)
                    && result.TryGetValue("css", out var cssJson)
                    && result.TryGetValue("stringCss", out var stringCssJson)
                )
                {
                    return new BundlesInformation
                    {
                        JsBundles = jsJson.Select(x => x["publicPath"].Value<string>()).ToList(),
                        CssBundles = cssJson.Select(x => x["publicPath"].Value<string>()).ToList(),
                        CssInjection = stringCssJson.ToString()
                    };
                }
                else
                {
                    _logger.LogError($"Error in getting bundles - Unexpected result:\n{result}");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in getting bundles:");
            }

            return default;
        }

        #endregion
    }
}
