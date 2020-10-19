using ApiService.Abstraction.DTO;
using ApiService.Abstraction.Model;

using DataBase.Abstraction.Model;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApiService.Abstraction.AdminApi
{
    public interface ICategoryControllerService
    {
        /// <summary>
        /// Получение списка категорий
        /// </summary>
        Task<ServiceExecuteResult<IEnumerable<Category>>> GetCategories();

        /// <summary>
        /// Добавление новой или обновление старой категории
        /// </summary>
        /// <param name="entityDTO">Модель страницы</param>
        Task<ServiceExecuteResult<bool>> AddOrUpdate(CategoryDTO entityDTO);

        /// <summary>
        /// Удаление имеющейся страницы
        /// </summary>
        /// <param name="categoryId">Ид страницы</param>
        Task<ServiceExecuteResult<bool>> DeleteCategory(string categoryId);
    }
}
