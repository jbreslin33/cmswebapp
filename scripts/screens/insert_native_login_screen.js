'use strict';

class InsertNativeLoginScreen extends Screen
{
        constructor(application)
        {
                super(application);

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

		this.setLoginLink(document.getElementById("insert_native_login_screen_login_id"));
	}

	hit()
	{
		//get vars
               	this.mPassword1  = document.getElementById("insert_native_login_screen_password1_id").value;
               	this.mPassword2  = document.getElementById("insert_native_login_screen_password2_id").value;

		this.setUrl("/php/classes/screens/insert_native_login.php?password=" + this.mPassword1 + "&join_email_token=" + this.mApplication.mJoinEmailToken); 

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

	processCodes()
        {
                if (this.mJson.codes)
                {
                        var code = 0;
                        for (var i = 0; i < this.mJson.codes.length; i++)
                        {
                                code = this.mJson.codes[i].code;
                        }
                        //definite success so send to main
                        if (code == '-100')
                        {
                                if (this.mApplication.mStateMachine.currentState() == this.mApplication.mCHOOSE_PERSON_APPLICATION)
                                {
                                        //do nothing
                                }
                                else
                                {
                                        this.mApplication.mStateMachine.changeState(this.mApplication.mCHOOSE_PERSON_APPLICATION);
                                }
			
                        }
                        else if (code == '-102')
                        {
                                //standard error code so stay in state and display message if their is one.
                        }
                }
        }
	processPersons()
	{

	}

}
