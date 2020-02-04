'use strict';

class InsertEmailScreen extends Screen
{
        constructor(application)
        {
                super(application);

		location.hash = 'insert_email_screen';

		//sql php vars
		this.mEmail = null;
		this.mLoginLink = null;

                this.setMessageElement(document.getElementById("insert_email_screen_message_id"));
		this.setHtml(document.getElementById("insert_email_screen_html_id"));
		this.setSpinner(document.getElementById("insert_email_screen_spinner_id"));
		this.setForm(document.getElementById("insert_email_screen_form_id"));

		this.setLoginLink(document.getElementById("insert_email_screen_login_id"));

                this.getForm().addEventListener('submit', function(e) 
		{
                        e.preventDefault();
			APPLICATION.getCurrentScreen().hit();
                });
	}

	hit()
	{
		//get vars
               	this.mEmail    	 = document.getElementById("insert_email_screen_email_id").value;
		this.setUrl("/php/classes/screens/insert_email_screen.php?email=" + this.mEmail); 
		this.ajax();
		this.hideAfterHit()
	}
/*
        processCodes()
        {
                super.processCodes();

                if (this.mCode == '-101')
                {
                        this.hideForm();
                }
        }
*/
        processCodes()
        {
                super.processCodes();
                
		//definite success so send to upcoming
                if (this.mCode == '-101')
                {
                	if (this.mApplication.mStateMachine.currentState() == this.mApplication.mUPCOMING_APPLICATION)
                        {
                                //do nothing
                        }
                        else
                        {
                                this.mApplication.mStateMachine.changeState(this.mApplication.mUPCOMING_APPLICATION);
                        }
               	}
                else if (this.mCode == '-101')
               	{
			this.hideLogin();
                }
                else if (this.mCode == '-102')
                {
			this.showLogin();
                }
        }

	//For login Link
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

        }

	showLogin()
	{
		//and show login
                this.getLoginLink().style.display = "block";
                this.getLoginLink().style.visibility = "visible";
	}

	hideLogin()
	{
		if (this.getLoginLink())
                {
                        this.getLoginLink().style.display = "none";
                }
	}

        show()
        {
		super.show();
		this.hideLogin();
        }

        hide()
        {
		super.hide();
		this.hideLogin();
        }
	hideAfterHit()
	{
        	var div = document.getElementById("insert_email_screen_form_id");
                div.style.display = "none";
	}
	processPersons()
	{

	}
}
