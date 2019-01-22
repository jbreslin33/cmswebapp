'use strict';

class Login
{
	constructor(application)
	{
		this.mLoginScreen = null;
		this.mApplication = application;

		//logs
		this.mStateLogs = false;
		this.mStateEnterLogs = true; 
		this.mStateExecuteLogs = false;
		this.mStateExitLogs = false;
		this.mLoggedIn = false;

		//credentials
		this.mUsername = null;
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
                this.mPLAYER_LOGGED_IN = new PLAYER_LOGGED_IN();
                this.mPARENT_LOGGED_IN = new PARENT_LOGGED_IN();
                this.mMANAGER_LOGGED_IN = new MANAGER_LOGGED_IN();
                this.mCOACH_LOGGED_IN = new COACH_LOGGED_IN();
                this.mDIRECTOR_LOGGED_IN = new DIRECTOR_LOGGED_IN();

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
		var url = "/php/classes/login/login.php?username=" + APPLICATION.mLogin.mUsername + "&password=" + APPLICATION.mLogin.mPassword; 

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

	processLogin(code)
	{
		if (code == 100)
		{
			this.mLoggedIn = true;	
			APPLICATION.mLogin.save(APPLICATION.mLogin.mUsername, APPLICATION.mLogin.mPassword);
		}
	}

        // Save list of cities to localStorage.
        save(username,password)
        {
		localStorage.setItem("username",username);
		localStorage.setItem("password",password);
        }
}
