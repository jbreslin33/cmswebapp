'use strict';

class InsertLoginClubScreen extends InsertLoginScreen
{
	constructor(application)
	{
		super(application);

		location.hash = 'insert_login_club_screen';

                //html ids
                //this.setSpinner(document.getElementById("insert_native_login_screen_spinner_id"));
                this.setHtml(document.getElementById("insert_native_login_club_screen_html_id"));
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

		console.log('toek in hit:' + APPLICATION.mClubInviteToken);

                this.setUrl("/php/classes/screens/insert_native_login_club.php?first_name=" + this.mFirstName + "&middle_name=" + this.mMiddleName + "&last_name=" + this.mLastName + "&phone=" + this.mPhone + "&address=" + this.mAddress + "&email=" + this.mEmail + "&password=" + this.mPassword1 + "&club_invite_token=" + APPLICATION.mClubInviteToken);
		this.ajax();
        }

	show()
	{
                if (this.getHtml())
                {
                        this.getHtml().style.display = "block";
              		document.getElementById("insert_native_login_screen_html_id").style.display = "block";

                        this.getHtml().style.visibility = "visible";
              		document.getElementById("insert_native_login_screen_html_id").style.visibility = "visible";
                }
                if (this.getSpinner())
                {
			console.log('hide spinner yos');
                        this.getSpinner().style.visibility = "hidden";
                	document.getElementById("insert_native_login_screen_spinner_id").style.visibility = "hidden";
		}

		//hide link
		//document.getElementById("insert_native_login_screen_link_id").style.display = "none";
		document.getElementById("insert_native_login_screen_email_div_id").style.display = "none";

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
}
