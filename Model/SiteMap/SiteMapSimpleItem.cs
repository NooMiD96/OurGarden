using System;

namespace Model.SiteMap
{
    public enum ItemType
    {
        Category,
        Subcategory,
        Product
    }

    public class SiteMapSimpleItem
    {
        public string Url { get; set; }
        public DateTime LastModified { get; set; }
        public ItemType ItemType { get; set; }
    }
}
