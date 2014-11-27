﻿using GallerySysteServices.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GallerySystemServices.Services.Models
{
    public class PictureModel
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public DateTime CreateDate { get; set; }

        public string Description { get; set; }

        public string Url { get; set; }

        public int Votes { get; set; }

        public string Comments { get; set; }
    }
}