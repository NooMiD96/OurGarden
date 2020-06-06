using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataBase.Abstraction.Model
{
    public class Category : IAlias, IPhoto, ISeoInformation
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        [MaxLength(64)]
        public string CategoryId { get; set; }

        [Required]
        [MaxLength(64)]
        public string Alias { get; set; }

        [Required]
        public bool? IsVisible { get; set; }

        public string Description { get; set; }

        [MaxLength(128)]
        public string SeoTitle { get; set; }

        [MaxLength(256)]
        public string SeoDescription { get; set; }

        [MaxLength(512)]
        public string SeoKeywords { get; set; }

        //Childrens
        public ICollection<Subcategory> Subcategories { get; set; }
        public ICollection<Photo> Photos { get; set; }
    }
}
