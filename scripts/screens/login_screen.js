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
                                		document.getElementById('login_screen_email_message_id').innerHTML = '';
                                		document.getElementById('login_screen_password_message_id').innerHTML = '';

						if (data == 100)
						{
							APPLICATION.mLogin.mLoggedIn = true; //should recieve 100 for good join/login
						}
						if (data == 101)
						{
                                			document.getElementById('login_screen_email_message_id').style.color = 'red';
                                			document.getElementById('login_screen_email_message_id').innerHTML = 'email does not exist. Please enter a valid email.';
                        			}
						if (data == 102)
						{
                                			document.getElementById('login_screen_password_message_id').style.color = 'red';
                                			document.getElementById('login_screen_password_message_id').innerHTML = 'Incorrect password.';
						}
                                        }
                                }
                        }
                };
	        
		var form = document.getElementById('join_site_screen_html_id');
                
		//if (form.checkValidity() == true)
                //{
			request.open('POST', url);
                        request.send();
                //}
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
