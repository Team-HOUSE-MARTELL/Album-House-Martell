/**
 * Created by petrovaliev95 on 01-Dec-14.
 */

 (function () {
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
                    '<button id="view-comments" class="btn btn-primary" type="button">View Comments</button>' +
                    '<button type="button" data-toggle="modal" data-target="#add-comment-modal" data-whatever="@twbootstrap" class="btn btn-default open-modal" type="button">Comment</button>' +
                '</div>' +
                '<div class="col-md-2 voting-container">' +
                    '<div class="voting-counter">{{album-vote-count}}</div>' +
                    '<div class="voting-buttons-container">' +
                        '<span id="like-button" class="like glyphicon glyphicon-thumbs-up"></span>' +
                        '<span id="dislike-button" class="dislike glyphicon glyphicon-thumbs-down"></span>' +
                    '</div>' +
                '</div>' +
            '</div>';

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

        function getAlbums() {
            service.getAllAlbums(drawAlbums, error);
        }

        function drawAlbums(data) {
            $('.albums-container').children().remove();
            $(data).each(function(_, album) {
                var albumMainImage = album.MainImageUrl || DEFAULT_IMAGE_FOR_ALBUM;

                var $currAlbum = $(albumContainerTemplate
                    .replace('{{album-image-url}}', albumMainImage)
                    .replace('{{album-title}}', album.Title)
                    .replace('{{album-vote-count}}', album.PositiveVotes)
                );


                $currAlbum.data('albumInformation', album);
                $currAlbum.find('#like-button').on('click', albumVoteUpButtonClicked);
                $currAlbum.find('#dislike-button').on('click', albumVoteDownButtonClicked);
                $currAlbum.find('.open-modal').on('click', configCommentModal);

                $('.albums-container').append($currAlbum);
            });
        }

        function error(error) {
            var jsonError = JSON.parse(error.responseText);
            jsonError = jsonError.Message || jsonError;
            alert('Error: ' + jsonError);
        }

        function success (data){
            alert("comment added successfuly.");
        }

        function albumVoteUpButtonClicked() {
            var currAlbum = $(this).parent().parent().parent().data('albumInformation');
            var data = {
                isPositive: 'true'
            };
            service.voteAlbum(currAlbum.Id, data, getAlbums, error);
        }

        function albumVoteDownButtonClicked(){
            var currAlbum = $(this).parent().parent().parent().data('albumInformation');
            var data = {
                isPositive: 'false'
            };
            service.voteAlbum(currAlbum.Id, data, getAlbums, error);
        }

        function configCommentModal (){
            var currAlbum = $(this).parent().parent().data('albumInformation');
            console.log(currAlbum.Title);
            $('#add-comment-modal #add-comment-button').data('album-data', currAlbum);
            $('span#album-name').text(currAlbum.Title);
            $('#add-comment-modal #add-comment-button').off().on('click', addCommentClicked);
        }

        function addCommentClicked (){
            var currAlbum = $(this).data('album-data');
            var commentText = $('#add-comment-modal #comment-text').val();
            var data = {
                "Text": commentText
            };
            service.addCommentToAlbum(currAlbum.Id, data, success, error);
        }



        getAlbums();
    });

}());