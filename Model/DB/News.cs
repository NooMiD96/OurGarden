using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Model.DB
{
    public class News
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MaxLength(128)]
        public string Title { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]

        [MaxLength(128)]
        public string Alias { get; set; }

        [Required]
        [MaxLength(512)]
        public string Description { get; set; }

        [ForeignKey("Photo")]
        public int PhotoId { get; set; }

        public virtual Photo Photo { get; set; }
    }
}
