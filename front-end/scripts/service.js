var service = (function () {
	'use strict';

 	sessionStorage.setItem('sessionKey', '2rNBJLYTztmpqP827oOXyuDGP4KJFI7F4iOzQCN36yTZnDuwQs');

    var baseURL = 'http://gallerysystemservices.apphb.com//api';
    var currSessionKey = sessionStorage.getItem('sessionKey');
    var currUserName = sessionStorage.getItem('username');

	/*function login(){
		
	}

	function logout(){
		
	}*/

	function getAllAlbums (success, error){
		var tempUrl = baseURL + '//album/GetAlbums?sessionKey=' + currSessionKey
		ajaxRequester.get(tempUrl, success, error);
	}

	function voteAlbum(albumId, data, success, error){
		var tempUrl = baseURL + '//album/vote?albumId=' + albumId +'&sessionKey=' + currSessionKey;
		ajaxRequester.post(tempUrl, data, success, error);
	}

	function addCommentToAlbum (albumId, data, success, error){
		var tempUrl = baseURL + '//album/addComment?albumId=' + albumId +'&sessionKey=' + currSessionKey;
		ajaxRequester.post(tempUrl, data, success, error);
	}

	return{
		getAllAlbums: getAllAlbums,
		voteAlbum: voteAlbum,
		addCommentToAlbum: addCommentToAlbum
	}

}());