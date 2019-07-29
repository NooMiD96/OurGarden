using Model.DB;

using System.ComponentModel.DataAnnotations;

namespace Model.DTO
{
    public class OrderPositionDTO
    {
        [Required]
        public int Number { get; set; }

        [Required]
        public Product Product { get; set; }
    }
}
