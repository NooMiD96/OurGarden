using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Model.DB
{
    public class Product
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MaxLength(128)]
        public string Title { get; set; }

        [Required]
        [MaxLength(128)]
        public string Alias { get; set; }

        [Required]
        public double Price { get; set; }

        public string VendorCode { get; set; }

        public string Manufacturer { get; set; }

        public string Descriprion { get; set; }

        [Required]
        [ForeignKey("Subcategory")]
        public int SubcategoryId { get; set;}

        public virtual Subcategory Subcategory { get; set; }
    }
}
