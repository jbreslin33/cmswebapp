'use strict';

class LoginScreen extends Screen
{
	constructor(application)
	{
		super(application);
	
    		location.hash = 'login_screen';

		document.getElementById("loginscreenbuttonid").addEventListener("click",this.hitLogin.bind(this));
		document.getElementById("insertforgotnavbuttonid").addEventListener("click",this.hitForgotPassword.bind(this));

                this.setHtml(document.getElementById("login_screen_html_id"));
               	this.setMessageElement(document.getElementById("login_screen_message_id"));
                this.setSpinner(document.getElementById("login_screen_spinner_id"));
                
		this.setForm(document.getElementById("login_screen_form_id"));

		document.getElementById('insert_forgot_password_nav_form_id').addEventListener('submit', function(e) {
    			e.preventDefault();	
		});			
	}

	hitForgotPassword()
	{
		location.hash = "insert_forgot_password_screen";
	}

	hitLogin()
	{
                this.mEmail    = document.getElementById("login_screen_email_id").value;
                this.mPassword  = document.getElementById("login_screen_password_id").value;

		this.setUrl("/php/classes/screens/native_login.php?email=" + this.mEmail + "&password=" + this.mPassword); 

		this.ajax();
	}


	enter()
	{
		super.enter();
		
		//hide menus
		this.mApplication.showLoggedInHeaderHtml(false);
	}

	//overide from screen
	checkValidity()
	{
		if (APPLICATION.getCurrentScreen().mGoogleLoginHit)
		{
			APPLICATION.getCurrentScreen().send();
		}
		else
		{
			super.checkValidity();
		}
	}
}
