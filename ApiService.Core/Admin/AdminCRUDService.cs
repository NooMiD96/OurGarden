using ApiService.Abstraction;
using ApiService.Abstraction.Core;

using DataBase.Abstraction;
using DataBase.Abstraction.Repositories;

using PhotoService.Abstraction;
using PhotoService.Abstraction.Model;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApiService.Core.Admin
{
    /// <summary>
    /// Общие операции обновления сущностей для админки.
    /// </summary>
    /// <typeparam name="TType">Тип сущности</typeparam>
    /// <typeparam name="TTypeDTO">Тип ДТО</typeparam>
    public abstract class AdminCRUDService<TType, TTypeDTO> : IAdminCRUDService<TType, TTypeDTO> where TType : IPhoto, new()
                                                                                                 where TTypeDTO : IPhotoDTO
    {
        #region Fields

        /// <summary>
        /// Репо БД
        /// </summary>
        private readonly IOurGardenRepository _repository;

        /// <summary>
        /// Сервис сохранения фотографий
        /// </summary>
        private readonly IPhotoSaver _photoSaver;

        /// <summary>
        /// Сервис обновления фотографий у существующего объекта
        /// </summary>
        private readonly IPhotoEntityUpdater _photoEntityUpdater;

        #endregion

        #region .ctor

        /// <summary>
        /// .ctor
        /// </summary>
        public AdminCRUDService(IOurGardenRepository repository,
                                IPhotoSaver photoSaver,
                                IPhotoEntityUpdater photoEntityUpdater)
        {
            _repository = repository;
            _photoSaver = photoSaver;
            _photoEntityUpdater = photoEntityUpdater;
        }

        #endregion

        /// <inheritdoc/>
        public abstract void UpdateEntityObjectAction(TType entity, TTypeDTO entityDTO);

        /// <inheritdoc/>
        public async ValueTask<(TType entity, string error)> CreateEntity(TTypeDTO entityDTO,
                                                                          Func<TType, ValueTask<(bool isSuccess, string error)>> addEntityDbFunc,
                                                                          ICollection<Photo> defaultPhotoList = null,
                                                                          List<Photo> scheduleAddedPhotoList = null,
                                                                          List<Photo> scheduleDeletePhotoList = null)
        {
            var newEntity = new TType
            {
                Photos = new List<Photo>()
            };
            this.UpdateEntityObjectAction(newEntity, entityDTO);

            //Добавляем и проверяем можем ли мы добавить данную категорию
            if (addEntityDbFunc == null)
            {
                throw new ArgumentNullException(nameof(addEntityDbFunc));
            }
            var (isSuccess, error) = await addEntityDbFunc(newEntity);
            if (!isSuccess)
            {
                return (default(TType), error);
            }

            _photoEntityUpdater.MovePhotosToEntity(newEntity, defaultPhotoList);

            await _photoEntityUpdater.LoadPhotosToEntity(newEntity,
                                                         entityDTO,
                                                         scheduleAddedPhotoList,
                                                         scheduleDeletePhotoList);

            await _repository.SaveChangesAsync();

            return (newEntity, null);
        }

        /// <inheritdoc/>
        public async ValueTask<(bool isSuccess, string error)> UpdateEntity(TType entity,
                                                                            TTypeDTO entityDTO,
                                                                            Func<TType, ValueTask<(bool isSuccess, string error)>> updateEntityDbFunc)
        {
            await _photoEntityUpdater.LoadPhotosToEntity(entity, entityDTO);
            this.UpdateEntityObjectAction(entity, entityDTO);
            return await updateEntityDbFunc(entity);
        }
    }
}
