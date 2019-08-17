'use strict';

class InsertLoginEmailScreen extends Screen
{
        constructor(application)
        {
                super(application);

		location.hash = 'insert_native_login_email_screen';

		this.mLoginLink = null;

		//sql php vars
		this.mEmail = null;

		document.getElementById("insertnativeloginemailscreenbuttonid").onclick = this.hit.bind(this);

		this.setMenuItem(document.getElementById("insert_native_login_email_screen_nav_id"));
                this.setMessageElement(document.getElementById("insert_native_login_email_screen_message_id"));
		this.setHtml(document.getElementById("insert_native_login_email_screen_html_id"));
		this.setSpinner(document.getElementById("insert_native_login_email_screen_spinner_id"));
		this.setForm(document.getElementById("insert_native_login_email_screen_form_id"));

		this.setLoginLink(document.getElementById("insert_native_login_email_screen_login_id"));
	}

	hit()
	{
		//get vars
               	this.mEmail    	 = document.getElementById("insert_native_login_email_screen_email_id").value;

		this.setUrl("/php/classes/screens/insert_native_email_login.php?email=" + this.mEmail); 

		this.ajax();
	}

        execute()
        {
                this.processData();
/*
                if (this.mJson)
                {
                        if (this.mJson.persons)
                        {
                                this.mApplication.mStateMachine.changeState(this.mApplication.mMAIN_APPLICATION);
                        }
                }
		*/
                this.resetDataVariables();
        }


	setLoginLink(loginLink)
	{
		this.mLoginLink = loginLink;
	}

	getLoginLink()
	{
		return this.mLoginLink;
	}

        setMessage(message, color)
        {
		super.setMessage(message,color);

		//and show login
                this.getLoginLink().style.display = "block";
                this.getLoginLink().style.visibility = "visible";
        }
        show()
        {
		super.show();
                
		if (this.getLoginLink())
                {
                        this.getLoginLink().style.display = "none";
                }
        }

        hide()
        {
		super.hide();

                if (this.getLoginLink())
                {
                        this.getLoginLink().style.display = "none";
                }
        }
}
