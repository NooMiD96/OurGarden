using Microsoft.AspNetCore.Identity;

namespace DataBase.Abstraction.Identity
{
    public class ApplicationUser: IdentityUser
    {
        public ApplicationUser() : base() { }
        public ApplicationUser(string UserName) : base(UserName) { }

        public bool IsAdmin { get; set; }
    }
}
