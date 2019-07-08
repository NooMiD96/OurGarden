using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Model.DB
{
    public class Order
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [Phone]
        [MaxLength(16)]
        public string Phone { get; set; }

        [EmailAddress]
        [MaxLength(64)]
        public string Email { get; set; }

        [Required]
        [MaxLength(256)]
        public string FIO { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public double TotalPrice { get; set; }

        [Required]
        [ForeignKey("Status")]
        public int StatusId { get; set; }

        [NotMapped]
        public virtual Status Status { get; set; }
    }
}
