'use strict';

class InsertNativeLoginScreen extends Screen
{
        constructor(application)
        {
                super(application);

		console.log('InsertNativeLoginScreen Con');

		location.hash = 'insert_native_login_screen';

		this.mLoginLink = null;

		//sql php vars
		this.mPassword1 = null;
		this.mPassword2 = null;

		document.getElementById("insertnativeloginscreenbuttonid").onclick = this.hit.bind(this);

		this.setMenuItem(document.getElementById("insert_native_login_screen_nav_id"));
                this.setMessageElement(document.getElementById("insert_native_login_screen_message_id"));
		this.setHtml(document.getElementById("insert_native_login_screen_html_id"));
		this.setSpinner(document.getElementById("insert_native_login_screen_spinner_id"));
		this.setForm(document.getElementById("insert_native_login_screen_form_id"));
	}

	hit()
	{
		//get vars
               	this.mPassword1  = document.getElementById("insert_native_login_screen_password1_id").value;
               	this.mPassword2  = document.getElementById("insert_native_login_screen_password2_id").value;

		this.setUrl("/php/classes/screens/insert_native_login.php?password=" + this.mPassword1 + "&email=" + this.mApplication.mJoinEmail); 
		console.log('getUrl:' + this.getUrl());

		this.ajax();
	}
        
	send()
	{
        	var passwordMatch = false;

                if (this.mPassword1 == this.mPassword2)
                {
			super.send();

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
