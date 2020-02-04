'use strict';

class LoginScreen extends Screen
{
	constructor(application)
	{
		super(application);
	
    		location.hash = 'login_screen';

                this.setHtml(document.getElementById("login_screen_html_id"));
               	this.setMessageElement(document.getElementById("login_screen_message_id"));
                this.setSpinner(document.getElementById("login_screen_spinner_id"));
                
		this.setForm(document.getElementById("login_screen_form_id"));
		
                document.getElementById('login_screen_form_login_id').addEventListener('submit', function(e)
                {
                        e.preventDefault();
                        APPLICATION.getCurrentScreen().hitLogin();
                });
                
		document.getElementById('login_screen_form_signup_id').addEventListener('submit', function(e)
                {
                        e.preventDefault();
                        APPLICATION.getCurrentScreen().hitSignUp();
                });
		
		document.getElementById('login_screen_form_forgot_password_id').addEventListener('submit', function(e)
                {
                        e.preventDefault();
                        APPLICATION.getCurrentScreen().hitForgotPassword();
                });
	}
	
	hitLogin()
	{
                this.mEmail    = document.getElementById("login_screen_email_id").value;
                this.mPassword  = document.getElementById("login_screen_password_id").value;

		this.setUrl("/php/classes/screens/native_login.php?email=" + this.mEmail + "&password=" + this.mPassword); 

		this.ajax();
	}

	hitSignUp()
	{
		location.hash = 'insert_email_screen';
	}
	
	hitForgotPassword()
	{
		location.hash = 'insert_forgot_password_screen';
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
