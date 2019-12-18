using System;

namespace Core.Helpers
{
    public static class DateTimeHelper
    {
        /// <summary>
        /// Return "yyyy-MM-dd" string
        /// </summary>
        public static string DateFormat = "yyyy-MM-dd";

        /// <summary>
        /// Return <see cref="{DateTime}"/> in YYYY-MM-DD format
        /// </summary>
        public static DateTime GetDate(this DateTime dateTime)
        {
            var date = DateTime.Parse($"{dateTime.Year}-{dateTime.Month}-{dateTime.Day}");
            return date;
        }
    }
}
