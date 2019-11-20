using Microsoft.AspNetCore.Http;

namespace Model.Interfaces.DTO
{
    public interface IPhotoDTO
    {
        IFormFileCollection AddFiles { get; set; }

        IFormFileCollection UpdateFiles { get; set; }

        string RemoveFiles { get; set; }
    }
}
