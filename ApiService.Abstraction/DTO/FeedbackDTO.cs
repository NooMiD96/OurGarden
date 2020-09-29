using System.ComponentModel.DataAnnotations;

namespace ApiService.Abstraction.DTO
{
    /// <summary>
    /// Модель отправки письма (обратная связь)
    /// </summary>
    public class FeedbackDTO
    {
        [Required]
        public string FirstName { get; set; }

        public string SecondName { get; set; }

        [Required]
        public string Email { get; set; }

        public string Phone { get; set; }

        [Required]
        public string Message { get; set; }

        public string FIO {
            get => $"{FirstName} {SecondName ?? ""}".Trim();
        }
    }
}
