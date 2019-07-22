﻿using Core.Constants;

using Database.Repositories;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Model.DB;

using System;
using System.Threading.Tasks;

namespace Web.Controllers.AdminApi
{
    [ValidateAntiForgeryToken]
    [Authorize(Roles = UserRoles.Admin + ", " + UserRoles.Employee)]
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        public readonly IOurGardenRepository _repository;
        public OrderController(IOurGardenRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetOrders()
        {
            var news = await _repository.GetOrders();
            return Ok(news);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetOrder(
            [FromQuery]int orderId)
        {
            var order = await _repository.GetOrder(orderId);

            if (order == null)
                return BadRequest();

            return Ok(order);
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

        [HttpPut("[action]")]
        public async Task<IActionResult> UpdateOrder(
            [FromQuery]int orderId,
            [FromQuery]int statusId,
            [FromQuery]string description)
        {
            try
            {
                var order = await _repository.GetOrder(orderId);
                if (order == null)
                {
                    return NotFound();
                }

                var status = await _repository.GetStatus(statusId);
                if (status == null)
                {
                    return NotFound();
                }
                order.Status = status;
                order.Description = description;

                await _repository.UpdateOrder(order);

                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteOrder(
            [FromQuery]int orderId)
        {
            await _repository.DeleteNews(orderId);
            return Ok();
        }
    }
}