﻿using Database.Repositories;

using Microsoft.AspNetCore.Mvc;
using Model.DB;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : BaseController
    {
        private readonly IOurGardenRepository _repository;

        public HomeController([FromServices] IOurGardenRepository repository)
        {
            _repository = repository;
        }

        //todo: убрать
        [HttpGet("[action]")]
        public IActionResult GetNewsList()
        {
            var any1 = new
            {
                id = 0,
                title = "Title 1",
                date = DateTime.Parse("2019-07-06T15:00:00"),
                description = "Test title 1 record",
                photo = "http://xn----7sbbgjb4cubzsm.xn--p1ai/uploads/catalog/mini/0bb6dac67c3d9659eaeb416f74b428bb.jpg"
            };

            var any2 = new
            {
                id = 1,
                title = "Title 2",
                date = DateTime.Parse("2019-07-06T16:00:00"),
                description = "Test title 2 record",
                photo = "http://xn----7sbbgjb4cubzsm.xn--p1ai/uploads/catalog/mini/b09422b13492b92718db06ac132f3397.jpg"
            };

            return Success(new List<object>() { any1, any2 });
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllNews()
        {
            var news = await _repository.GetNews();
            return Ok(news);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetNews(
            [FromQuery]int newsId)
        {
            var news = await _repository.GetNews(newsId);

            if (news == null)
                return BadRequest();

            return Ok(news);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetCategories()
        {
            var result = await _repository.GetCategories();

            return Success(result);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetSubcategories([FromQuery] string categoryId)
        {
            if (String.IsNullOrEmpty(categoryId))
            {
                return BadRequest();
            }

            var result = await _repository.GetSubcategories(categoryId);
            return Success(result);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetProducts([FromQuery] string categoryId, [FromQuery] string subcategoryId)
        {
            if (String.IsNullOrEmpty(categoryId) || String.IsNullOrEmpty(subcategoryId))
            {
                return BadRequest();
            }

            var result = await _repository.GetProducts(categoryId, subcategoryId);
            return Success(result);
        }


        [HttpGet("[action]")]
        public async Task<IActionResult> GetProduct(
            [FromQuery]string categoryId,
            [FromQuery]string subcategoryId,
            [FromQuery]string productId)
        {

            if (String.IsNullOrEmpty(categoryId) || String.IsNullOrEmpty(subcategoryId) || String.IsNullOrEmpty(productId))
            {
                return BadRequest();
            }

            var product = await _repository.GetProduct(productId, subcategoryId, categoryId);

            if (product == null)
                return BadRequest();

            return Ok(product);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> SearchProduct([FromQuery] string search)
        {
            if (String.IsNullOrEmpty(search))
            {
                return BadRequest();
            }
            var result = await _repository.GetSearchProducts(search);
            return Ok(result);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetGalleries()
        {
            var galleries = await _repository.GetGalleries();
            return Ok(galleries);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetGallery(
            [FromQuery]int galleryId)
        {
            var gallery = await _repository.GetGallery(galleryId);

            if (gallery == null)
                return BadRequest();

            return Ok(gallery);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddOrder(
            [FromForm]Order order)
        {
            //todo: убрать Requared у CreationDate
            order.Date = DateTime.Now;
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                await _repository.AddOrder(order);
                return Ok(order);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAllVideo()
        {
            var video = await _repository.GetVideo();
            return Ok(video);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetVideo(
            [FromQuery]int videoId)
        {
            var video = await _repository.GetVideo(videoId);

            if (video == null)
                return BadRequest();

            return Ok(video);
        }
    }
}
