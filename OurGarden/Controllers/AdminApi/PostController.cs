using Database.Contexts;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

using Model.Identity;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web.Controllers.AdminApi
{
    //[ValidateAntiForgeryToken]
    //[Authorize(Roles = UserRoles.Admin + ", " + UserRoles.Employee)]
    //[Route("api/[controller]")]
    //[ApiController]
    //public class PostController : BaseController
    //{
    //    private readonly KindergartenContext _context;
    //    private readonly UserManager<ApplicationUser> _userManager;

    //    public PostController([FromServices] KindergartenContext context, [FromServices] UserManager<ApplicationUser> userManager)
    //    {
    //        _context = context;
    //        _userManager = userManager;
    //    }

    //    [HttpPost("[action]")]
    //    public async Task<IActionResult> CreateOrEdit([FromQuery] int postId, [FromBody] PostBase post)
    //    {
    //        var user = await _userManager.GetUserAsync(User);

    //        if (postId <= 0)
    //        {
    //            await _context.AddNewPostAsync(post, user);
    //        }
    //        else
    //        {
    //            await _context.EditPostAsync(post, postId);
    //        }

    //        return Success(true);
    //    }
    //    [HttpDelete("[action]")]
    //    public async Task<IActionResult> DeleteCommentList([FromQuery] int postId, [FromBody] List<int> commentListId)
    //    {
    //        await _context.DeleteCommentListAsync(postId, commentListId);

    //        return Success(true);
    //    }

    //    [HttpDelete("[action]")]
    //    public async Task<IActionResult> DeletePost([FromQuery] int postId)
    //    {
    //        var isSuccess = await _context.DeletePostAsync(postId);

    //        return Success(isSuccess);
    //    }
    //}
}
