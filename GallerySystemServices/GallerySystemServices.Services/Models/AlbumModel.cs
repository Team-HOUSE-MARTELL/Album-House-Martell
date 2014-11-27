using GallerySysteServices.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GallerySystemServices.Services.Models
{
    public class AlbumModel
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public DateTime CreatedAt { get; set; }

        public ICollection<PictureModel> Picture { get; set; }

        public int Votes { get; set; }

        public string Comments { get; set; }

        public UserModel User { get; set; }
    }
}