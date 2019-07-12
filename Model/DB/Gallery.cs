using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Model.DB
{
    public class Gallery
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int GaleryId { get; set; }

        [Required]
        [MaxLength(128)]
        public string Name { get; set; }

        [Required]
        [MaxLength(128)]
        public string Alias { get; set; }

        [Required]
        [MaxLength(256)]
        public string Description { get; set; }

        public ICollection<Photo> Photos { get; set; }
    }
}
