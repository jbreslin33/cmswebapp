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
		//FORM
                this.mDivForm = document.createElement("FORM");
                this.mDivForm.setAttribute("action", "/php/classes/login/login.php");
                this.mDivForm.setAttribute("method", "post");
		this.mDivCard.appendChild(this.mDivForm);

                this.mDivLogin = document.createElement("DIV");
                this.mDivLogin.setAttribute("class", "login");
		this.mDivForm.appendChild(this.mDivLogin);
                
		this.mDivInputEmail = document.createElement("DIV");
                this.mDivInputEmail.setAttribute("type", "password");
                this.mDivInputEmail.setAttribute("placeholder", "password");
                this.mDivInputEmail.setAttribute("id", "password");
		this.mDivLogin.appendChild(this.mDivInputEmail);


		//DUMMY DIV
                this.mDivBreslin = document.createElement("DIV");
                this.mDivBreslin.setAttribute("class", "breslin");
		this.mDivCard.appendChild(this.mDivBreslin);


	
		
	}
}
