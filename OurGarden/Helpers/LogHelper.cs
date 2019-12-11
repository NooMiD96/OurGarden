using Microsoft.Extensions.Logging;

using System;

namespace Web.Helpers
{
    public static class LogHelper
    {
        private const string ERROR = "Что-то пошло не так, повторите попытку.";

        public static string LogError(ILogger logger,
                                      string apiLocate,
                                      Exception exception = null,
                                      string customeError = null,
                                      int returnStatusCode = 200)
        {
            var returnErrorString = customeError ?? ERROR;
            var logErrorString = $"{DateTime.Now}:\n{apiLocate}\n{returnErrorString}\nreturnStatusCode=={returnStatusCode}";

            if (exception != null)
            {
                logErrorString += $"\nERR: {exception.Message}\n{exception.StackTrace}";
                returnErrorString += $" Ошибка: {exception.Message}";
                logger.LogError(exception, logErrorString);
            }
            else
            {
                logger.LogError(logErrorString);
            }

            return returnErrorString;
        }
    }
}
