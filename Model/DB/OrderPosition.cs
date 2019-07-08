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

        public Product Product { get; set; }
    }
}
