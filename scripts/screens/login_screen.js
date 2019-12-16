'use strict';

class LoginScreen extends Screen
{
	constructor(application)
	{
		super(application);
	
    		location.hash = 'login_screen';

		document.getElementById("loginscreenbuttonid").addEventListener("click",this.hit.bind(this));

                this.setHtml(document.getElementById("login_screen_html_id"));
		this.setMenuItem(document.getElementById("login_nav_id"));
               	this.setMessageElement(document.getElementById("login_screen_message_id"));
                this.setSpinner(document.getElementById("login_screen_spinner_id"));
                
		this.setForm(document.getElementById("login_screen_form_id"));
	}

	hit()
	{
                this.mEmail    = document.getElementById("login_screen_email_id").value;
                this.mPassword  = document.getElementById("login_screen_password_id").value;

		this.setUrl("/php/classes/screens/native_login.php?email=" + this.mEmail + "&password=" + this.mPassword); 

		this.ajax();
	}

	enter()
	{
		super.enter();
		if (this.mApplication.getJWT())
		{
			console.log('true jwt');
		}
		else
		{
			console.log('false jwt');
		}
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
/*
        showLogin()
        {
                //and show login
                this.getLoginLink().style.display = "block";
                this.getLoginLink().style.visibility = "visible";
        }

        hideLogin()
        {
                if (this.getLoginLink())
                {
                        this.getLoginLink().style.display = "none";
                }
        }
*/
        show()
        {
                super.show();
                
		var login_card = document.getElementById("login_card_id");
                var google_login_card = document.getElementById("google_login_card_id");
                var join_card = document.getElementById("join_card_id");

		if (this.mApplication.getJWT())
		{
			login_card.style.display = "none";
		}

        }

        hide()
        {
                super.hide();
                //this.hideLogin();
        }

}
