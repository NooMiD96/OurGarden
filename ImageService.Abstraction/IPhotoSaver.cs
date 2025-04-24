using PhotoService.Abstraction.Model;
using System.IO;
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
        /// Сохраняет фотографию и превью на диск и в БД.
        /// </summary>
        Task<Photo> AddFileToRepository(Stream photo,
                                        string photoFileName,
                                        Stream previewPhoto,
                                        string previewPhotoFileName,
                                        bool updateDB = true,
                                        int maxPixel = MAX_PIXEL);

        /// <summary>
        /// Обновление фотографии есть обновление его превью изображения.
        /// В случае, если такого изображения не было, то будет создано новое из переданного.
        /// </summary>
        void UpdateFilePreview(Photo file,
                               Stream newPreviewPhoto,
                               string newPreviewPhotoFileName,
                               int maxPixel = MAX_PIXEL);

        /// <summary>
        /// Удаляет фото из БД и с диска.
        /// </summary>
        ValueTask<bool> RemoveFileFromRepository(Photo photo, bool updateDB = true);
    }
}
