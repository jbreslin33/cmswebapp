'use strict';

class InsertLoginClubScreen extends InsertLoginScreen
{
	constructor(application)
	{
		super(application);

		location.hash = 'insert_login_club_screen';

                //html ids
                this.mSpinnerId = "insert_native_login_club_screen_spinner_id";
                this.mHtmlId    = "insert_native_login_club_screen_html_id";
	}

        hit()
        {
                //get vars
                this.mFirstName  = document.getElementById("insert_native_login_screen_first_name_id").value;
                this.mMiddleName = document.getElementById("insert_native_login_screen_middle_name_id").value;
                this.mLastName   = document.getElementById("insert_native_login_screen_last_name_id").value;
                this.mPhone      = document.getElementById("insert_native_login_screen_phone_id").value;
                this.mAddress    = document.getElementById("insert_native_login_screen_address_id").value;
                this.mEmail      = document.getElementById("insert_native_login_screen_email_id").value;
                this.mPassword1  = document.getElementById("insert_native_login_screen_password1_id").value;
                this.mPassword2  = document.getElementById("insert_native_login_screen_password2_id").value;

                var url = "/php/classes/insert/insert_native_login_club.php?first_name=" + this.mFirstName + "&middle_name=" + this.mMiddleName + "&last_name=" + this.mLastName + "&phone=" + this.mPhone + "&address=" + this.mAddress + "&email=" + this.mEmail + "&password=" + this.mPassword1 + "&club_invite_token=" + APPLICATION.mClubInviteToken;

                var request = new XMLHttpRequest();
                request.onreadystatechange = function()
                {
                        if (request.readyState === XMLHttpRequest.DONE)
                        {
                                if (request.status === 200)
                                {
                                        APPLICATION.mInsertNativeLoginClubScreen.mData = this.responseText;
                                }
                        }
                };

                var form = document.getElementById('insert_native_login_screen_form_id');
                if (form.checkValidity() == true)
                {
                        var passwordMatch = false;

                        if (this.mPassword1 == this.mPassword2)
                        {
                                request.open('POST', url);
                                request.send();

                                document.getElementById('password_message_id').style.color = 'green';
                                document.getElementById('password_message_id').innerHTML = 'passwords are matching';
                        }
                        else
                        {
                                document.getElementById('password_message_id').style.color = 'red';
                                document.getElementById('password_message_id').innerHTML = 'passwords are not matching';
                        }
                }
        }


	show()
	{
		//also show google
              	document.getElementById("insert_native_login_club_screen_html_id").style.display = "block";
              	document.getElementById("insert_native_login_screen_html_id").style.display = "block";
		//hide link
		document.getElementById("insert_native_login_screen_link_id").style.display = "none";
		//document.getElementById("insert_native_login_club_screen_link_id").style.display = "none";
		//insert_native_login_screen_email_div_id
		document.getElementById("insert_native_login_screen_email_div_id").style.display = "none";
insert_native_login_screen_header_div_id
		document.getElementById("insert_native_login_screen_club_header_div_id").innerHTML = "Join Celta with google login:";
		document.getElementById("insert_native_login_screen_header_div_id").innerHTML = "Or Join Celta without google login:";
		
		document.getElementById("insert_native_login_screen_email_id").required = false;

	}

	hide()
	{
		//also hide google
              document.getElementById("insert_native_login_screen_html_id").style.display = "none";
              document.getElementById("insert_native_login_club_screen_html_id").style.display = "none";
	}

        googleLogin()
        {
                var url = "/php/classes/login/google_login.php?email=" + this.mEmail + "&google_id=" + this.mGoogleID + "&id_token=" + this.mIDToken + "&first_name=" + this.mFirstName + "&last_name=" + this.mLastName + "&club_invite_token=" + APPLICATION.mClubInviteToken;

		var request = new XMLHttpRequest();
                request.onreadystatechange = function()
                {
                        if (request.readyState === XMLHttpRequest.DONE)
                        {
                                if (request.status === 200)
                                {
                                        APPLICATION.mInsertNativeLoginClubScreen.mData = this.responseText;
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

                APPLICATION.mInsertNativeLoginClubScreen.mEmail = profile.getEmail();
                APPLICATION.mInsertNativeLoginClubScreen.mGoogleID = profile.getId();
                APPLICATION.mInsertNativeLoginClubScreen.mIDToken = id_token;
                APPLICATION.mInsertNativeLoginClubScreen.mFirstName = profile.getGivenName();
                APPLICATION.mInsertNativeLoginClubScreen.mLastName = profile.getFamilyName();
                APPLICATION.mInsertNativeLoginClubScreen.mImageUrl = profile.getImageUrl();

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
