using Microsoft.AspNetCore.Http;

using Model.Interfaces.DTO;

using System.ComponentModel.DataAnnotations;

namespace Model.DTO.ProductDTO
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

        public IFormFileCollection AddFiles { get; set; }

        public IFormFileCollection UpdateFiles { get; set; }

        public string RemoveFiles { get; set; }
    }
}
