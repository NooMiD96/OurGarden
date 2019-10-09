using Microsoft.AspNetCore.Http;

using System.ComponentModel.DataAnnotations;

namespace Model.DTO.Subcategory
{
    public class SubcategoryDTO
    {
        public string SubcategoryId { get; set; }

        public string CategoryId { get; set; }

        [Required]
        public string NewCategoryId { get; set; }

        [Required]
        [MaxLength(64)]
        public string Alias { get; set; }

        public bool? IsVisible { get; set; }

        public IFormFile File { get; set; }
    }
}
