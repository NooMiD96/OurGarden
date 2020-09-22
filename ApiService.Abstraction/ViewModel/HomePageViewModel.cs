namespace ApiService.Abstraction.ViewModel
{
    /// <summary>
    /// Модель основной страницы, из которой происходит рендер реакта.
    /// </summary>
    public class HomePageViewModel
    {
        /// <summary>
        /// Используется мобильный браузер.
        /// </summary>
        public bool IsMobileBrowser { get; set; } = false;

        /// <summary>
        /// Найдена ли запрашиваемая страница.
        /// </summary>
        public bool IsPageFound { get; set; } = true;

        /// <summary>
        /// Ид метрики
        /// </summary>
        public int YandexMetrikaCounterId { get; set; } = 0;

        /// <summary>
        /// Ид ЖивоСайта
        /// </summary>
        public string JivoSiteId { get; set; } = "";
    }
}
