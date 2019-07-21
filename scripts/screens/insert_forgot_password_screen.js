'use strict';

class InsertForgotPasswordScreen extends Screen
{
	constructor(application)
	{
		super(application);

		location.hash = 'insert_forgot_password_screen';
		
		document.getElementById("insertforgotpasswordscreenbuttonid").onclick = this.hit.bind(this);

                this.setHtml(document.getElementById("insert_forgot_password_screen_html_id"));
                this.setMenuItem(document.getElementById("insert_forgot_password_nav_id"));
                this.setMessageElement(document.getElementById("insert_forgot_password_screen_message_id"));
                this.setForm(document.getElementById("insert_forgot_password_screen_form_id"));
                this.setSpinner(document.getElementById("insert_forgot_password_screen_spinner_id"));
	}

	hit()
	{
		this.mHit = true;

      		var email  = document.getElementById("insert_forgot_password_screen_email_id").value;

		APPLICATION.getCurrentScreen().setUrl("/php/classes/insert/insert_forgot_password.php?email=" + email); 
                APPLICATION.getCurrentScreen().ajax();
	}
        
	execute()
        {
                this.processData();

	//	if (
/*
                if (this.mJson)
                {
                        if (this.mJson.persons)
                        {
                                this.mApplication.mStateMachine.changeState(this.mApplication.mMAIN_APPLICATION);
                        }
                }
		*/
        }

        processData()
        {
                if (this.mData)
                {
                        var dataArray = this.mData.split(",");
                        this.mCode = dataArray[0];
                        if (this.mCode == -100)
                        {

                                //this.mApplication.setJWT(dataArray[1]); //set jwt

                                //JSON
                                //dataArray.shift(); //remove mCode
                                //dataArray.shift(); //remove mJwt
                                //dataArray.join();
                                //this.mJson = JSON.parse(dataArray);

                                //this.processJsonData();
                                this.setMessage(dataArray[1],'green');
                        }
                        if (this.mCode == -101)
                        {
                                this.setMessage(dataArray[1],'red');
                        }
                }
        }


}
