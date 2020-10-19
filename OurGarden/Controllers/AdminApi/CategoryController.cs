using ApiService.Abstraction.AdminApi;
using ApiService.Abstraction.DTO;

using Core.Constants;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using System.Threading.Tasks;

namespace Web.Controllers.AdminApi
{
    [ValidateAntiForgeryToken]
    [Authorize(Roles = UserRoles.Admin + ", " + UserRoles.Employee)]
    [Route("apiAdmin/[controller]")]
    [ApiController]
    public class CategoryController : BaseController
    {
        #region Fields

        private readonly ICategoryControllerService _service;

        #endregion

        #region .ctor

        public CategoryController(ICategoryControllerService service)
        {
            _service = service;
        }

        #endregion

        #region API

        [HttpGet("[action]")]
        public async Task<IActionResult> GetCategories()
        {
            var execResult = await _service.GetCategories();

            if (execResult.IsSuccess)
                return Success(execResult.Result);
            else
                return BadRequest(execResult.Error);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddOrUpdate([FromForm]CategoryDTO categoryDTO)
        {
            var execResult = await _service.AddOrUpdate(categoryDTO);

            if (execResult.IsSuccess)
                return Success(execResult.Result);
            else
                return BadRequest(execResult.Error);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Delete([FromQuery]string categoryId)
        {
            var execResult = await _service.DeleteCategory(categoryId);

            if (execResult.IsSuccess)
                return Success(execResult.Result);
            else
                return BadRequest(execResult.Error);
        }

        #endregion
    }
}