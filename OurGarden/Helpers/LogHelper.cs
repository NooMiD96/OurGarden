using Microsoft.Extensions.Logging;

using System;
using System.Text;

namespace Web.Helpers
{
    public static class LogHelper
    {
        private const string ERROR = "Что-то пошло не так, повторите попытку.";

        public static string LogError(ILogger logger,
                                      string apiLocate,
                                      Exception exception = null,
                                      string customeError = ERROR,
                                      int returnStatusCode = 200)
        {
            //byte[] bytes = Encoding.Default.GetBytes(customeError);
            //customeError = Encoding.GetEncoding("windows-1251").GetString(bytes);

            var returnErrorString = customeError;
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
