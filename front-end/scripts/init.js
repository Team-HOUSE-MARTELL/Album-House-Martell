(function() {
	'use strict';


	$(function() {
		$(window).on('pageshow', function() {
			if (isLoggedIn()) {
				var currentUserName = sessionStorage.username;
				var currnentSessionKey = sessionStorage.sessionKey;

				$('.login-singup-menu').hide();
				$('.greetings-container').show();
				$('#greetings').text('Hi ' + currentUserName);
				$('#logout-button').on('click', logout);
			} else {
				$('.login-singup-menu').show();
				$('.greetings-container').hide();
			}
		});

	});

	function isLoggedIn(argument) {
		if (sessionStorage.username && sessionStorage.sessionKey) {
			return true;
		} else {
			return false;
		}
	}

	function logout() {
		service.logoutUser(logoutSuccess, error);
	}

	function error(error) {
		var jsonError = JSON.parse(error.responseText);
		jsonError = jsonError.Message || jsonError;
		ohSnap('Error: ' + jsonError, 'red');
	}

	function goHomePage() {
		document.location.hash = '#home';
		location.reload();
	}

	function logoutSuccess(data) {
		sessionStorage.clear();
		$('#logout-button').off();
		ohSnap('Logout successful.', 'green');
		setTimeout(function() {
			goHomePage();
		}, 2000);
	}

}());