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

		//no need to send any more info
		APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/insert_forgot_password.php?email=" + email); 
                APPLICATION.getCurrentScreen().ajax();
	}
        
	execute()
        {
                this.processData();
        }

	processJsonData()
        {
                if (this.mJson)
                {
                        this.processJwts();
                        this.processClubs();
                        this.processTeams();
                        this.processPersons();
                        this.processSelects();
                        this.processMessages();
                        this.processCodes();
                }
        }

/*
        processData()
        {
                if (this.mData)
                {
                        var dataArray = this.mData.split(",");
                        this.mCode = dataArray[0];
                        if (this.mCode == -100)
                        {
                                this.setMessage(dataArray[1],'green');
                        }
                        if (this.mCode == -101)
                        {
                                this.setMessage(dataArray[1],'red');
                        }
                }
       	}
*/
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
                }
        }
}
