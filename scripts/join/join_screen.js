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
		//get vars
               	this.mFirstName  = document.getElementById("join_first_name_id").value;
               	this.mMiddleName = document.getElementById("join_middle_name_id").value;
               	this.mLastName   = document.getElementById("join_last_name_id").value;

		//need to handle not having a team yet...
		var url = "/php/classes/insert/join.php?first_name=" + this.mFirstName + "&middle_name=" + this.mMiddleName + "&last_name=" + this.mLastName; 

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
