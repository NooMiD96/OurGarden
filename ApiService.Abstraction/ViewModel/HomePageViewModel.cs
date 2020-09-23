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
        /// Ид метрики
        /// </summary>
        public int YandexMetrikaCounterId { get; set; } = 0;

        /// <summary>
        /// Ид ЖивоСайта
        /// </summary>
        public string JivoSiteId { get; set; } = "";
    }
}
