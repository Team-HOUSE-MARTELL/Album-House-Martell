using GallerySystemServices.Services.Models;
using GallerySystemServices.Services.Services;
using GallerySystemServices.Services.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace GallerySystemServices.Services.Controllers
{
    public class UserController : ApiController
    {
        private const string NOT_LOGGED = "You are not logged in!";

        [HttpPost]
        [ActionName("register")]

        public HttpResponseMessage PostRegisterUser (UserModel userModel)
        {
            try
            {
                var userService = new UserService();

                var newUser = userService.RegisterUser(userModel);
                var userToReturn = ModelCreator.CreateUserModel(newUser);

                var response = this.Request.CreateResponse(HttpStatusCode.OK, userToReturn);

                return response;
            }
            catch(Exception ex)
            {
                var response = this.Request.CreateResponse(HttpStatusCode.BadRequest,ex.Message);
                return response;
            }
        }

        [HttpGet]
        [ActionName("getUser")]
        public HttpResponseMessage GetUserBySessionKey(string sessionKey)
        {
            try
            {
                var userService = new UserService();
                var user = userService.GetUserBySessionKey(sessionKey);
                if (user == null)
                {
                    throw new Exception(NOT_LOGGED);
                }

                var userToReturn = ModelCreator.CreateUserModel(user);

                var response = this.Request.CreateResponse(HttpStatusCode.OK, userToReturn);

                return response;
            }
            catch (Exception ex)
            {
                var response = this.Request.CreateResponse(HttpStatusCode.BadRequest,ex.Message);
                return response;
            }
        }
    }
}
