using Model.DB;

using System.ComponentModel.DataAnnotations;

namespace Model.DTO.Order
{
    public class OrderPositionDTO
    {
        [Required]
        public int Number { get; set; }

        [Required]
        public double Price { get; set; }

        [Required]
        public Product Product { get; set; }
    }
}
