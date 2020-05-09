using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataBase.Abstraction.Model
{
    public class OrderStatus
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int StatusId { get; set; }

        [Required]
        [MaxLength(128)]
        public string Name { get; set; }
    }

    public enum OrderStatusEnum
    {
        New = 1,
        Confirmed = 2,
        Sended = 3,
        WaitClient = 4,
        Closed = 5,
        Canceled = -1
    }
}
