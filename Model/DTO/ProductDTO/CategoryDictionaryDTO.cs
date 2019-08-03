using System.Collections.Generic;

namespace Model.DTO.ProductDTO
{
    public class SubcategoryDictionaryDTO
    {
        public string SubcategoryId { get; set; }
        public string Alias { get; set; }
    }

    public class CategoryDictionaryDTO
    {
        public string CategoryId { get; set; }
        public string Alias { get; set; }
        
        public IEnumerable<SubcategoryDictionaryDTO> Subcategories { get; set; }
    }
}
