using System;
using System.Security.Claims;

namespace Core.Helpers
{
    public static class ClaimHelper
    {
        public const string UserIdDefault = "OurGarden/User.UserId";

        public static int GetUserId(this ClaimsPrincipal claims)
        {
            var success = Int32.TryParse(claims.FindFirstValue(UserIdDefault), out var userId);

            return success
                ? userId
                : throw new Exception("UserId is not found");
        }

        public static string GetUserRole(this ClaimsPrincipal claims) => claims
            .FindFirstValue(ClaimsIdentity.DefaultRoleClaimType);
    }
}
