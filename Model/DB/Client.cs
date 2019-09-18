using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model.DB
{
    public class Client
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ClientId { get; set; }

        [Required]
        [Phone]
        [MaxLength(16)]
        public string Phone { get; set; }

        [EmailAddress]
        [MaxLength(64)]
        public string Email { get; set; }

        [Required]
        [MaxLength(128)]
        public string FIO { get; set; }
    }
}
