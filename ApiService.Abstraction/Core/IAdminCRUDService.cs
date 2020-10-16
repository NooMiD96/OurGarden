using DataBase.Abstraction;

using PhotoService.Abstraction.Model;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApiService.Abstraction.Core
{
    public interface IAdminCRUDService
    {
        /// <summary>
        /// Создаёт новую сущность исходя из переданной ДТОшки.
        /// Для заполнения полей используется экшен <paramref name="updateEntityObjectAction"/>, для добавления в БД - <paramref name="addEntityDbFunc"/>.
        /// 
        /// </summary>
        /// <typeparam name="TType"></typeparam>
        /// <typeparam name="TTypeDTO"></typeparam>
        /// <param name="entityDTO">Модель ДТО</param>
        /// <param name="updateEntityObjectAction">Функция обновления новой сущности</param>
        /// <param name="addEntityDbFunc">Функция добавления сущности в БД</param>
        /// <param name="defaultPhotoList">Список фотографий, которые будут заполнены при создании.</param>
        /// <param name="scheduleAddedPhotoList">Список фотографий, которые нужно добавить при успешности операции.</param>
        /// <param name="scheduleDeletePhotoList">Список фотографий, которые нужно удалить при провале.</param>
        /// <returns></returns>
        ValueTask<(TType entity, string error)> CreateEntity<TType, TTypeDTO>(TTypeDTO entityDTO,
                                                                              Action<TType, TTypeDTO> updateEntityObjectAction,
                                                                              Func<TType, ValueTask<(bool isSuccess, string error)>> addEntityDbFunc,
                                                                              ICollection<Photo> defaultPhotoList = null,
                                                                              List<Photo> scheduleAddedPhotoList = null,
                                                                              List<Photo> scheduleDeletePhotoList = null) where TType : IPhoto, new()
                                                                                                                          where TTypeDTO : IPhotoDTO;

        /// <summary>
        /// Обновление стандартных полей объекта, которые не влекут за собой изменений в урлах и идентификаторах.
        /// </summary>
        /// <typeparam name="TType">Тип сущности</typeparam>
        /// <typeparam name="TTypeDTO">Тип ДТО</typeparam>
        /// <param name="entity">Сущность</param>
        /// <param name="entityDTO">ДТО</param>
        /// <param name="updateEntityObjectAction">Функция обновления сущности (не в БД)</param>
        /// <param name="updateEntityDbFunc">Функция обновления сущности в БД</param>
        /// <returns></returns>
        ValueTask<(bool isSuccess, string error)> UpdateEntity<TType, TTypeDTO>(TType entity,
                                                                                TTypeDTO entityDTO,
                                                                                Action<TType, TTypeDTO> updateEntityObjectAction,
                                                                                Func<TType, ValueTask<(bool isSuccess, string error)>> updateEntityDbFunc) where TType : IPhoto
                                                                                                                                                           where TTypeDTO : IPhotoDTO;
    }
}
