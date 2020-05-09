using System;

namespace SiteMapHostService.Abstraction.Model
{
    /// <summary>
    /// Объект карты.
    /// </summary>
    public class SiteMapSimpleItem
    {
        public string Url { get; set; }
        public DateTime LastModified { get; set; }
        public ItemType ItemType { get; set; }
    }
}
