var service = (function() {
	'use strict';

	var BASE_URL = 'http://gallerysystemservices.apphb.com//api';

	function getStorageData() {
		var currSessionKey = sessionStorage.getItem('sessionKey');
		var currUserName = sessionStorage.getItem('username');

		return {
			sessionKey: currSessionKey,
			username: currUserName
		}
	}

	function getAllAlbums(success, error) {
		var tempUrl = BASE_URL + '/album/GetAllAlbums';
		ajaxRequester.get(tempUrl, success, error);
	}

	function voteAlbum(albumId, data, success, error) {
		var storageData = getStorageData();
		var tempUrl = BASE_URL + '/album/vote?albumId=' + albumId + '&sessionKey=' + storageData.sessionKey;
		ajaxRequester.post(tempUrl, data, success, error);
	}

	function addCommentToAlbum(albumId, data, success, error) {
		var storageData = getStorageData();
		var tempUrl = BASE_URL + '/album/addComment?albumId=' + albumId + '&sessionKey=' + storageData.sessionKey;
		ajaxRequester.post(tempUrl, data, success, error);
	}

	function getSliderImages(success, error) {
		var storageData = getStorageData();
		var tempUrl = BASE_URL + '/picture/GetAllPictures';
		ajaxRequester.get(tempUrl, success, error);
	}

	function registerUser(data, success, error) {
		var tempUrl = BASE_URL + '/user/register';
		ajaxRequester.post(tempUrl, data, success, error);
	}

	function loginUser(data, success, error) {
		var tempUrl = BASE_URL + '/authentication/login';
		ajaxRequester.post(tempUrl, data, success, error);
	}

	function logoutUser(success, error) {
		var storageData = getStorageData();
		var tempUrl = BASE_URL + '/authentication/logout?sessionKey=' + storageData.sessionKey;
		ajaxRequester.put(tempUrl, null, success, error);
	}


	return {
		getAllAlbums: getAllAlbums,
		voteAlbum: voteAlbum,
		addCommentToAlbum: addCommentToAlbum,
		getSliderImages: getSliderImages,
		registerUser: registerUser,
		loginUser: loginUser,
		logoutUser: logoutUser
	}

}());