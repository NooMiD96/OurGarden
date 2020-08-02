using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataBase.Abstraction.Model
{
    public class Gallery : IPhoto
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int GalleryId { get; set; }

        [Required]
        [MaxLength(256)]
        public string NormalizeAlias { get; set; }

        [Required]
        [MaxLength(128)]
        public string Alias { get; set; }

        [Required]
        public bool? IsVisible { get; set; }

        public ICollection<Photo> Photos { get; set; }
    }
}
