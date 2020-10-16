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
    public class AdminCRUDService : IAdminCRUDService
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
        public async ValueTask<(TType entity, string error)> CreateEntity<TType, TTypeDTO>(TTypeDTO entityDTO,
                                                                                           Action<TType, TTypeDTO> updateEntityAction,
                                                                                           Func<TType, ValueTask<(bool isSuccess, string error)>> addEntityFunc,
                                                                                           ICollection<Photo> defaultPhotoList = null,
                                                                                           List<Photo> scheduleAddedPhotoList = null,
                                                                                           List<Photo> scheduleDeletePhotoList = null) where TType : IPhoto, new()
                                                                                                                                       where TTypeDTO : IPhotoDTO
        {
            var newEntity = new TType
            {
                Photos = new List<Photo>()
            };
            if (updateEntityAction == null)
            {
                throw new ArgumentNullException(nameof(updateEntityAction));
            }
            updateEntityAction(newEntity, entityDTO);

            //Добавляем и проверяем можем ли мы добавить данную категорию
            if (addEntityFunc == null)
            {
                throw new ArgumentNullException(nameof(addEntityFunc));
            }
            var (isSuccess, error) = await addEntityFunc(newEntity);
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
        public async ValueTask<(bool isSuccess, string error)> UpdateEntity<TType, TTypeDTO>(TType entity,
                                                                                             TTypeDTO entityDTO,
                                                                                             Action<TType, TTypeDTO> updateEntityObjectAction,
                                                                                             Func<TType, ValueTask<(bool isSuccess, string error)>> updateEntityDbFunc) where TType : IPhoto
                                                                                                                                                                        where TTypeDTO : IPhotoDTO
        {
            await _photoEntityUpdater.LoadPhotosToEntity(entity, entityDTO);
            updateEntityObjectAction(entity, entityDTO);
            return await updateEntityDbFunc(entity);
        }
    }
}
