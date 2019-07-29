﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Model.DTO
{
    public class OrderCreateDTO
    {
        [Required]
        [MaxLength(128)]
        public string FIO { get; set; }

        [Required]
        [Phone]
        [MaxLength(16)]
        public string Phone { get; set; }

        [EmailAddress]
        [MaxLength(64)]
        public string Email { get; set; }

        [Required]
        public IEnumerable<OrderPositionDTO> OrderPositions { get; set; }
    }
}
