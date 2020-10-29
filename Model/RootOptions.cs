using System.Collections.Generic;

namespace Model
{
    public class RootOptions
    {
        /// <summary>
        /// Имя хоста
        /// </summary>
        public string HostName { get; set; }

        /// <summary>
        /// Перечисление роутов (а именно окончаний),
        /// которые не обрабатываются.
        /// </summary>
        public IEnumerable<string> SkipRoutePathEndRegex { get; set; }
    }
}
