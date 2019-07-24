'use strict';

class UpdateForgotPasswordScreen extends Screen
{
	constructor(application)
	{
                super(application);

		location.hash = 'update_forgot_password_screen';
		
		document.getElementById("updateforgotpasswordscreenbuttonid").onclick = this.hit.bind(this);

                this.setHtml(document.getElementById("update_forgot_password_screen_html_id"));
                //this.setMenuItem(document.getElementById("update_forgot_password_nav_id"));
                this.setMessageElement(document.getElementById("update_forgot_password_screen_message_id"));
                this.setForm(document.getElementById("update_forgot_password_screen_form_id"));
                this.setSpinner(document.getElementById("update_forgot_password_screen_spinner_id"));

		this.mPassword1 = null;
		this.mPassword2 = null;
	}

	hit()
	{
		this.mHit = true;

		//get vars
               	this.mPassword1 = document.getElementById("update_forgot_password_screen_password1_id").value;
               	this.mPassword2 = document.getElementById("update_forgot_password_screen_password2_id").value;
                
		APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/update_forgot_password.php?&forgot_password_token=" + this.mApplication.mForgotPasswordToken + "&password=" + this.mPassword1 + "&email=" + this.mApplication.mForgotPasswordEmail); 
                APPLICATION.getCurrentScreen().ajax();
	}
        
	checkValidity()
	{
		var form = APPLICATION.getCurrentScreen().getForm();

		if (form.checkValidity() == true) 
		{
			var passwordMatch = false;

			if (this.mPassword1 == this.mPassword2)
			{
                        	APPLICATION.getCurrentScreen().send();

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
