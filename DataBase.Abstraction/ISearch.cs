using DataBase.Abstraction.Model;

using System.Collections.Generic;

namespace DataBase.Abstraction
{
    public interface ISearch
    {
        string CategoryId { get; set; }
        string SubcategoryId { get; set; }
        string ProductId { get; set; }
        string Alias { get; set; }
        IEnumerable<Photo> Photos { get; set; }
    }
}
