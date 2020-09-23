namespace ApiService.Abstraction.Model
{
    /// <summary>
    /// Основная информация о запрашиваемой странице.
    /// </summary>
    public class PageSeoInformation
    {
        /// <summary>
        /// Заголовок страницы
        /// </summary>
        public string SeoTitle { get; set; }

        /// <summary>
        /// Описание страницы
        /// </summary>
        public string SeoDescription { get; set; }

        /// <summary>
        /// Ключевые слова
        /// </summary>
        public string SeoKeywords { get; set; }

        /// <summary>
        /// Удалось ли найти запрашиваемую страницу.
        /// </summary>
        public bool IsPageExists { get; set; }
    }
}
