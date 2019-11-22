using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model.DB
{
    public class News
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int NewsId { get; set; }

        [Required]
        [MaxLength(128)]
        public string Title { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        [MaxLength(128)]
        public string Alias { get; set; }

        [Required]
        public string Description { get; set; }

        public Photo Photo { get; set; }
    }
}
