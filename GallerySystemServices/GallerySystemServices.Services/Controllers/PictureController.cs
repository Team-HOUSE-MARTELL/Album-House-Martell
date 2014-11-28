﻿using GallerySystemServices.Services.Models;
using GallerySystemServices.Services.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace GallerySystemServices.Services.Controllers
{
    public class PictureController : ApiController
    {
        [HttpPost]
        [ActionName("addCommentToPicture")]
        public HttpResponseMessage PostAddCommentToPicture(CommentModel comment, int pictureId, string sessionKey)
        {
            try
            {
                var userService = new UserService();
                var user = userService.GetUserBySessionKey(sessionKey);

                if (user == null)
                {
                    throw new Exception("Access denied!");
                }

                var pictureService = new PictureService();
                var picture = pictureService.GetPictureById(pictureId);

                if (picture == null)
                {
                    throw new Exception("Picture not found!");
                }

                var newComment = pictureService.AddPictureComment(comment, picture, user);

                return this.Request.CreateResponse(HttpStatusCode.Created);
            }
            catch (Exception ex)
            {
                return this.Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [HttpPost]
        [ActionName("vote")]
        public HttpResponseMessage PostVoteForPicture(VoteModel vote, int pictureId, string sessionKey)
        {
            try
            {
                var userService = new UserService();
                var user = userService.GetUserBySessionKey(sessionKey);

                if (user == null)
                {
                    throw new Exception("Cannot edit album");
                }

                var pictureService = new PictureService();
                var picture = pictureService.GetPictureById(pictureId);

                if (picture == null)
                {
                    throw new Exception("Picture not found");
                }

                if (picture.Album.User.Id != user.Id)
                {
                    throw new Exception("Access Denied");
                }

                var isVoted = picture.Votes.Count(v => v.User.Id == user.Id) > 0;
                if (isVoted)
                {
                    throw new Exception("Glasuval si ebalnik..!");
                }

                var newVote = pictureService.AddVoteToPicture(vote, picture, user);

                return this.Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return this.Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [HttpGet]
        [ActionName("GetPictureById")]

        public HttpResponseMessage GetPictureById(int pictureId, string sessionKey)
        {
            try
            {
                var userService = new UserService();
                var user = userService.GetUserBySessionKey(sessionKey);

                if (user == null)
                {
                    throw new Exception("Cannot delete album");
                }

                var pictureService = new PictureService();
                var picture = pictureService.GetPictureById(pictureId);

                if (picture == null)
                {
                    throw new Exception("Album not found");
                }

                if (picture.Album.User.Id != user.Id)
                {
                    throw new Exception("Access Denied");
                }


                var pictureToReturn = new PictureModel()
                {
                    Comments = from comment in picture.Comments
                               select new CommentModel()
                                {
                                    Text = comment.Text,
                                    UserName = comment.User.UserName,
                                    CreatedAt = comment.CreatedAt
                                },
                    CreateDate = picture.CreateDate,
                    Id = picture.Id,
                    Url = picture.Url,
                    Title = picture.Title,
                    PositiveVotes = picture.Votes.Count(v => v.isPositive == true),
                    NegativeVotes = picture.Votes.Count(v => v.isPositive == false)
                };

                return this.Request.CreateResponse(HttpStatusCode.OK, pictureToReturn);

            }
            catch (Exception ex)
            {
                return this.Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }


    }
}
