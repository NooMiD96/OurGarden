using System.ComponentModel.DataAnnotations;

namespace Model.DTO.ProductDTO
{
    public class ProductDTO
    {
        [Required]
        public string CategoryId { get; set; }

        [Required]
        public string SubcategoryId { get; set; }

        [Required]
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

        [Required]
        public string Url { get; set; }
    }
}
