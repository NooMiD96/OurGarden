using Microsoft.AspNetCore.Identity;

using System;

namespace Model.Identity
{
    public class LoginModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }

        public bool IsValid(out IdentityError error)
        {
            error = null;
            if (String.IsNullOrEmpty(UserName))
            {
                error = new IdentityError()
                {
                    Description = "UserName can't be empty"
                };
                return false;
            }
            if (String.IsNullOrEmpty(Password))
            {
                error = new IdentityError()
                {
                    Description = "Password can't be empty"
                };
                return false;
            }
            return true;
        }
    }
}
