'use strict';

class LoginScreen extends Report
{
	constructor(application,login)
	{
		super(application);	

		this.mLogin = login;
              
		//add card to main
		this.mContainer = document.querySelector('.main');
                this.mContainer.appendChild(this.mDivCard);

		//login stuff
                this.mDivLogin = document.createElement("DIV");
                this.mDivLogin.setAttribute("class", "login");
		this.mDivCard.appendChild(this.mDivLogin);
                
		this.mDivInputEmail = document.createElement("INPUT");
                this.mDivInputEmail.setAttribute("type", "text");
                this.mDivInputEmail.setAttribute("placeholder", "email");
                this.mDivInputEmail.setAttribute("id", "username");
                this.mDivInputEmail.setAttribute("name", "username");
		this.mDivLogin.appendChild(this.mDivInputEmail);
		
		this.mDivInputPassword = document.createElement("INPUT");
                this.mDivInputPassword.setAttribute("type", "password");
                this.mDivInputPassword.setAttribute("placeholder", "password");
                this.mDivInputPassword.setAttribute("id", "password");
                this.mDivInputPassword.setAttribute("name", "password");
		this.mDivLogin.appendChild(this.mDivInputPassword);
		
		this.mButton = document.createElement("BUTTON");
		this.mButton.addEventListener("click",this.mLogin.sendLogin);
		this.mDivLogin.appendChild(this.mButton);
	}
}
