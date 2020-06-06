namespace Model
{
    /// <summary>
    /// Конфиг настройки очистителя заказов.
    /// </summary>
    public class OrderCleanerOptions
    {
        /// <summary>
        /// Через сколько месяцев нужно удалять закрытые или отменённые заказы.
        /// </summary>
        public byte MonthMaxDiff { get; set; }
    }
}
