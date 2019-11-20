using Model.Interfaces.DB;

using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Model.DB
{
    public class Product : IPhoto
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

        public string Description { get; set; }

        [Required]
        public bool? IsVisible { get; set; }

        //Parent
        public Subcategory Subcategory { get; set; }
        //Childrens
        public ICollection<Photo> Photos { get; set; }

    }
}
