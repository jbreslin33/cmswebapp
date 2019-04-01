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
		this.mEmail = null;
		
		document.getElementById("updateforgotpasswordscreenbuttonid").onclick = this.hit.bind(this);
	}

	hit()
	{
      		this.mEmail  = document.getElementById("update_forgot_password_screen_email_id").value;

		var url = "/php/classes/update/update_forgot_password.php?email=" + this.mEmail; 

                var request = new XMLHttpRequest();
                request.onreadystatechange = function()
                {
                        if (request.readyState === XMLHttpRequest.DONE)
                        {
                                if (request.status === 200)
                                {
					APPLICATION.mUpdateForgotPasswordScreen.mData = this.responseText;
                                }
                        }
                };

		var form = document.getElementById('update_forgot_password_screen_html_id');
		if (form.checkValidity() == true) 
		{
			request.open('POST', url);
                	request.send();
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
