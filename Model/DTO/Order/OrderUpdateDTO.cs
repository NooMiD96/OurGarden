using System.ComponentModel.DataAnnotations;

namespace Model.DTO.Order
{
    public class OrderUpdateDTO
    {
        [Required]
        public int OrderId { get; set; }
        [Required]
        public int StatusId { get; set; }
        [Required]
        public string Description { get; set; }
    }
}
