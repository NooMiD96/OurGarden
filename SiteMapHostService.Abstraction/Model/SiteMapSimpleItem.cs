using DataBase.Abstraction;

using PhotoService.Abstraction.Model;

using System;
using System.Collections.Generic;

namespace SiteMapHostService.Abstraction.Model
{
    /// <summary>
    /// Объект карты.
    /// </summary>
    public class SiteMapSimpleItem : IPhoto
    {
        /// <summary>
        /// Ссылка на страницу
        /// </summary>
        public string Url { get; set; }

        /// <summary>
        /// Заголовок/имя страницы
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Дата последнего редактирования страницы
        /// </summary>
        public DateTime LastModified { get; set; }

        /// <summary>
        /// Тип ссылки
        /// </summary>
        public ItemType ItemType { get; set; }

        /// <summary>
        /// Фото
        /// </summary>
        public ICollection<Photo> Photos { get; set; }
    }
}
