using GallerySystemServices.Data;
using GallerySysteServices.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace GallerySystemServices.Services.Managers
{
    public class UserManager
    {
        public User RegisterUser (User user)
        {
            var dbContext = new GallerySystemServicesContext();

            using(dbContext)
            {
                dbContext.Users.Add(user);
                dbContext.SaveChanges();

                return user;
            }
        }

        public User GetUserByUserName(string userName)
        {
            var dbContext = new GallerySystemServicesContext();

            using(dbContext)
            {
                return dbContext.Users.FirstOrDefault(u => u.UserName == userName);
            }
        }

        public User GetUserBySessionKey(string sessionKey)
        {
            var dbContext = new GallerySystemServicesContext();

            using (dbContext)
            {
                return dbContext.Users.FirstOrDefault(u => u.SessionKey == sessionKey);
            }
        }

        public User SetUserSessionKey(User user, string sessionKey)
        {
            var dbContext = new GallerySystemServicesContext();

            using(dbContext)
            {
                dbContext.Users.Attach(user);
                user.SessionKey = sessionKey;
                dbContext.SaveChanges();

                return user;
            }
        }
    }
}