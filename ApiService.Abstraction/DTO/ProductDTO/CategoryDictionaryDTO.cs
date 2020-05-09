using DataBase.Abstraction;

using System.Collections.Generic;

namespace ApiService.Abstraction.DTO.ProductDTO
{
    public class CategoryDictionaryDTO : IItemDictionary
    {
        public string ItemId { get; set; }
        public string Alias { get; set; }

        /// <summary>
        /// Subcategories 
        /// </summary>
        public IEnumerable<IItemDictionary> SubDictionary { get; set; }
    }
}
