'use strict';

class Login
{
	constructor(application)
	{
		this.mApplication = application;

		//logs
		this.mStateLogs = false;
		this.mStateEnterLogs = true; 
		this.mStateExecuteLogs = false;
		this.mStateExitLogs = false;
		this.mLoggedIn = false;

		//credentials
		this.mEmail    = null;
		this.mPassword = null;
		this.mUserID   = null;
		this.mClubID   = null;
		this.mTeamID   = null;
		this.mRolesID  = null;

                //header
                this.mHeader = null;

                //states
                this.mStateMachine = new StateMachine(this);
                this.mGLOBAL_LOGIN = new GLOBAL_LOGIN();
                this.mINIT_LOGIN = new INIT_LOGIN();

                this.mCHECK_LOCALSTORAGE = new CHECK_LOCALSTORAGE();
                this.mSCREEN_LOGIN = new SCREEN_LOGIN();
                this.mLOGGED_IN = new LOGGED_IN();

                this.mStateMachine.setGlobalState(this.mGLOBAL_LOGIN);
                this.mStateMachine.changeState(this.mINIT_LOGIN);
	}

	update(timestamp)
	{
		this.mStateMachine.update();
	}

	sendLogin()
	{
		//need to handle not having a team yet...
		var url = "/php/classes/login/login.php?email=" + APPLICATION.mLogin.mEmail + "&password=" + APPLICATION.mLogin.mPassword; 

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
						console.log('CODE FROM LOGIN:' + data);
						if (data == 100)
						{
							APPLICATION.mLogin.process(data); //should recieve 100 for good login
						}
                                        }
                                }
                        }
                };
                request.open('POST', url);
                request.send();
	}

	process(code)
	{
		if (code == 100)
		{
			this.mLoggedIn = true;	
			this.save(this.mEmail, this.mPassword);
		}
	}

        save(email, password)
        {
		localStorage.setItem("email",email);
		localStorage.setItem("password",password);
        }

	show()
        {
                document.getElementById("login_screen_html_id").style.display = "block";
        }

        hide()
        {
                document.getElementById("login_screen_html_id").style.display = "none";
        }

}
