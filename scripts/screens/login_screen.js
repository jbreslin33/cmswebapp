'use strict';

class LoginScreen
{
	constructor(application)
	{
		this.mApplication = application;
		
		this.mCode = 0;

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

		var url = "/php/classes/login/native_login.php?email=" + this.mEmail + "&password=" + this.mPassword; 

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
							
						APPLICATION.mLogin.mCode = data; 
                                        }
                                }
                        }
                };
	        
		var form = document.getElementById('login_screen_form_id');
                
		if (form.checkValidity() == true)
                {
			request.open('POST', url);
                        request.send();
                }
	}
        
	googleSignIn(googleUser)
	{
        	// Useful data for your client-side scripts:
        	var profile = googleUser.getBasicProfile();
        	console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        	console.log('Full Name: ' + profile.getName());
        	console.log('Given Name: ' + profile.getGivenName());
        	console.log('Family Name: ' + profile.getFamilyName());
        	console.log("Image URL: " + profile.getImageUrl());
        	console.log("Email: " + profile.getEmail());

        	// The ID token you need to pass to your backend:
        	var id_token = googleUser.getAuthResponse().id_token;
        	console.log("ID Token: " + id_token);
	
		//i then need to send this to server and it will either be a insert or simply return 100
		console.log("send to server next");
	}

	googleSignOut()
	{
        	var auth2 = gapi.auth2.getAuthInstance();
        	auth2.signOut().then(function ()
        	{
                	console.log('User signed out.');
        	});
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
