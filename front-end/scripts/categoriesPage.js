(function () {
    'use strict';

    $(function() {
        var DEFAULT_IMAGE_FOR_ALBUM = 'http://placehold.it/500x300&text=No%20image';
        var categoryContainerTemplate = '<li><a class="categoryLink" >{{category-name}}</a></li>';
        var albumContainerTemplate =
            '<div id="categories" class="col-lg-3"></div>' +
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

        function getCategoriesAndAlbums() {
            service.getAllCategories(drawCategories, error);
        }

        function drawCategories(data) {
            $('#categories-list ul').children().remove();
            $(data).each(function(_, category) {
                var $currCategory = $(categoryContainerTemplate
                        .replace('{{category-name}}', category.Name)
                );

                $currCategory.data('categoryInformation', category);
                $currCategory.find('.categoryLink').attr('data-id', category.Id);
                $currCategory.find('.categoryLink').click(getCategoryAlbums);
                $('#categories-list ul').append($currCategory);
            }).after(
                getAlbums()
            );
        }

        function getAlbums() {
            service.getUserAlbums(drawAlbums, error);
        }

        function drawAlbums(data) {
            $('#section-albums').text('All Albums');
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

        function getCategoryAlbums (){
            var categoryId = $(this).attr('data-id');
            $('#section-albums').text($(this).text());
            service.getAlbumsByCategory(
                categoryId,
                (function (data){
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
                }),
                error);
        }

        function saveCategoryClicked () {
            $('#save-category-button').on('click', function () {
                var categoryName = $('#category-name').val();
                if (categoryName) {
                    var data = {
                        "Name": categoryName
                    };
                    service.addCategory(data, [getCategoriesAndAlbums(), success('Category was added successfully.')], error);
                    $('#category-form').trigger('reset');
                    $('#add-category-modal').modal('hide');
                } else {
                    ohSnap('Category cannot be empty.', 'orange');
                }
            });
        }

        getCategoriesAndAlbums();
        saveCategoryClicked();
    });

}());