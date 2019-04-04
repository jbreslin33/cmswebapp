'use strict';

class InsertForgotPasswordScreen
{
	constructor(application)
	{
		this.mApplication = application;

		location.hash = "insert_forgot_password_screen";

		this.mCode = 0;
		this.mData = null;

		this.mHit = false;

		//sql php vars
		this.mEmail = null;
		
		document.getElementById("insertforgotpasswordscreenbuttonid").onclick = this.hit.bind(this);
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
                                <div id="insert_forgot_password_screen_spinner_id" class="spinner-border text-primary" role="status">
                                        <span class="sr-only">Loading...</span>
                                </div>
                        </div>
                </div>

                <button id="insertforgotpasswordscreenbuttonid" class="btn btn-primary">Submit</button>
        </form>
		*/
       
	showSpinner()
	{
		console.log('in funcion');
              //document.getElementById("insert_forgot_password_screen_html_id").style.display = "none";
              document.getElementById("insert_forgot_password_screen_spinner_id").style.display = "block";
	}

	show()
	{
              document.getElementById("insert_forgot_password_screen_html_id").style.display = "block";
              document.getElementById("insert_forgot_password_screen_spinner_id").style.display = "none";
	}

	hide()
	{
              document.getElementById("insert_forgot_password_screen_html_id").style.display = "none";
	}
}
