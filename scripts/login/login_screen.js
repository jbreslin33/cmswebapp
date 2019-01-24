'use strict';

class LoginScreen
{
	constructor(application,login)
	{
		this.mLogin = login;
		this.mApplication = application;

		location.hash = "login-screen";
		document.getElementById("loginscreenbuttonid").addEventListener("click",this.sendLogin);

		this.mEmail    = document.getElementById("loginscreenemailid");
		this.mPassword = document.getElementById("loginscreenpasswordid");
	}

	sendLogin()
	{
                APPLICATION.mLogin.mUsername = APPLICATION.mLogin.mLoginScreen.mEmail.value;
                APPLICATION.mLogin.mPassword = APPLICATION.mLogin.mLoginScreen.mPassword.value;
	
		APPLICATION.mLogin.sendLogin();
	}

	divInputEmailKeyDown(e)
	{
		if (e.key == 'Enter')	
		{
			APPLICATION.mLogin.mLoginScreen.mPassword.focus();
		}
	}

	divInputPasswordKeyDown(e)
	{
		if (e.key == 'Enter')	
		{
			document.getElementById("loginscreenbuttonid").focus();
		}
	}

	show()
	{
		document.getElementById("login_screen_html_id").style.display = "block";
	}

	hide()
	{
		document.getElementById("login_screen_html_id").style.display = "none";
	}
}
