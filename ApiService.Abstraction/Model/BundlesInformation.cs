using System.Collections.Generic;

namespace ApiService.Abstraction.Model
{
    /// <summary>
    /// Информация о том, какие файлы бандлы необходимы для старта запрашивоемой страницы.
    /// </summary>
    public class BundlesInformation
    {
        /// <summary>
        /// JavaScript файлы
        /// </summary>
        public IEnumerable<string> JsBundles { get; set; }

        /// <summary>
        /// Css файлы
        /// </summary>
        public IEnumerable<string> CssBundles { get; set; }

        /// <summary>
        /// Стили css в виде строки, которые нужно инъекцировать в хедер.
        /// </summary>
        public string CssInjection { get; set; }

        public string HelmetTitle { get; set; }

        public string HelmetMeta { get; set; }
    }
}
