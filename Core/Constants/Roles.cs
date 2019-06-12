using System.Collections.Generic;

namespace Core.Constants
{
    public static class UserRoles
    {
        public const string Admin       = "Admin";
        public const string Employee    = "Employee";
        public const string User        = "User";
        public const string Guest       = "Guest";

        public static IEnumerable<string> RoleList
        {
            get
            {
                return new[]
                {
                    Admin,
                    Employee,
                    User,
                    Guest
                };
            }
        }
    }
}
