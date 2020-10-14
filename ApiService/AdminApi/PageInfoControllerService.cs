using ApiService.Abstraction.AdminApi;
using ApiService.Abstraction.DTO;
using ApiService.Abstraction.Model;

using DataBase.Abstraction.Model;
using DataBase.Abstraction.Repositories;

using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApiService.AdminApi
{
    public class PageInfoControllerService : IPageInfoControllerService
    {
        #region Fields

        /// <summary>
        /// Репо БД
        /// </summary>
        private readonly IOurGardenRepository _repository;

        /// <summary>
        /// Логгер
        /// </summary>
        private readonly ILogger _logger;

        #endregion

        #region .ctor

        /// <summary>
        /// .ctor
        /// </summary>
        public PageInfoControllerService(ILogger<PageInfoControllerService> logger,
                                         IOurGardenRepository repository)
        {
            _repository = repository;
            _logger = logger;
        }

        #endregion

        #region IPageInfoControllerService Impl

        /// <inheritdoc/>
        public async Task<ServiceExecuteResult<IEnumerable<PageInfo>>> GetPageInfos()
        {
            try
            {
                var pages = await _repository.GetPageInfos();

                return new ServiceExecuteResult<IEnumerable<PageInfo>>
                {
                    IsSuccess = true,
                    Result = pages
                };
            }
            catch (Exception ex)
            {
                var msg = $"Не удалось получить список страниц. ${ex.Message}";
                _logger.LogError(ex, msg);

                return new ServiceExecuteResult<IEnumerable<PageInfo>>
                {
                    IsSuccess = false,
                    Error = msg
                };
            }
        }

        /// <inheritdoc/>
        public Task<ServiceExecuteResult<bool>> AddOrUpdate(PageInfoDTO pageInfoDTO)
        {
            return Task.FromResult(new ServiceExecuteResult<bool>
            {
                IsSuccess = false,
                Error = "Данный функционал ещё не доступен"
            });

            try
            {
                if (pageInfoDTO.PageInfoId == 0)
                {
                    //_repository.AddPageInfo(

                    //);
                }
                else
                {

                }
            }
            catch (Exception ex)
            {

                throw;
            }

            //try
            //{
            //    bool isSuccess;

            //    if (
            //        String.IsNullOrEmpty(productDTO?.CategoryId)
            //        || String.IsNullOrEmpty(productDTO?.SubcategoryId)
            //        || String.IsNullOrEmpty(productDTO?.ProductId)
            //    )
            //    {
            //        (isSuccess, error) = await _service.AddProduct(productDTO);
            //    }
            //    else
            //    {
            //        var oldProduct = await _repository.GetProduct(productDTO.CategoryId, productDTO.SubcategoryId, productDTO.ProductId);

            //        if (oldProduct is null)
            //        {
            //            return LogBadRequest(
            //                _logger,
            //                API_LOCATE,
            //                customError: $"Что-то пошло не так, не удалось найти товар.\n\tКатегория: {productDTO.CategoryId}\n\tПодкатегория: {productDTO.SubcategoryId}\n\tТовар: {productDTO.ProductId}"
            //            );
            //        }

            //        if (
            //            productDTO.Alias.TransformToId() != oldProduct.Alias.TransformToId()
            //            || productDTO.CategoryId != productDTO.NewCategoryId
            //            || productDTO.SubcategoryId != productDTO.NewSubcategoryId
            //        )
            //        {
            //            (isSuccess, error) = await _service.FullUpdateProduct(productDTO, oldProduct);
            //        }
            //        else
            //        {
            //            (isSuccess, error) = await _service.UpdateProduct(productDTO, oldProduct);
            //        }
            //    }

            //    if (!isSuccess)
            //        return LogBadRequest(
            //            _logger,
            //            API_LOCATE,
            //            customError: error
            //        );

            //    return Success(isSuccess);
            //}
            //catch (Exception ex)
            //{
            //    return LogBadRequest(
            //        _logger,
            //        API_LOCATE,
            //        exception: ex,
            //        customError: error
            //    );
            //}
        }

        /// <inheritdoc/>
        public Task<ServiceExecuteResult<bool>> DeletePageInfo(int pageInfoId)
        {
            return Task.FromResult(new ServiceExecuteResult<bool>
            {
                IsSuccess = false,
                Error = "Данный функционал ещё не доступен"
            });
        }

        #endregion
    }
}
