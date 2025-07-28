namespace Model
{
    /// <summary>
    /// Конфиг настройки пинга сайта.
    /// </summary>
    public class PagePingerOptions
    {
        /// <summary>
        /// Включен/отключен пингер.
        /// </summary>
        public bool Enabled { get; set; }

        /// <summary>
        /// Раз в сколько минут пинговать.
        /// </summary>
        public int StartTimeoutInMinutes { get; set; }
    }
}
