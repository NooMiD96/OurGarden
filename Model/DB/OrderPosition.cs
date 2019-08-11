using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Model.DB
{
    public class OrderPosition
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderPositionId { get; set; }

        [Required]
        public int Number { get; set; }

        [Required]
        public string ProductId { get; set; }
        [Required]
        public string SubcategoryId { get; set; }
        [Required]
        public string CategoryId { get; set; }

        [Required]
        public Product Product { get; set; }

        [Required, ForeignKey(nameof(Order))]
        public int OrderId { get; set; }
        public Order Order { get; set; }
    }
}
