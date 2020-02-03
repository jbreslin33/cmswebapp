'use strict';

class InsertForgotPasswordScreen extends Screen
{
	constructor(application)
	{
		super(application);

		location.hash = 'insert_forgot_password_screen';
		
		document.getElementById("insertforgotpasswordscreenbuttonid").onclick = this.hit.bind(this);

                this.setHtml(document.getElementById("insert_forgot_password_screen_html_id"));
                this.setMessageElement(document.getElementById("insert_forgot_password_screen_message_id"));
                this.setForm(document.getElementById("insert_forgot_password_screen_form_id"));
                this.setSpinner(document.getElementById("insert_forgot_password_screen_spinner_id"));

                this.getForm().addEventListener('submit', function(e) 
		{
                        e.preventDefault();
                });
	}

	hit()
	{
      		var email  = document.getElementById("insert_forgot_password_screen_email_id").value;

		//no need to send any more info
		APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/insert_forgot_password.php?email=" + email); 
                APPLICATION.getCurrentScreen().ajax();
	}
        
	processCodes()
        {
		super.processCodes();

                if (this.mCode == '-101')
                {
			this.hideForm();
                }
        }
}
