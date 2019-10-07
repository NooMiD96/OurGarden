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
        [MaxLength(64)]
        public string SubcategoryId { get; set; }

        [Required]
        [MaxLength(64)]
        public string CategoryId { get; set; }

        [Required]
        [MaxLength(64)]
        public string Alias { get; set; }

        [Required]
        public bool? IsVisible { get; set; }

        //Parent
        public Category Category { get; set; }

        //Childrens
        public Photo Photo { get; set; }
        public ICollection<Product> Products { get; set; }
    }
}
