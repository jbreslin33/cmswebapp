'use strict';

class LoginScreen
{
	constructor(application,login)
	{
		this.mLogin = login;
		this.mApplication = application;

		//login stuff
		//container
                this.mContainer = document.createElement("DIV");
                this.mContainer.setAttribute("class", "container");
               
		//email
		this.mEmailInputGroup = document.createElement("DIV");
                this.mEmailInputGroup.setAttribute("class", "input-group");

		this.mEmailInputGroupAddon = document.createElement("SPAN");
		this.mEmailInputGroupAddon.setAttribute("class","input-group-addon");
	
		this.mGlyphiconUser = document.createElement("I");
		this.mGlyphiconUser.setAttribute("class","glyphicon glyphicon-user");
		
		this.mEmail = document.createElement("INPUT");
		this.mEmail.setAttribute("type","text");
		this.mEmail.setAttribute("class","form-control");
		this.mEmail.setAttribute("name","email");
		this.mEmail.setAttribute("placeholder","Email");

		//password
		this.mPasswordInputGroup = document.createElement("DIV");
                this.mPasswordInputGroup.setAttribute("class", "input-group");

		this.mPasswordInputGroupAddon = document.createElement("SPAN");
		this.mPasswordInputGroupAddon.setAttribute("class","input-group-addon");
	
		this.mGlyphiconLock = document.createElement("I");
		this.mGlyphiconLock.setAttribute("class","glyphicon glyphicon-lock");

		this.mPassword = document.createElement("INPUT");
		this.mPassword.setAttribute("type","password");
		this.mPassword.setAttribute("class","form-control");
		this.mPassword.setAttribute("name","password");
		this.mPassword.setAttribute("placeholder","Password");

		//attach elements
		document.body.appendChild(this.mContainer);
			this.mContainer.appendChild(this.mEmailInputGroup);
				this.mEmailInputGroup.appendChild(this.mEmailInputGroupAddon);
					this.mEmailInputGroupAddon.appendChild(this.mGlyphiconUser);
				this.mEmailInputGroup.appendChild(this.mEmail);
			this.mContainer.appendChild(this.mPasswordInputGroup);
				this.mPasswordInputGroup.appendChild(this.mPasswordInputGroupAddon);
					this.mPasswordInputGroupAddon.appendChild(this.mGlyphiconLock);
				this.mPasswordInputGroup.appendChild(this.mPassword);
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
