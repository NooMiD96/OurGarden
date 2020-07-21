using ApiService.Abstraction.DTO;
using ApiService.Abstraction.Model;

using DataBase.Abstraction.Model;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApiService.Abstraction.AdminApi
{
    public interface IPageInfoControllerService
    {
        public Task<ServiceExecuteResult<IEnumerable<PageInfo>>> GetPageInfos();

        public Task<ServiceExecuteResult<bool>> AddOrUpdate(PageInfoDTO pageInfoDTO);

        public Task<ServiceExecuteResult<bool>> DeletePageInfo(int pageInfoId);
    }
}
