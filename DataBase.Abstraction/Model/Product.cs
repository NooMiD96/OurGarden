using PhotoService.Abstraction.Model;

using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DataBase.Abstraction.Model
{
    public class Product : IAlias, IPhoto, ISeoInformation
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

        [MaxLength(128)]
        public string SeoTitle { get; set; }

        [MaxLength(256)]
        public string SeoDescription { get; set; }

        [MaxLength(512)]
        public string SeoKeywords { get; set; }

        //Parent
        public Subcategory Subcategory { get; set; }
        //Childrens
        public ICollection<Photo> Photos { get; set; }

    }
}
