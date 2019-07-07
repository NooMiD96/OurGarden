using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Model.DB
{
    public class Galery
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MaxLength(128)]
        public string Name { get; set; }

        [Required]
        [MaxLength(128)]
        public string Alias { get; set; }

        [Required]
        [MaxLength(256)]
        public string Description { get; set; }

        public virtual IEnumerable<Photo> Photos { get; set; }
    }
}
