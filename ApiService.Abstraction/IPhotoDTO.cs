using Microsoft.AspNetCore.Http;

namespace ApiService.Abstraction
{
    public interface IPhotoDTO
    {
        IFormFileCollection AddFiles { get; set; }

        IFormFileCollection UpdateFiles { get; set; }

        string RemoveFiles { get; set; }
    }
}
