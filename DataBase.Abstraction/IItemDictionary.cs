using System.Collections.Generic;

namespace DataBase.Abstraction
{
    public interface IItemDictionary
    {
        string ItemId { get; set; }
        string Alias { get; set; }
        IEnumerable<IItemDictionary> SubDictionary { get; set; }
    }
}
