using Model.DB;

using System.Collections.Generic;

namespace Model.DTO
{
    public class SearchDTO
    {
        public string CategoryId { get; set; }
        public string SubcategoryId { get; set; }
        public string ProductId { get; set; }
        public string Alias { get; set; }
        public Photo Photo { get; set; }
        public IEnumerable<Photo> Photos { get; set; }
    }
}
