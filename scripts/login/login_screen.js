'use strict';

class LoginScreen
{
	constructor(application,login)
	{
		this.mLogin = login;
		this.mApplication = application;

		//login stuff
                this.mDivLogin = document.createElement("DIV");
                this.mDivLogin.setAttribute("class", "login");
		this.mApplication.mDivMain.appendChild(this.mDivLogin);
                
		//add card to main
                this.mContainer = document.querySelector('.main');
                this.mContainer.appendChild(this.mDivLogin);
                
		this.mDivInputEmail = document.createElement("INPUT");
                this.mDivInputEmail.setAttribute("type", "text");
                this.mDivInputEmail.setAttribute("placeholder", "email");
                this.mDivInputEmail.setAttribute("id", "username");
                this.mDivInputEmail.setAttribute("name", "username");
                this.mDivInputEmail.addEventListener("keydown",this.divInputEmailKeyDown);
		this.mDivLogin.appendChild(this.mDivInputEmail);
		
		this.mDivInputPassword = document.createElement("INPUT");
                this.mDivInputPassword.setAttribute("type", "password");
                this.mDivInputPassword.setAttribute("placeholder", "password");
                this.mDivInputPassword.setAttribute("id", "password");
                this.mDivInputPassword.setAttribute("name", "password");
                this.mDivInputPassword.addEventListener("keydown",this.divInputPasswordKeyDown);
		this.mDivLogin.appendChild(this.mDivInputPassword);
		
		this.mButton = document.createElement("BUTTON");
		this.mButton.innerHTML = "LOGIN";
		
                this.mButton.setAttribute("class", "btn");
               	this.mButton.addEventListener("click",this.mLogin.sendLogin);

		this.mDivLogin.appendChild(this.mButton);
	
		//shadow
                this.mDivShadow = document.createElement("DIV");
                this.mDivShadow.setAttribute("class", "shadow");
		this.mDivLogin.appendChild(this.mDivShadow);
	}

	divInputEmailKeyDown(e)
	{
		if (e.key == 'Enter')	
		{
			APPLICATION.mLogin.mLoginScreen.mDivInputPassword.focus();
		}
	}

	divInputPasswordKeyDown(e)
	{
		if (e.key == 'Enter')	
		{
			APPLICATION.mLogin.mLoginScreen.mButton.focus();
		}
	}

	show()
	{
		this.mDivLogin.style.display = "block";	
	}

	hide()
	{
		this.mDivLogin.style.display = "none";	
	}
}
