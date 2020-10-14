using Microsoft.AspNetCore.Http;

using PhotoService.Abstraction.Model;

using System.Threading.Tasks;

namespace PhotoService.Abstraction
{
    public interface IPhotoSaver
    {
        #region CONST

        /// <summary>
        /// Папка в которой хранятся изображения
        /// </summary>
        public const string IMAGES_FOLDER = "images";

        /// <summary>
        /// Дефолтное значение максимального разрешения фотографий
        /// </summary>
        public const int MAX_PIXEL = 400;

        #endregion

        /// <summary>
        /// Сохраняет фотографию на диск и в БД.
        /// При наличии превью изображения, сохраняет и его.
        /// </summary>
        Task<Photo> AddFileToRepository(IFormFile photo,
                                        IFormFile previewPhoto = null,
                                        bool updateDB = true,
                                        int maxPixel = 0);

        /// <summary>
        /// Обновление фотографии есть обновление его превью изображения.
        /// В случае, если такого изображения не было, то будет создано новое из переданного.
        /// </summary>
        void UpdateFilePreview(Photo file,
                               IFormFile newPreviewPhoto,
                               int maxPixel = 0);

        /// <summary>
        /// Удаляет фото из БД и с диска.
        /// </summary>
        ValueTask<bool> RemoveFileFromRepository(Photo photo, bool updateDB = true);
    }
}
