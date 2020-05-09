using DataBase.Abstraction.Model;

using System.ComponentModel.DataAnnotations;

namespace ApiService.Abstraction.DTO.OrderDTO
{
    public class OrderPositionDTO
    {
        [Required]
        public int Number { get; set; }

        [Required]
        public Product Product { get; set; }
    }
}
