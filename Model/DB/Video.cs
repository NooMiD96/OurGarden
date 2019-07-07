using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Model.DB
{
    public class Video
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MaxLength(128)]
        public string Title { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        [MaxLength(512)]
        public string Description { get; set; }

        [Required]
        [MaxLength(256)]
        public string Url { get; set; }

    }
}
