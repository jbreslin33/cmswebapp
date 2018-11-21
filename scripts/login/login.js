'use strict';

class Login extends Report
{
	constructor(application)
	{
		super(application);	
		console.log('Login Con');
               
		//add card to main
		this.mContainer = document.querySelector('.main');
                this.mContainer.appendChild(this.mDivCard);

		//login stuff
                this.mDivForm = document.createElement("FORM");
                this.mDivForm.setAttribute("action", "/php/classes/login/login.php");
                this.mDivForm.setAttribute("method", "post");
		this.mDivCard.appendChild(this.mDivForm);

                this.mDivLogin = document.createElement("DIV");
                this.mDivLogin.setAttribute("class", "login");
		this.mDivForm.appendChild(this.mDivLogin);
                
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
	
		this.mDivA = document.createElement("A");
                this.mDivA.setAttribute("href", "#");
                this.mDivA.setAttribute("class", "forgot");
		this.mDivA.innerHTML = "forgot password";
		this.mDivLogin.appendChild(this.mDivA);
		
		this.mDivInput = document.createElement("INPUT");
                this.mDivInput.setAttribute("type", "submit");
                this.mDivInput.setAttribute("value", "Sign In");
		this.mDivLogin.appendChild(this.mDivInput);

		//DUMMY DIV
                this.mDivBreslin = document.createElement("DIV");
                this.mDivBreslin.setAttribute("class", "breslin");
		this.mDivCard.appendChild(this.mDivBreslin);
		
	}
}
