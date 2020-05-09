using System.Threading.Tasks;

namespace OrderCleanerHostService.Abstraction
{
    /// <summary>
    /// Интерфейс описывающий сервис очистки устаревших заказов
    /// </summary>
    public interface IOrderCleanerService
    {
        Task DoWork();
    }
}
