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
                                      string customError = ERROR,
                                      int returnStatusCode = 200)
        {
            var returnErrorString = customError;
            var logErrorString = $"{apiLocate}\n{returnErrorString}\nreturnStatusCode=={returnStatusCode}";

            if (exception != null)
            {
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
