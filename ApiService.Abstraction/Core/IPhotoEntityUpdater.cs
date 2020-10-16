using DataBase.Abstraction;

using PhotoService.Abstraction;
using PhotoService.Abstraction.Model;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApiService.Abstraction.Core
{
    /// <summary>
    /// Сервис по обновлению модели с фотографиями.
    /// </summary>
    public interface IPhotoEntityUpdater
    {
        /// <summary>
        /// Загружает фотографии в <paramref name="entity"/> исходя из <paramref name="entityDTO"/>.
        /// В <paramref name="scheduleAddedPhotoList"/> и <paramref name="scheduleDeletePhotoList"/> загружаются фотографии,
        /// с которыми нужно проделать постобработку.
        /// </summary>
        /// <remarks>Вызов данной функции не приводит к сохранению изменений в БД!</remarks>
        Task LoadPhotosToEntity<TType, TTypeDTO>(TType entity,
                                                 TTypeDTO entityDTO,
                                                 List<Photo> scheduleAddedPhotoList = null,
                                                 List<Photo> scheduleDeletePhotoList = null,
                                                 int maxPixel = IPhotoSaver.MAX_PIXEL) where TType : IPhoto
                                                                                       where TTypeDTO : IPhotoDTO;

        /// <summary>
        /// Перенос (удаление из старой, создание в новой) фотографий в новый объект <paramref name="fileList"/>.
        /// </summary>
        /// <typeparam name="TType">Тип, который содержит в себе коллекцию фотографий <see cref="IPhoto"/>.</typeparam>
        /// <param name="entity">Объект с коллекцией фотографий.</param>
        /// <param name="fileList">Список фотография для переноса.</param>
        void MovePhotosToEntity<TType>(TType entity, ICollection<Photo> fileList) where TType : IPhoto;
    }
}
