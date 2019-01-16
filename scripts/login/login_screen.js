'use strict';

class LoginScreen
{
	constructor(application,login)
	{
		this.mLogin = login;
		this.mApplication = application;

		//login stuff
                this.mContainer = document.createElement("DIV");
                this.mContainer.setAttribute("class", "container");

		//email
		this.mEmail = document.createElement("INPUT");
		this.mEmail.setAttribute("type","text");
		this.mEmail.setAttribute("class","form-control");
		this.mEmail.setAttribute("name","email");
		this.mEmail.setAttribute("placeholder","Email");

		//attach elements
		document.body.appendChild(this.mContainer);
		this.mContainer.appendChild(this.mEmail);
	}

	sendLogin()
	{
		/*
                APPLICATION.mLogin.mUsername = APPLICATION.mLogin.mLoginScreen.mDivInputEmail.value;
                APPLICATION.mLogin.mPassword = APPLICATION.mLogin.mLoginScreen.mDivInputPassword.value;
	
		APPLICATION.mLogin.sendLogin();
		*/
	}

	divInputEmailKeyDown(e)
	{
		/*
		if (e.key == 'Enter')	
		{
			APPLICATION.mLogin.mLoginScreen.mDivInputPassword.focus();
		}
		*/
	}

	divInputPasswordKeyDown(e)
	{
		/*
		if (e.key == 'Enter')	
		{
			APPLICATION.mLogin.mLoginScreen.mButton.focus();
		}
		*/
	}

	show()
	{
		//this.mDivLogin.style.display = "block";	
	}

	hide()
	{
		//this.mDivLogin.style.display = "none";	
	}
}
