using Microsoft.AspNetCore.Identity;

namespace DataBase.Abstraction.Identity
{
    public class ApplicationRole: IdentityRole
    {
        public ApplicationRole() : base() { }
        public ApplicationRole(string RoleName) : base(RoleName) { }
    }
}
