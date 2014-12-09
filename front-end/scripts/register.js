(function() {
	'use strict';

	$(function() {
		$('#register-button').on('click', register);
		$('#logout-button').on('click', logout);
	});

	function register() {
		var $registerForm = $(this).parents('#registration-form');

		var inputUserName = $registerForm.find('#inputUserName').val();
		var inputEmail = $registerForm.find('#inputEmail').val();
		var inputPassword = $registerForm.find('#inputPassword').val();
		var inputRepeatPassword = $registerForm.find('#inputRepeatPassword').val();

		if (inputUserName && inputEmail &&
			inputPassword && inputRepeatPassword) {

			if (isValidEmail(inputEmail)) {

				if (inputPassword === inputRepeatPassword) {
					var data = {
						UserName: inputUserName,
						AuthCode: inputPassword,
						Email: inputEmail
					}
					service.registerUser(data, loginUser, error);
				} else {
					ohSnap('Passwords not match.', 'red');
				}
			} else {
				ohSnap('Please enter a valid email.', 'red');
			};

		} else {
			ohSnap('All fields are required.', 'orange');
		}
	}

	function error(error) {
		var jsonError = JSON.parse(error.responseText);
		jsonError = jsonError.Message || jsonError;
		ohSnap('Error: ' + jsonError, 'red');
	}

	function loginUser(data) {
		sessionStorage.setItem('sessionKey', data.SessionKey);
		sessionStorage.setItem('username', data.UserName);
		ohSnap('Registration successful', 'green');
		goHomePage();
	}

	function logout() {
		service.logoutUser(logoutSuccess, error);
	}

	function logoutSuccess(data) {
		sessionStorage.clear();
		$('#logout-button').off();
		ohSnap('Logout successful.', 'green');
		setTimeout(function() {
			goHomePage();
		}, 2000);
	}

	function isValidEmail(email) {
		var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
		return pattern.test(email);
	}

	function goHomePage() {
		document.location.hash = '#home';
		location.reload();
	}

	// Debuging in chrome
	//# sourceURL=register.js
}());