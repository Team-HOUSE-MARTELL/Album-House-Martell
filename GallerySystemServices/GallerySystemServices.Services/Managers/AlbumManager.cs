using GallerySystemServices.Data;
using GallerySysteServices.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace GallerySystemServices.Services.Managers
{
    public class AlbumManager
    {

        public Album CreateAlbum(Album album, User user)
        {
            var dbContext = new GallerySystemServicesContext();

            using (dbContext)
            {
                dbContext.Albums.Add(album);
                dbContext.Users.Attach(user);
                user.Albums.Add(album);
                dbContext.SaveChanges();

                return album;
            }
        }

        public Album GetAlbumById(int id)
        {
            var dbContext = new GallerySystemServicesContext();

            using (dbContext)
            {
                return dbContext.Albums.Include(a=>a.User).FirstOrDefault(a => a.Id == id);
            }
        }

        public Album EditAlbum(Album album)
        {
            var dbContext = new GallerySystemServicesContext();

            using (dbContext)
            {
                dbContext.Albums.Attach(album);
                dbContext.SaveChanges();
            }

            return album;
        }
    }
}