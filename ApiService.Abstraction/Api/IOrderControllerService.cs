using ApiService.Abstraction.DTO.OrderDTO;
using ApiService.Abstraction.Model;

using System.Threading.Tasks;

namespace ApiService.Abstraction.Api
{
    public interface IOrderControllerService
    {
        /// <summary>
        /// Создаёт новый заказ в системе и пытается отправить оповещение по почте.
        /// Если заказ был создан, но на почту не удалось отправить оповещение, то
        /// в результате выполнения будет номер заказа.
        /// </summary>
        /// <param name="orderDTO">Модель заказа.</param>
        /// <returns>Результат выполнения с номером заказа, если удалось создать заказ в системе.</returns>
        Task<ServiceExecuteResult<int>> AddOrder(OrderCreateDTO orderDTO);
    }
}
