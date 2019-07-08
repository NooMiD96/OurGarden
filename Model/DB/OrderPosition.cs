using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Model.DB
{
    public class OrderPosition
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [ForeignKey("TitleToSubcategory_Product")]
        public int ProductId { get; set; }

        [Required]
        public int Number { get; set; }

        [NotMapped]
        public virtual Product Product { get; set; }
    }
}
