using Microsoft.AspNetCore.Http;

using System.ComponentModel.DataAnnotations;

namespace ApiService.Abstraction.DTO.ProductDTO
{
    public class ProductDTO : IPhotoDTO
    {
        public string CategoryId { get; set; }

        public string SubcategoryId { get; set; }

        public string ProductId { get; set; }


        [Required]
        public string NewSubcategoryId { get; set; }

        [Required]
        public string NewCategoryId { get; set; }


        [MaxLength(64)]
        [Required]
        public string Alias { get; set; }

        [Required]
        public double Price { get; set; }

        [Required]
        public string Description { get; set; }

        public bool? IsVisible { get; set; }

        public string SeoTitle { get; set; }

        public string SeoDescription { get; set; }

        public string SeoKeywords { get; set; }

        public IFormFileCollection AddFiles { get; set; }

        public IFormFileCollection UpdateFiles { get; set; }

        public string RemoveFiles { get; set; }
    }
}
