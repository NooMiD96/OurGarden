using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Model.DB
{
    public class Subcategory
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MaxLength(64)]
        public string Name { get; set; }

        [Required]
        [MaxLength(64)]
        public string Alias { get; set; }

        [Required]
        [ForeignKey("Category")]
        public int CategoryId { get; set; }

        [Required]
        [ForeignKey("Photo")]
        public Guid PhotoId { get; set; }

        [NotMapped]
        public virtual Category Category { get; set; }
        [NotMapped]
        public virtual Photo Photo { get; set; }
        [NotMapped]
        public virtual IEnumerable<Product> Products { get; set; }
    }
}
