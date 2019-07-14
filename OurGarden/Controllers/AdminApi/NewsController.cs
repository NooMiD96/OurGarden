﻿using Core.Constants;

using Database.Repositories;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Model.DB;

using System;
using System.Threading.Tasks;

namespace Web.Controllers.AdminApi
{
    //[ValidateAntiForgeryToken]
    //[Authorize(Roles = UserRoles.Admin + ", " + UserRoles.Employee)]
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        public readonly IOurGardenRepository _repository;
        public NewsController(IOurGardenRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetNews()
        {
            var news = _repository.GetNews();
            return Ok(news);
        }

        [HttpGet("{newsId}")]
        public async Task<IActionResult> GetNews(
            [FromRoute]int newsId)
        {
            var news = _repository.GetNews(newsId);

            if (news == null)
                return BadRequest();

            return Ok(news);
        }

        [HttpPost]
        public async Task<IActionResult> AddNews(
            [FromForm]News news)
        {
            if (!ModelState.IsValid || news.File?.Length == 0)
            {
                return BadRequest();
            }

            try
            {
                var fileHelper = new FileHelper(_repository);
                news.Photo = fileHelper.AddFileToRepository(news.File);

                _repository.AddNews(news);
                return Ok(news);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateNews(
            [FromForm]News news)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }

                if (news.File?.Length != 0)
                {
                    var fileHelper = new FileHelper(_repository);
                    news.Photo = fileHelper.AddFileToRepository(news.File);
                }
                _repository.UpdateNews(news);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpDelete("{newsId}")]
        public async Task<IActionResult> DeleteNews(
            [FromRoute]int newsId)
        {
            _repository.DeleteNews(newsId);
            return Ok();
        }
    }
}