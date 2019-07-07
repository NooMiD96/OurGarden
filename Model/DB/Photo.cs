using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Model.DB
{
    public class Photo
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(128)]
        public string Name { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        [MaxLength(256)]
        public string Url { get; set; }

        [Required]
        [ForeignKey("Galery")]
        public int GaleryId { get; set; }

        [Required]
        [ForeignKey("TitleToSubcategory_Product")]
        public int ProductId { get; set; }

        public virtual Product Product { get; set; }
        public virtual Galery Galery { get; set; }
        public virtual News News { get; set; }
    }
}
