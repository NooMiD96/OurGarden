using PhotoService.Abstraction.Model;

using System;
using System.Threading.Tasks;

namespace PhotoService.Abstraction
{
    public interface IPhotoSaverRepository
    {
        /// <summary>
        /// Добавляет информацию об изображении в БД.
        /// </summary>
        /// <seealso cref="IOurGardenRepository"/>
        Task AddPhoto(Photo photo, bool updateDB = true);

        /// <summary>
        /// Удаляет информацию об изображении из БД.
        /// </summary>
        /// <seealso cref="IOurGardenRepository"/>
        ValueTask<bool> RemovePhoto(Guid photoId, bool updateDB = true);
    }
}
