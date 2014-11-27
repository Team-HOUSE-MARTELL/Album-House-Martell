using GallerySystemServices.Services.Managers;
using GallerySystemServices.Services.Models;
using GallerySysteServices.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GallerySystemServices.Services.Services
{
    public class AlbumService
    {
        private AlbumManager albumManager;

        public AlbumService() 
        {
            this.albumManager = new AlbumManager();
        }

        public Album CreateAlbum(AlbumModel albumModel, User user)
        {
            var album = new Album();
            album.Title = albumModel.Title;
            album.CreatedAt = DateTime.Now; 
            var newAlbum = albumManager.CreateAlbum(album, user);

            return newAlbum;
        }

        public Album GetAlbumById(int Id)
        {
            var album = this.albumManager.GetAlbumById(Id);
            if(album == null)
            {
                throw new ArgumentException("Album not found");
            }

            return album;
        }

        public Album EditAlbum(Album album, AlbumModel newAlbumData)
        {
            album.Title = newAlbumData.Title;
            return this.albumManager.EditAlbum(album);
        }
    }
}