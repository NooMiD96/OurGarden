using Microsoft.AspNetCore.Identity;

namespace Model.Identity
{
    public class ApplicationUser: IdentityUser
    {
        public ApplicationUser() : base() { }
        public ApplicationUser(string UserName) : base(UserName) { }

        public bool IsAdmin { get; set; }
    }
}
