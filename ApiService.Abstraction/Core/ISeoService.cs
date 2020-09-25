using ApiService.Abstraction.Model;

using System.Threading.Tasks;

namespace ApiService.Abstraction.Core
{
    /// <summary>
    /// Сервис контроллера.
    /// </summary>
    public interface ISeoService
    {
        /// <summary>
        /// Получение Ceo информации о запрашиваемой странице.
        /// </summary>
        /// <param name="pathname">Адресная строка, на которой находится пользователь</param>
        /// <returns>Сео информация.</returns>
        Task<ServiceExecuteResult<PageSeoInformation>> GetPageSeoInformation(string pathname);
    }
}
