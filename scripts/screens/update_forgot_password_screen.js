'use strict';

class UpdateForgotPasswordScreen extends Screen
{
	constructor(application)
	{
                super(application);

		location.hash = "update_forgot_password_screen";

		//html ids
               	this.mSpinnerId = "update_forgot_password_screen_spinner_id";
                this.mHtmlId = "update_forgot_password_screen_html_id";

                //sql php vars
		this.mPassword1 = null;
		this.mPassword2 = null;

		document.getElementById("updateforgotpasswordscreenbuttonid").onclick = this.hit.bind(this);

                this.mStateMachine = new StateMachine(this);
                this.mINIT_UPDATE_FORGOT_PASSWORD_SCREEN            = new INIT_UPDATE_FORGOT_PASSWORD_SCREEN();
                this.mGLOBAL_UPDATE_FORGOT_PASSWORD_SCREEN            = new GLOBAL_UPDATE_FORGOT_PASSWORD_SCREEN();
                this.mWAIT_UPDATE_FORGOT_PASSWORD_SCREEN            = new WAIT_UPDATE_FORGOT_PASSWORD_SCREEN();

                this.mStateMachine.setGlobalState(this.mGLOBAL_UPDATE_FORGOT_PASSWORD_SCREEN);
                this.mStateMachine.changeState(this.mINIT_UPDATE_FORGOT_PASSWORD_SCREEN);
	}

	hit()
	{
		this.mHit = true;

		//get vars
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
			}
			else
			{
          			document.getElementById('update_forgot_password_screen_password_message_id').style.color = 'red';
          			document.getElementById('update_forgot_password_screen_password_message_id').innerHTML = 'passwords are not matching';
			}
		}
	}
}
