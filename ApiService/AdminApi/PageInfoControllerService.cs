using ApiService.Abstraction.AdminApi;
using ApiService.Abstraction.Core;
using ApiService.Abstraction.DTO;
using ApiService.Abstraction.Model;
using ApiService.Core.Admin;

using Core.Helpers;

using DataBase.Abstraction.Model;
using DataBase.Abstraction.Repositories;

using Microsoft.Extensions.Logging;

using PhotoService.Abstraction;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApiService.AdminApi
{
    public class PageInfoControllerService : AdminCRUDService<PageInfo, PageInfoDTO>, IPageInfoControllerService, IAdminCRUDService<PageInfo, PageInfoDTO>
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

        /// <summary>
        /// Сервис сохранения фотографий
        /// </summary>
        private readonly IPhotoSaver _photoSaver;

        /// <summary>
        /// Сервис обновления фотографий у существующего объекта
        /// </summary>
        private readonly IPhotoEntityUpdater _photoEntityUpdater;

        #endregion

        #region .ctor

        /// <summary>
        /// .ctor
        /// </summary>
        public PageInfoControllerService(ILogger<PageInfoControllerService> logger,
                                         IOurGardenRepository repository,
                                         IPhotoSaver photoSaver,
                                         IPhotoEntityUpdater photoEntityUpdater) : base(repository,
                                                                                        photoSaver,
                                                                                        photoEntityUpdater)
        {
            _repository = repository;
            _logger = logger;
            _photoSaver = photoSaver;
            _photoEntityUpdater = photoEntityUpdater;
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
        public async Task<ServiceExecuteResult<bool>> AddOrUpdate(PageInfoDTO entityDTO)
        {
            try
            {
                if (entityDTO.PageInfoId == 0)
                {
                    var (entity, error) = await this.CreateEntity(
                        entityDTO,
                        addEntityDbFunc: _repository.AddPageInfo);

                    if (entity == null)
                    {
                        return new ServiceExecuteResult<bool>
                        {
                            IsSuccess = false,
                            Error = error
                        };
                    }

                    return new ServiceExecuteResult<bool>
                    {
                        IsSuccess = true,
                        Result = true
                    };
                }
                else
                {
                    var oldEntity = await _repository.GetPageInfo(entityDTO.PageInfoId);

                    if (oldEntity is null)
                    {
                        var msg = $"Не удалось найти страницу с идентификатором \"{entityDTO.PageInfoId}\"";
                        if (!entityDTO.IsAliasCanBeEdited)
                        {
                            msg += $"и наименованием \"{entityDTO.Alias}\"";
                        }

                        _logger.LogError(msg);
                        return new ServiceExecuteResult<bool>
                        {
                            IsSuccess = false,
                            Error = msg
                        };
                    }

                    if (entityDTO.IsAliasCanBeEdited)
                    {
                        //await FullUpdate(entityDTO, oldEntity);
                        throw new NotImplementedException();
                    }
                    else
                    {
                        var (isSuccess, error) = await this.UpdateEntity(
                            oldEntity,
                            entityDTO,
                            updateEntityDbFunc: _repository.UpdatePageInfo);

                        return new ServiceExecuteResult<bool>
                        {
                            IsSuccess = isSuccess,
                            Result = isSuccess,
                            Error = error
                        };
                    }
                }
            }
            catch (Exception ex)
            {
                var msg = $"В результате добавления/обновления произошла ошибка: {ex.Message}";
                _logger.LogError($"{msg}\nModel: {JsonHelper.Serialize(entityDTO)}");

                return new ServiceExecuteResult<bool>
                {
                    IsSuccess = false,
                    Error = msg
                };
            }
        }

        /// <inheritdoc/>
        public async Task<ServiceExecuteResult<bool>> DeletePageInfo(int pageInfoId)
        {
            try
            {
                var entity = await _repository.GetPageInfo(pageInfoId);
                if (entity is null)
                {
                    var msg = $"Не удалось удалить страницу с идентификатором \"{pageInfoId}\" так как такой страницы не найдено.";
                    _logger.LogError(msg);

                    return new ServiceExecuteResult<bool>
                    {
                        IsSuccess = false,
                        Error = msg
                    };
                }

                if (!entity.IsAliasCanBeEdited)
                {
                    var msg = $"Не удалось удалить страницу с идентификатором \"{pageInfoId}\" так как данную страницу нельзя удалить.";
                    _logger.LogError(msg);

                    return new ServiceExecuteResult<bool>
                    {
                        IsSuccess = false,
                        Error = msg
                    };
                }

                await Delete(entity);

                return new ServiceExecuteResult<bool>
                {
                    IsSuccess = true,
                    Result = true
                };
            }
            catch (Exception ex)
            {
                var msg = $"Не удалось удалить страницу с идентификатором \"{pageInfoId}\" по след. причине: {ex.Message}";
                _logger.LogError(msg);

                return new ServiceExecuteResult<bool>
                {
                    IsSuccess = false,
                    Error = msg
                };
            }
        }

        #endregion

        #region Private

        /// <summary>
        /// Функция по обновлению полей сущности. Используется во многих местах,
        /// поэтому приведена единая.
        /// </summary>
        /// <param name="entity">Исходный объект</param>
        /// <param name="entityDTO">ДТО</param>
        public override void UpdateEntityObjectAction(PageInfo entity, PageInfoDTO entityDTO)
        {
            entity.Alias = entityDTO.Alias;
            entity.Description = entityDTO.Description;

            entity.SeoTitle = entityDTO.SeoTitle;
            entity.SeoDescription = entityDTO.SeoDescription;
            entity.SeoKeywords = entityDTO.SeoKeywords;
        }

        private Task Delete(PageInfo entity)
        {
            return _repository.DeletePageInfo(entity);
        }

        #endregion
    }
}
