using Microsoft.AspNetCore.Http;

using System.ComponentModel.DataAnnotations;

namespace ApiService.Abstraction.DTO.Subcategory
{
    public class SubcategoryDTO : IPhotoDTO
    {
        public string SubcategoryId { get; set; }

        public string CategoryId { get; set; }

        [Required]
        public string NewCategoryId { get; set; }

        [Required]
        [MaxLength(64)]
        public string Alias { get; set; }

        public bool? IsVisible { get; set; }

        public IFormFileCollection AddFiles { get; set; }

        public IFormFileCollection UpdateFiles { get; set; }

        public string RemoveFiles { get; set; }
    }
}
