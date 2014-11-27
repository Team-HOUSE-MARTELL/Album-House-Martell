using GallerySystemServices.Services.Models;
using GallerySystemServices.Services.Services;
using GallerySystemServices.Services.Utils;
using GallerySysteServices.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace GallerySystemServices.Services.Controllers
{
    public class AlbumController : ApiController
    {
        private const string USER_ACCESS_DENIED = "Access Denied Ebalnik!";

        [HttpPost]
        [ActionName("createAlbum")]

        public HttpResponseMessage PostCreateAlbum(AlbumModel albumModel, string sessionKey)
        {
            try
            {
                var userService = new UserService();
                var user = userService.GetUserBySessionKey(sessionKey);

                if (user == null)
                {
                    throw new Exception(USER_ACCESS_DENIED);
                }

                var albumService = new AlbumService();
                var newAlbum = albumService.CreateAlbum(albumModel, user);

                var userModel = ModelCreator.CreateUserModel(user);

                albumModel = new AlbumModel();
                albumModel.Title = newAlbum.Title;
                albumModel.Id = newAlbum.Id;
                albumModel.User = userModel;
                albumModel.CreatedAt = newAlbum.CreatedAt;

                return this.Request.CreateResponse(HttpStatusCode.Created , albumModel);

            }
            catch (Exception ex)
            {
                return this.Request.CreateResponse(HttpStatusCode.BadRequest , ex.Message);
            }
                            
        }

        //[HttpPost]
        //[ActionName("addComment")]

        //public HttpResponseMessage 

        [HttpPut]
        [ActionName("editAlbum")]

        public HttpResponseMessage PutEditAlbum (int albumId, AlbumModel albumModel, string sessionKey)
        {
            try
            {
                var userService = new UserService();
                var user = userService.GetUserBySessionKey(sessionKey);

                if (user == null)
                {
                    throw new Exception("Cannot edit album");
                }

                var albumService = new AlbumService();
                var album = albumService.GetAlbumById(albumId);

                if (album.User.Id != user.Id)
                {
                    throw new Exception("Access Denied");
                }

                var userModel = ModelCreator.CreateUserModel(user);

                var albumToReturn = new AlbumModel();
                albumToReturn.Title = album.Title;
                albumToReturn.User = userModel;
                albumToReturn.Id = album.Id;
                albumToReturn.CreatedAt = album.CreatedAt;


                return this.Request.CreateResponse(HttpStatusCode.OK, albumToReturn);
            }
            catch (Exception ex)
            {
                return this.Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }
    }
}
