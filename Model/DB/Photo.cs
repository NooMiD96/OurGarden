using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model.DB
{
    public class Photo
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid PhotoId { get; set; }

        [Required]
        [MaxLength(128)]
        public string Name { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        [MaxLength(128)]
        public string Url { get; set; }

        [MaxLength(128)]
        public string PreviewUrl { get; set; }
    }
}
