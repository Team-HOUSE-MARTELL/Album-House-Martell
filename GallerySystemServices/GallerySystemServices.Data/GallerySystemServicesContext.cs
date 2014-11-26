namespace GallerySystemServices.Data
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using GallerySysteServices.Models;

    public class GallerySystemServicesContext : DbContext
    {
        public GallerySystemServicesContext()
            : base("GallerySystemDb")
        {

        }

        public DbSet<User> Users { get; set; }

        public DbSet<Album> Albums { get; set; }

        public DbSet<Picture> Pictures { get; set; }

    }
}
