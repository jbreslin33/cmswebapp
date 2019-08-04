'use strict';

class InsertLoginScreen extends Screen
{
        constructor(application)
        {
                super(application);

		location.hash = 'insert_native_login_screen';

		this.mLoginLink = null;

		//sql php vars
		this.mFirstName = null;
		this.mMiddleName = null;
		this.mLastName = null;
		this.mPhone = null;
		this.mAddress = null;
		this.mEmail = null;
		this.mPassword1 = null;
		this.mPassword2 = null;

		document.getElementById("insertnativeloginscreenbuttonid").onclick = this.hit.bind(this);

		this.setMenuItem(document.getElementById("insert_native_login_screen_nav_id"));
                this.setMessageElement(document.getElementById("insert_native_login_screen_message_id"));
		this.setHtml(document.getElementById("insert_native_login_screen_html_id"));
		this.setSpinner(document.getElementById("insert_native_login_screen_spinner_id"));
		this.setForm(document.getElementById("insert_native_login_screen_form_id"));

		this.setLoginLink(document.getElementById("insert_native_login_screen_login_id"));
	}

	hit()
	{
		//get vars
               	this.mFirstName  = document.getElementById("insert_native_login_screen_first_name_id").value;
               	this.mMiddleName = document.getElementById("insert_native_login_screen_middle_name_id").value;
               	this.mLastName   = document.getElementById("insert_native_login_screen_last_name_id").value;
               	this.mPhone      = document.getElementById("insert_native_login_screen_phone_id").value;
               	this.mAddress    = document.getElementById("insert_native_login_screen_address_id").value;
               	this.mEmail    	 = document.getElementById("insert_native_login_screen_email_id").value;
               	this.mPassword1  = document.getElementById("insert_native_login_screen_password1_id").value;
               	this.mPassword2  = document.getElementById("insert_native_login_screen_password2_id").value;

		this.setUrl("/php/classes/screens/insert_native_login.php?first_name=" + this.mFirstName + "&middle_name=" + this.mMiddleName + "&last_name=" + this.mLastName + "&phone=" + this.mPhone + "&address=" + this.mAddress + "&email=" + this.mEmail + "&password=" + this.mPassword1); 

		this.ajax();
	}

	setLoginLink(loginLink)
	{
		this.mLoginLink = loginLink;
	}

	getLoginLink()
	{
		return this.mLoginLink;
	}

	//overide from screen
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

        setMessage(message, color)
        {
		super.setMessage(message,color);
		/*
                if (this.mMessageElement)
                {
                        console.log('setMessage: ' + message);
                        this.mMessageElement.innerHTML = message;
                        this.mMessageElement.style.color = color;

                        //make sure we can see it
                        this.getMessageElement().style.display = "block";
                        this.getMessageElement().style.visibility = "visible";
                }
                else
                {
                        console.log('attempting to setMessage but there is no mMessageElement: ' + message);
                }
		*/
		//and show login
                this.getLoginLink().style.display = "block";
                this.getLoginLink().style.visibility = "visible";
        }

}
