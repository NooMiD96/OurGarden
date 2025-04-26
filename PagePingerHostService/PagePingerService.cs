using Core.Utils;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Model;
using PagePingerHostService.Abstraction;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace PagePingerHostService;

/// <summary>
/// Класс для пинга главной страницы сайта
/// </summary>
public class PagePingerService(ILogger<PagePingerService> logger,
                               IOptions<RootOptions> rootOptions,
                               IHttpClientFactory httpClientFactory) : IPagePingerService
{
    #region Consts

    const string HostServiceName = "PagePingerService";
    const string HostServiceWorkStart = HostServiceName + " is start working.";
    const string HostServiceWorkEnd = HostServiceName + " is work done.";

    #endregion

    private byte _workCounter = 0;

    public async Task PingMainPage(string page = null)
    {
        if (_workCounter == 0)
            logger.LogInformation(HostServiceWorkStart);

        try
        {
            using var client = httpClientFactory.CreateClient();
            await client.GetAsync(
                new Uri(
                    page ?? WebUtils.GenerateSiteAddress(rootOptions.Value.HostName)
                )
            );
        }
        catch (Exception ex)
        {
            /// TODO: Send email
            logger.LogError(ex, $"PagePingerService error: {ex.Message}");
        }

        if (_workCounter == 0)
            logger.LogInformation(HostServiceWorkEnd);

        _workCounter++;
    }
}
