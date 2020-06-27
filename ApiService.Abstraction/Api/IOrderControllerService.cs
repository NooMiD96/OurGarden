using ApiService.Abstraction.DTO.OrderDTO;

using System.Threading.Tasks;

namespace ApiService.Abstraction.Api
{
    public interface IOrderControllerService
    {
        /// <summary>
        /// Создаёт новый заказ в системе и пытается отправить оповещение по почте.
        /// </summary>
        /// <param name="orderDTO">Модель заказа.</param>
        /// <returns>Результат выполнения.</returns>
        ValueTask<(bool isSuccess, string error)> AddOrder(OrderCreateDTO orderDTO);
    }
}
