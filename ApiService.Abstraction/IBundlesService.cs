using ApiService.Abstraction.Model;

using System.Threading.Tasks;

namespace ApiService.Abstraction
{
    /// <summary>
    /// Сервис для работы с бандлами
    /// </summary>
    public interface IBundlesService
    {
        /// <summary>
        /// Получение необходимых для запуска запрашиваемой страницы бандлов.
        /// </summary>
        /// <param name="host"></param>
        /// <param name="path"></param>
        /// <param name="isPageNotFound"></param>
        /// <returns></returns>
        public Task<BundlesInformation> GetBundlesInformation(string host, string path, bool isPageNotFound);
    }
}
