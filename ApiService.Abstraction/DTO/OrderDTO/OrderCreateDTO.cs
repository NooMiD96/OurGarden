﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ApiService.Abstraction.DTO.OrderDTO
{
    /// <summary>
    /// Модель оформления заказа.
    /// </summary>
    public class OrderCreateDTO
    {
        [Required]
        [MaxLength(128)]
        public string FIO { get; set; }

        [Required]
        [Phone]
        [MaxLength(32)]
        public string Phone { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(64)]
        public string Email { get; set; }

        /// <summary>
        /// Список товаров в корзине
        /// </summary>
        [Required]
        public IEnumerable<OrderPositionDTO> OrderPositions { get; set; }
    }
}
