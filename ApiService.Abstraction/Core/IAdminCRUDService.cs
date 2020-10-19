using PhotoService.Abstraction.Model;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApiService.Abstraction.Core
{
    /// <summary>
    /// Общие операции обновления сущностей для админки.
    /// </summary>
    /// <typeparam name="TType">Тип сущности</typeparam>
    /// <typeparam name="TTypeDTO">Тип ДТО</typeparam>
    public interface IAdminCRUDService<TType, TTypeDTO>
    {
        /// <summary>
        /// Функция по обновлению полей сущности. Используется во многих местах,
        /// поэтому приведена единая.
        /// </summary>
        /// <param name="entity">Исходный объект</param>
        /// <param name="entityDTO">ДТО</param>
        abstract void UpdateEntityObjectAction(TType entity, TTypeDTO entityDTO);

        /// <summary>
        /// Создаёт новую сущность исходя из переданной ДТОшки.
        /// Для заполнения полей используется переопределяемый метод абстрактного класса, для добавления в БД - <paramref name="addEntityDbFunc"/>.
        /// </summary>
        /// <param name="entityDTO">Модель ДТО</param>
        /// <param name="addEntityDbFunc">Функция добавления сущности в БД</param>
        /// <param name="defaultPhotoList">Список фотографий, которые будут заполнены при создании.</param>
        /// <param name="scheduleAddedPhotoList">Список фотографий, которые нужно добавить при успешности операции.</param>
        /// <param name="scheduleDeletePhotoList">Список фотографий, которые нужно удалить при провале.</param>
        /// <returns></returns>
        ValueTask<(TType entity, string error)> CreateEntity(TTypeDTO entityDTO,
                                                             Func<TType, ValueTask<(bool isSuccess, string error)>> addEntityDbFunc,
                                                             ICollection<Photo> defaultPhotoList = null,
                                                             List<Photo> scheduleAddedPhotoList = null,
                                                             List<Photo> scheduleDeletePhotoList = null);

        /// <summary>
        /// Обновление стандартных полей объекта, которые не влекут за собой изменений в урлах и идентификаторах.
        /// </summary>
        /// <param name="entity">Сущность</param>
        /// <param name="entityDTO">ДТО</param>
        /// <param name="updateEntityDbFunc">Функция обновления сущности в БД</param>
        /// <returns></returns>
        ValueTask<(bool isSuccess, string error)> UpdateEntity(TType entity,
                                                               TTypeDTO entityDTO,
                                                               Func<TType, ValueTask<(bool isSuccess, string error)>> updateEntityDbFunc);
    }
}
