using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Model.DB
{
    public class Status
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MaxLength(128)]
        public string Name { get; set; }
    }
}
