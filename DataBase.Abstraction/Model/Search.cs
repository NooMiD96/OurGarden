using System.Collections.Generic;

namespace DataBase.Abstraction.Model
{
    public class Search : ISearch
    {
        public string CategoryId { get; set; }
        public string SubcategoryId { get; set; }
        public string ProductId { get; set; }
        public string Alias { get; set; }
        public IEnumerable<Photo> Photos { get; set; }
    }
}
