'use strict';

class InsertForgotPasswordScreen extends Screen
{
	constructor(application)
	{
		super(application);

		location.hash = "insert_forgot_password_screen";

		//sql php vars
		this.mEmail = null;
		
		document.getElementById("insertforgotpasswordscreenbuttonid").onclick = this.hit.bind(this);
                
                this.mStateMachine = new StateMachine(this);
                this.mINIT_INSERT_FORGOT_PASSWORD_SCREEN            = new INIT_INSERT_FORGOT_PASSWORD_SCREEN();
                this.mGLOBAL_INSERT_FORGOT_PASSWORD_SCREEN            = new GLOBAL_INSERT_FORGOT_PASSWORD_SCREEN();
                this.mWAIT_INSERT_FORGOT_PASSWORD_SCREEN            = new WAIT_INSERT_FORGOT_PASSWORD_SCREEN();

                this.mStateMachine.setGlobalState(this.mGLOBAL_INSERT_FORGOT_PASSWORD_SCREEN);
                this.mStateMachine.changeState(this.mINIT_INSERT_FORGOT_PASSWORD_SCREEN);
	}

	hit()
	{
		this.mHit = true;

      		this.mEmail  = document.getElementById("insert_forgot_password_screen_email_id").value;

		var url = "/php/classes/insert/insert_forgot_password.php?email=" + this.mEmail; 

                var request = new XMLHttpRequest();
                request.onreadystatechange = function()
                {
                        if (request.readyState === XMLHttpRequest.DONE)
                        {
                                if (request.status === 200)
                                {
					APPLICATION.mInsertForgotPasswordScreen.mData = this.responseText;
                                }
                        }
                };

		var form = document.getElementById('insert_forgot_password_screen_html_id');
		if (form.checkValidity() == true) 
		{
			request.open('POST', url);
                	request.send();
		}
	}
	/*
        <form id="insert_forgot_password_screen_html_id" class="needs-validation">
                <div class="form-row">
                        <div class="col-md-4 mb-3">
                                <label for="insert_forgot_password_screen_email_id">Email</label>
                                <input type="text" class="form-control" id="insert_forgot_password_screen_email_id" placeholder="Email" value="Email" required>
                                <span id='insert_forgot_password_screen_email_message_id'></span>
                        </div>
                </div>
                <div id="insert_forgot_password_screen_spinner_id" class="spinner-border text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                </div>

                <button id="insertforgotpasswordscreenbuttonid" class="btn btn-primary">Submit</button>
        </form>

	        <form id="insert_forgot_password_screen_html_id" class="needs-validation">
                <div class="form-row">
                        <div class="col-md-4 mb-3">
                                <label id="insert_forgot_passwored_screen_label_id" for="insert_forgot_password_screen_email_id">Email</label>
                                <input type="text" class="form-control" id="insert_forgot_password_screen_email_id" placeholder="Email" value="Email" required>
                                <span id='insert_forgot_password_screen_email_message_id'></span>
                        </div>
                </div>
                <div id="insert_forgot_password_screen_spinner_id" class="spinner-border text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                </div>

                <button id="insertforgotpasswordscreenbuttonid" class="btn btn-primary">Submit</button>
        </form>

      */ 
	showSpinner()
	{
              	document.getElementById("insert_forgot_password_screen_label_id").style.visibility = "hidden";

              	document.getElementById("insert_forgot_password_screen_email_id").style.visibility = "hidden";

              	document.getElementById("insertforgotpasswordscreenbuttonid").style.visibility = "hidden";

              	document.getElementById("insert_forgot_password_screen_spinner_id").style.visibility = "visible";
	}

	show()
	{
              	document.getElementById("insert_forgot_password_screen_html_id").style.display = "block";
              	document.getElementById("insert_forgot_password_screen_spinner_id").style.visibility = "hidden";
	}

	hide()
	{
              	document.getElementById("insert_forgot_password_screen_html_id").style.display = "none";
	}
}
