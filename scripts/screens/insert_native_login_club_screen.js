'use strict';

class InsertLoginClubScreen extends InsertLoginScreen
{
	constructor(application)
	{
		super(application);

		location.hash = "insert_native_login_club_screen";

                //html ids
                this.mSpinnerId = "insert_native_login_club_screen_spinner_id";
                this.mHtmlId    = "insert_native_login_club_screen_html_id";

		//document.getElementById("insertloginscreenbuttonid").addEventListener("click",this.hit.bind(this));
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

	}

	hide()
	{
		//also hide google
              document.getElementById("insert_native_login_screen_html_id").style.display = "none";
              document.getElementById("insert_native_login_club_screen_html_id").style.display = "none";
	}
}
