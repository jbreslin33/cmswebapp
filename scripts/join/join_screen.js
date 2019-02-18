'use strict';

class JoinScreen
{
	constructor(application)
	{
		this.mApplication = application;

		//logs
		this.mStateLogs = false;
		this.mStateEnterLogs = true; 
		this.mStateExecuteLogs = false;
		this.mStateExitLogs = false;

		//sql php vars
		this.mFirstName = null;
		this.mMiddleName = null;
		this.mLastName = null;
		this.mPhone = null;
		this.mAddress = null;
		this.mEmail = null;
		this.mUsername = null;
		this.mPassword1 = null;
		this.mPassword2 = null;

                //states
                this.mStateMachine = new StateMachine(this);
                this.mGLOBAL_JOIN  = new GLOBAL_JOIN();
                this.mINIT_JOIN    = new INIT_JOIN();

                this.mMAIN_JOIN    = new MAIN_JOIN();

                this.mStateMachine.setGlobalState(this.mGLOBAL_JOIN);
                this.mStateMachine.changeState(this.mINIT_JOIN);

		document.getElementById("joinscreenbuttonid").addEventListener("click",this.send.bind(this));

	}

	update(timestamp)
	{
		this.mStateMachine.update();
	}

	send()
	{
		console.log("send..................");
		//get vars
               	this.mFirstName  = document.getElementById("join_first_name_id").value;
               	this.mMiddleName = document.getElementById("join_middle_name_id").value;
               	this.mLastName   = document.getElementById("join_last_name_id").value;
               	this.mPhone      = document.getElementById("join_phone_id").value;

               	this.mStreet = document.getElementById("join_street_id").value;
               	this.mCity = document.getElementById("join_city_id").value;
               	this.mState = document.getElementById("join_state_id").value;
               	this.mZip = document.getElementById("join_zip_id").value;

               	this.mEmail      = document.getElementById("join_email_id").value;
               	this.mPassword1   = document.getElementById("join_password1_id").value;
               	this.mPassword2   = document.getElementById("join_password2_id").value;

		//need to handle not having a team yet...
		var url = "/php/classes/insert/join.php?first_name=" + this.mFirstName + "&middle_name=" + this.mMiddleName + "&last_name=" + this.mLastName + "&phone=" + this.mPhone + "&street=" + this.mStreet + "&city=" + this.mCity + "&state=" + this.mState + "&zip=" + this.mZip + "&email=" + this.mEmail + "&username=" + this.mUsername + "&password=" + this.mPassword1; 

                var request = new XMLHttpRequest();
                request.onreadystatechange = function()
                {
                        if (request.readyState === XMLHttpRequest.DONE)
                        {
                                if (request.status === 200)
                                {
                                        var data = this.responseText;
                                        if (data)
                                        {
						if (data == 100)
						{
							APPLICATION.mLogin.processLogin(data); //should recieve 100 for good login
						}
                                        }
                                }
                        }
                };
                request.open('POST', url);
                request.send();
	}

	show()
	{
              document.getElementById("join_screen_html_id").style.display = "block";
	}

	hide()
	{
              document.getElementById("join_screen_html_id").style.display = "none";
	}
}
