using DataBase.Abstraction.Model;

using System.Collections.Generic;

namespace ApiService.Abstraction.DTO
{
    public class SearchDTO
    {
        public string CategoryId { get; set; }
        public string SubcategoryId { get; set; }
        public string ProductId { get; set; }
        public string Alias { get; set; }
        public IEnumerable<Photo> Photos { get; set; }
    }
}
