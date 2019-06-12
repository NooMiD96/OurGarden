using System;

namespace Core.Helpers
{
    public static class DateTimeHelper
    {
        /// <summary>
        /// Return <see cref="{DateTime}"/> in YYYY-MM-DD format
        /// </summary>
        public static DateTime GetToday(this DateTime dateTime)
        {
            var date = DateTime.Parse($"{dateTime.Year}-{dateTime.Month}-{dateTime.Day}");
            return date;
        }
    }
}
