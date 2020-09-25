using System.ComponentModel.DataAnnotations;

namespace ApiService.Abstraction.DTO.OrderDTO
{
    /// <summary>
    /// Модель товара для заказа.
    /// </summary>
    public class OrderProductDTO
    {
        [Required]
        public string ProductId { get; set; }

        [Required]
        public string SubcategoryId { get; set; }

        [Required]
        public string CategoryId { get; set; }
    }
}
