/**
 * Created by petrovaliev95 on 27-Nov-14.
 */
(function() {

	$(function() {
		$('#login-button').on('click', login);
	});


	function login() {
		var username = $('#inputUserName').val();
		var password = $('#inputPassword').val();

		var data = {
			UserName: username,
			AuthCode: password
		};

		service.loginUser(data, loginSuccess, error);
	}

	function loginSuccess(data) {
		saveDataInStorage(data);
		// configurate logout button
		$('#logout-button').on('click', logout);
		ohSnap('Login successful.', 'green');
		goHomePage();
	}

	function error(error) {
		var jsonError = JSON.parse(error.responseText);
		jsonError = jsonError.Message || jsonError;
		ohSnap('Error: ' + jsonError, 'red');
	}

	function saveDataInStorage(data) {
		sessionStorage.setItem('sessionKey', data.SessionKey);
		sessionStorage.setItem('username', data.UserName);
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

	function goHomePage() {
		document.location.hash = '#home';
		location.reload();
	}


	// Debuging in chrome
	//# sourceURL=login.js
}());