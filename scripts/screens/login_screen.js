'use strict';

class LoginScreen
{
	constructor(application)
	{
		this.mApplication = application;

		location.hash = "login-screen";

		//sql php vars
		this.mEmail = null;
		this.mPassword = null;

		document.getElementById("loginscreenbuttonid").addEventListener("click",this.hit.bind(this));
	}

	hit()
	{
                this.mEmail    = document.getElementById("login_screen_email_id").value;
                this.mPassword  = document.getElementById("login_screen_password_id").value;

		var url = "/php/classes/login/login.php?email=" + this.mEmail + "&password=" + this.mPassword; 

                var request = new XMLHttpRequest();
                request.onreadystatechange = function()
                {
                        if (request.readyState === XMLHttpRequest.DONE)
                        {
                                if (request.status === 200)
                                {
                                        var data = this.responseText;
                                        if (data)
                                        {
						console.log("CODE YO:" + data);
						if (data == 100)
						{
							APPLICATION.mLogin.mLoggedIn = true; //should recieve 100 for good join/login
						}
						else
						{
							console.log('failed to login to cmswebapp');
						}
                                        }
                                }
                        }
                };
                request.open('POST', url);
                request.send();
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
