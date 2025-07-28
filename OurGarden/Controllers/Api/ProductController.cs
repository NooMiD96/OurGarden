using ApiService.Abstraction.DTO;
using Core;
using DataBase.Abstraction;
using DataBase.Abstraction.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Services;

namespace Web.Controllers.Api;

[Route("api/[controller]")]
[ApiController]
public class ProductController(IOurGardenRepository repository, ILogger<ProductController> logger) : BaseController
{
    [HttpGet("[action]")]
    public async Task<IActionResult> GetBreadcrumb([FromQuery] string categoryId,
                                                   [FromQuery] string subcategoryId,
                                                   [FromQuery] string productId)
    {
        if (String.IsNullOrEmpty(categoryId) || String.IsNullOrEmpty(subcategoryId))
        {
            var msg = $"Что-то пошло не так, не удалось получить Breadcrumb для продукта, так как отсутствует категория и подкатегория.";
            logger.LogError(msg);
            return BadRequest(msg);
        }

        var breadcrumb = String.IsNullOrEmpty(productId)
            ? await repository.GetProductBreadcrumb(categoryId, subcategoryId)
            : await repository.GetProductBreadcrumb(categoryId, subcategoryId, productId);

        var order = 1;

        var breadcrumbList = new List<IBreadcrumb>()
        {
            new BreadcrumbDTO()
            {
                DisplayName = "Каталог",
                Url = "Catalog",
                Order = order++,
            },
        };

        breadcrumbList.AddRange(
            breadcrumb.Select(x =>
            {
                x.Order = order++;
                return x;
            })
        );

        return Success(breadcrumbList);
    }

    [HttpGet("[action]")]
    public async Task<IActionResult> GetProducts([FromQuery] string categoryId, [FromQuery] string subcategoryId)
    {
        if (String.IsNullOrEmpty(categoryId) || String.IsNullOrEmpty(subcategoryId))
        {
            var msg = "Что-то пошло не так, необходимо выбрать категорию с подкатегорией.";
            logger.LogError(msg);
            return BadRequest(msg);
        }

        var subcategory = (await repository.GetSubcategory(categoryId, subcategoryId)).DeepClone();

        if (subcategory is null)
        {
            var msg = $"Что-то пошло не так, не удалось найти выбранную подкатегорию. Категория: \"{categoryId}\". Подкатегория: \"{subcategoryId}\"\nREQUEST-PATH: {Request.Path}{Request.QueryString}";
            logger.LogError(msg);
            return BadRequest(msg);
        }

        var products = await repository.GetProducts(categoryId, subcategoryId, isGetOnlyVisible: true);

        subcategory.Products = products
            .OrderBy(x => x.Alias)
            .Select(x =>
            {
                x.Subcategory = null;
                return x;
            })
            .ToList();

        return Success(subcategory);
    }

    [HttpGet("[action]")]
    public async Task<IActionResult> GetProduct([FromQuery]string categoryId,
                                                [FromQuery]string subcategoryId,
                                                [FromQuery]string productId)
    {
        if (String.IsNullOrEmpty(categoryId) || String.IsNullOrEmpty(subcategoryId) || String.IsNullOrEmpty(productId))
        {
            var msg = "Что-то пошло не так, необходимо выбрать категорию, подкатегорию и товар.";
            logger.LogError(msg);
            return BadRequest(msg);
        }

        var product = await repository.GetProduct(categoryId, subcategoryId, productId);

        if (product == null)
        {
            var msg = $"Что-то пошло не так, не удалось найти выбранный товар. Категория: \"{categoryId}\". Подкатегория: \"{subcategoryId}\". Товар: \"{productId}\"\nREQUEST-PATH: {Request.Path}{Request.QueryString}";
            logger.LogError(msg);
            return BadRequest(msg);
        }

        return Success(product);
    }
}
