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

		//document.getElementById("updateforgotpasswordscreenbuttonid").addEventListener("click",this.hit.bind(this));
		document.getElementById("updateforgotpasswordscreenbuttonid").onclick = this.hit.bind(this);
	}

	hit()
	{
		console.log('hit in update');
		//get vars
		/*
               	this.mPassword1  = document.getElementById("update_forgot_password_screen_password1_id").value;
               	this.mPassword2  = document.getElementById("update_forgot_password_screen_password2_id").value;

		var url = "/php/classes/update/update_forgot_password.php?selector=" + this.mApplication.mSelector + "&token=" + this.mApplication.mToken + "&password=" + this.mPassword1; 

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
						APPLICATION.mUpdateForgotPasswordScreen.mData = data;
                                        }
                                }
                        }
                };

		var form = document.getElementById('update_forgot_password_screen_html_id');
		if (form.checkValidity() == true) 
		{
			var passwordMatch = false;

			if (this.mPassword1 == this.mPassword2)
			{
				request.open('POST', url);
                		request.send();

          			document.getElementById('update_forgot_password_screen_password_message_id').style.color = 'green';
          			document.getElementById('update_forgot_password_screen_password_message_id').innerHTML = 'passwords are matching';
				console.log('posting');
			}
			else
			{
          			document.getElementById('update_forgot_password_screen_password_message_id').style.color = 'red';
          			document.getElementById('update_forgot_password_screen_password_message_id').innerHTML = 'passwords are not matching';
				console.log('no match not posting');
			}
		}
		*/
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
