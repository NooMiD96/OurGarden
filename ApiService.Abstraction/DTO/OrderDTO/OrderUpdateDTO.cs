using System.ComponentModel.DataAnnotations;

namespace ApiService.Abstraction.DTO.OrderDTO
{
    public class OrderUpdateDTO
    {
        [Required]
        public int OrderId { get; set; }
        [Required]
        public int StatusId { get; set; }
        public string Description { get; set; }
    }
}
