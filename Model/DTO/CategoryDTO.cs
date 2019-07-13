﻿using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Model.DTO
{
    public class CategoryDTO
    {
        public string CategoryId { get; set; }

        [MaxLength(64)]
        public string Alias { get; set; }

        public IFormFile Photo { get; set; }
    }
}
