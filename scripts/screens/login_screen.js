'use strict';

class LoginScreen extends Screen
{
	constructor(application)
	{
		super(application);
		this.mApplication = application;
		
		this.mCode = 0;
		this.mData = null;

		location.hash = "login_screen";

                //html ids
                this.mSpinnerId = "login_screen_spinner_id";
                this.mHtmlId = "login_screen_html_id";

		//sql php vars
		this.mEmail = null;
		this.mPassword = null;
		this.mGoogleID = null;	
		this.mGoogleIDToken = null;	
		this.mFirstName = null;	
		this.mLastName = null;	
		this.mImageUrl = null;	

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
                                        APPLICATION.mLogin.mData = this.responseText;
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
       
        googleLogin()
        {
                var url = "/php/classes/login/google_login.php?email=" + this.mEmail + "&google_id=" + this.mGoogleID + "&id_token=" + this.mIDToken + "&first_name=" + this.mFirstName + "&last_name=" + this.mLastName;

                var request = new XMLHttpRequest();
                request.onreadystatechange = function()
                {
                        if (request.readyState === XMLHttpRequest.DONE)
                        {
                                if (request.status === 200)
                                {
                                        APPLICATION.mLogin.mData = this.responseText;
                                }
                        }
                };

                request.open('POST', url);
                request.send();
        }

	googleSignIn(googleUser)
	{
        	// Useful data for your client-side scripts:
        	var profile = googleUser.getBasicProfile();

        	// The ID token you need to pass to your backend:
        	var id_token = googleUser.getAuthResponse().id_token;
	
		APPLICATION.mLogin.mEmail = profile.getEmail();	
		APPLICATION.mLogin.mGoogleID = profile.getId();	
		APPLICATION.mLogin.mIDToken = id_token;	
		APPLICATION.mLogin.mFirstName = profile.getGivenName();	
		APPLICATION.mLogin.mLastName = profile.getFamilyName();	
		APPLICATION.mLogin.mImageUrl = profile.getImageUrl();	

		this.googleLogin();
	}

	googleSignOut()
	{
        	var auth2 = gapi.auth2.getAuthInstance();
        	auth2.signOut().then(function ()
        	{
                	console.log('User signed out.');
        	});
	}
}
