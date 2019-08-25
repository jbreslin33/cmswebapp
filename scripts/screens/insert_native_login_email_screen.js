'use strict';

class InsertLoginEmailScreen extends Screen
{
        constructor(application)
        {
                super(application);

		location.hash = 'insert_native_login_email_screen';

		//sql php vars
		this.mEmail = null;
		this.mLoginLink = null;

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
	
		this.hideAfterHit()
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
                                if (this.mApplication.mStateMachine.currentState() == this.mApplication.mMAIN_APPLICATION)
                                {
                                        //do nothing
                                }
                                else
                                {
                                        this.mApplication.mStateMachine.changeState(this.mApplication.mMAIN_APPLICATION);
                                }
                        }
                        else if (code == '-101')
                        {
                                //standard error code so stay in state and display message if their is one.
                        }
                        else if (code == '-102')
                        {
                       		//show login link
				this.showLogin();
			}
                }
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
		//insert_native_login_screen_email_div_id
        	var textBox = document.getElementById("insert_native_login_screen_email_div_id");
                textBox.style.display = "none";
                //textBox.style.visibility = "visible";


        	//var button  = document.getElementById("insertnativeloginemailscreenbuttonid");
/*
		document.getE
           <div class="form-row">
                        
                                        <div class="col-md-4 mb-3" id="insert_native_login_screen_email_div_id">
                                                <label for="insert_native_login_screen_email_id">Email</label>
                                                <input type="text" class="form-control" id="insert_native_login_email_screen_email_id" placeholder="Email" required>
                                        </div>
                                </div>

                                <button id="insertnativeloginemailscreenbuttonid" class="btn btn-primary">Submit</button>
*/
	}
}
