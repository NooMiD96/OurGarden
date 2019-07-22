using Model.DTO;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Model.DB
{
    public class Order
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderId { get; set; }

        [Required]
        [Phone]
        [MaxLength(16)]
        public string Phone { get; set; }

        [EmailAddress]
        [MaxLength(64)]
        public string Email { get; set; }

        [Required]
        [MaxLength(128)]
        public string FIO { get; set; }

        [Required]
        public DateTime Date { get; set; }

        public string Description { get; set; }

        [Required]
        public double TotalPrice { get; set; }

        public ICollection<OrderPosition> OrderPositions { get; set; }

        public OrderStatus Status { get; set; }
    }
}
