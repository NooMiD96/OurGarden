using System.Collections.Generic;

namespace DataBase.Abstraction.Model
{
    public class ItemDictionary : IItemDictionary
    {
        public string ItemId { get; set; }
        public string Alias { get; set; }
        public IEnumerable<IItemDictionary> SubDictionary { get; set; }
    }
}
