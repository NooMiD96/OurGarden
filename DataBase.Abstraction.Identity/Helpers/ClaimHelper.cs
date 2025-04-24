using System;
using System.Security.Claims;

namespace DataBase.Abstraction.Identity.Helpers
{
    public static class ClaimHelper
    {
        public const string UserIdDefault = "OurGarden/User.UserId";

        public static int GetUserId(this ClaimsPrincipal claims)
        {
            var success = int.TryParse(claims.FindFirstValue(UserIdDefault), out var userId);

            return success
                ? userId
                : throw new Exception("UserId is not found");
        }

        public static string GetUserRole(this ClaimsPrincipal claims) => claims
            .FindFirstValue(ClaimsIdentity.DefaultRoleClaimType);
    }
}
