namespace ApiService.Abstraction.Model
{
    /// <summary>
    /// Основная информация о запрашивоемой странице.
    /// </summary>
    public class PageMainInformation
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
