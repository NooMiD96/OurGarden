using System.ComponentModel.DataAnnotations;

namespace ApiService.Abstraction.DTO.OrderDTO
{
    /// <summary>
    /// Модель товара в корзине.
    /// </summary>
    public class OrderPositionDTO
    {
        /// <summary>
        /// Кол-во товара
        /// </summary>
        [Required]
        public int Number { get; set; }

        /// <summary>
        /// Модель товара
        /// </summary>
        [Required]
        public OrderProductDTO Product { get; set; }
    }
}
