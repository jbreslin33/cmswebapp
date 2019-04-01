'use strict';

class UpdateForgotPasswordScreen
{
	constructor(application)
	{
		this.mApplication = application;

		location.hash = "update_forgot_password_screen";

		this.mCode = 0;
                this.mData = null;

		//sql php vars
		this.mPassword1 = null;
		this.mPassword2 = null;

		document.getElementById("updateforgotpasswordscreenbuttonid").addEventListener("click",this.hit.bind(this));
	}

	hit()
	{
		//get vars
               	this.mPassword1  = document.getElementById("update_forgot_password_screen_password1_id").value;
               	this.mPassword2  = document.getElementById("update_forgot_password_screen_password2_id").value;

		var url = "/php/classes/update/update_forgot_password.php?selector=" + this.mApplication.mSelector + "&token=" + this.mApplication.mToken + "&password=" + this.mLastName + "&phone=" + this.mPhone + "&address=" + this.mAddress + "&email=" + this.mEmail + "&password=" + this.mPassword; 

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
						APPLICATION.mInsertNativeLoginScreen.mData = data;
                                        }
                                }
                        }
                };

		var form = document.getElementById('update_forgot_password_screen_form_id');
		if (form.checkValidity() == true) 
		{
			var passwordMatch = false;

			if (this.mPassword1 == this.mPassword2)
			{
				request.open('POST', url);
                		request.send();

          			document.getElementById('update_forgot_password_screen_message_id').style.color = 'green';
          			document.getElementById('update_forgot_password_screen_message_id').innerHTML = 'passwords are matching';
			}
			else
			{
          			document.getElementById('update_forgot_password_screen_message_id').style.color = 'red';
          			document.getElementById('update_forgot_password_screen_message_id').innerHTML = 'passwords are not matching';
			}
		}
	}
        
	show()
	{
              	document.getElementById("update_forgot_password_screen_html_id").style.display = "block";
	}

	hide()
	{
              document.getElementById("update_forgot_password_screen_html_id").style.display = "none";
	}
}
