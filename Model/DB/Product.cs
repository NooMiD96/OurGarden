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
        [MaxLength(128)]
        public string ProductId { get; set; }
        [Required]
        [MaxLength(64)]
        public string SubcategoryId { get; set; }
        [Required]
        [MaxLength(64)]
        public string CategoryId { get; set; }

        [Required]
        [MaxLength(128)]
        public string Alias { get; set; }

        [Required]
        public double Price { get; set; }

        public string Descriprion { get; set; }

        //Parent
        public Subcategory Subcategory { get; set; }
        //Childrens
        public ICollection<Photo> Products { get; set; }

    }
}
