/**
 * Created by petrovaliev95 on 01-Dec-14.
 */

(function() {
    'use strict';

    $(function() {
        var DEFAULT_IMAGE_FOR_ALBUM = 'http://placehold.it/500x300&text=No%20image';
        var albumContainerTemplate =
            '<div class="row col-md-12 album-container">' +
            '<div class="col-md-3">' +
            '<img class="album-image-avatar" src="{{album-image-url}}" alt="img">' +
            '</div>' +
            '<div class="col-md-4">' +
            '<h3 class="album-title">{{album-title}}</h3>' +
            '</div>' +
            '<div class="col-md-3 comment-buttons-container">' +
            '<button type="button" data-toggle="modal" data-target="#comments-modal-container" class="btn btn-default view-comments" type="button">View Comments</button>' +
            '<button type="button" data-toggle="modal" data-target="#add-comment-modal" data-whatever="@twbootstrap" class="btn btn-primary open-modal" type="button">Comment</button>' +
            '</div>' +
            '<div class="col-md-2 voting-container">' +
            '<div class="voting-counter">{{album-vote-count}}</div>' +
            '<div class="voting-buttons-container">' +
            '<span id="like-button" class="like glyphicon glyphicon-thumbs-up"></span>' +
            '<span id="dislike-button" class="dislike glyphicon glyphicon-thumbs-down"></span>' +
            '</div>' +
            '</div>' +
            '</div>';
        var SLIDER_IMAGE_CONTAINER =
            '<div>' +
            '<div class="image-title">{{image-title}}</div>' +
            '<img class="slider-image" src="{{image-url}}" alt="img"/>' +
            '</div>';

        function getSliderImages() {
            service.getSliderImages(drawSliderImages, error);
        }

        function drawSliderImages(data) {
            $('.slider').children().remove();

            $(data).each(function(_, image) {
                var imageTitle = image.Title || 'No title';
                var $currentSliderImage = $(SLIDER_IMAGE_CONTAINER
                    .replace('{{image-title}}', imageTitle)
                    .replace('{{image-url}}', image.Url));
                $('.slider').append($currentSliderImage);
            })

            $('.slider').slick({
                rtl: false,
                autoplay: true,
                autoplaySpeed: 2000,
                centerPadding: "150px"
            });

            var prevButton = $('<span class="glyphicon glyphicon-chevron-left">');
            var nextButton = $('<span class="glyphicon glyphicon-chevron-right">');
            $('button.slick-prev').removeClass('slick-prev').addClass('button-prev').text('').append(prevButton);
            $('button.slick-next').removeClass('slick-next').addClass('button-next').text('').append(nextButton);
        }

        function getAlbums() {
            service.getAllAlbums(drawAlbums, error);
        }

        function drawAlbums(data) {
            $('.albums-container').children().remove();
            $(data).each(function(_, album) {
                var albumMainImage = album.MainImageUrl || DEFAULT_IMAGE_FOR_ALBUM;
                var albumVotes = parseInt(album.PositiveVotes) - parseInt(album.NegativeVotes);

                var $currAlbum = $(albumContainerTemplate
                    .replace('{{album-image-url}}', albumMainImage)
                    .replace('{{album-title}}', album.Title)
                    .replace('{{album-vote-count}}', albumVotes)
                );


                $currAlbum.data('albumInformation', album);
                $currAlbum.find('#like-button').on('click', albumVoteUpButtonClicked);
                $currAlbum.find('#dislike-button').on('click', albumVoteDownButtonClicked);
                $currAlbum.find('.open-modal').on('click', configCommentModal);
                $currAlbum.find('.view-comments').on('click', showComments);

                $('.albums-container').append($currAlbum);
            });
        }

        function error(error) {
            var jsonError = JSON.parse(error.responseText);
            jsonError = jsonError.Message || jsonError;
            ohSnap('Error: ' + jsonError, 'red');
        }

        function success(message) {
            ohSnap(message, 'green');
        }

        function albumVoteUpButtonClicked() {
            var currAlbum = $(this).parent().parent().parent().data('albumInformation');
            var data = {
                isPositive: 'true'
            };
            service.voteAlbum(currAlbum.Id, data, [getAlbums, success('Successfully voted.')], error);
        }

        function albumVoteDownButtonClicked() {
            var currAlbum = $(this).parent().parent().parent().data('albumInformation');
            var data = {
                isPositive: 'false'
            };
            service.voteAlbum(currAlbum.Id, data, [getAlbums, success('Successfully voted.')], error);
        }

        function configCommentModal() {
            var currAlbum = $(this).parent().parent().data('albumInformation');
            console.log(currAlbum.Title);
            $('#add-comment-modal #add-comment-button').data('album-data', currAlbum);
            $('span#album-name').text(currAlbum.Title);
            $('#add-comment-modal #add-comment-button').off().on('click', addCommentClicked);
        }

        function showComments() {
            $('#comments-container').children().remove();
            var currnetAlbum = $(this).parents('.album-container').data('albumInformation');
            $('#comments-album-name').text(currnetAlbum.Title);
            var currentAlbumComments = currnetAlbum.Comments;

            if (currentAlbumComments.length) {
                $.each(currentAlbumComments, function(_, comment) {
                    var $currentCommentContainer = $('<li class="list-group-item">').text(comment.Text);
                    $('#comments-container').append($currentCommentContainer);
                });

            } else {
                var $noResults = $('<li class="list-group-item list-group-item-danger">').append($('<h2 class="text-center">').text('No results.'));
                $('#comments-container').append($noResults);
            }

        }

        function addCommentClicked() {
            var currAlbum = $(this).data('album-data');
            var commentText = $('#add-comment-modal #comment-text').val();
            if (commentText) {
                var data = {
                    "Text": commentText
                };
                service.addCommentToAlbum(currAlbum.Id, data, [getAlbums, success('Comment was added successfully.')], error);
                $('#comment-form').trigger('reset');
                $('#add-comment-modal').modal('hide');
            } else {
                ohSnap('Comment cannot be empty.', 'orange');
            }
        }

        getSliderImages();
        // That is because REST API cannot resolve two requests for one time
        setTimeout(function() {
            getAlbums();
        }, 1000);
    });
    // Debuging in chrome
    //# sourceURL=homePage.js
}());