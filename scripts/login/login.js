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

                //states
                this.mStateMachine = new StateMachine(this);
                this.mGLOBAL = new GLOBAL();
                this.mINIT = new INIT();
                this.mCHECK_LOCALSTORAGE = new CHECK_LOCALSTORAGE();
                this.mSCREEN = new SCREEN();
                this.mLOGGED_IN = new LOGGED_IN();
                this.mPLAYER_LOGGED_IN = new PLAYER_LOGGED_IN();
                this.mMANAGER_LOGGED_IN = new MANAGER_LOGGED_IN();
                this.mDIRECTOR_LOGGED_IN = new DIRECTOR_LOGGED_IN();

                this.mStateMachine.setGlobalState(this.mGLOBAL);
                this.mStateMachine.changeState(this.mINIT);
	}

	update(timestamp)
	{
		this.mStateMachine.update();
	}

	sendLogin()
	{
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
						var dataArray = data.split(",");
						APPLICATION.mLogin.processLogin(dataArray[0]); //should recieve 100 for good login
						APPLICATION.mLogin.mUserID  = dataArray[1];
						APPLICATION.mLogin.mClubID  = dataArray[2];
						APPLICATION.mLogin.mRolesID = dataArray[3];
						APPLICATION.mLogin.mTeamID  = dataArray[4];
						APPLICATION.mLogin.save(APPLICATION.mLogin.mUsername, APPLICATION.mLogin.mPassword, APPLICATION.mLogin.mUserID, APPLICATION.mLogin.mClubID, APPLICATION.mLogin.mRolesID, APPLICATION.mLogin.mTeamID);
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
		}
	}

        // Save list of cities to localStorage.
        save(username,password,user_id,club_id,roles_id,team_id)
        {
		localStorage.setItem("username",username);
		localStorage.setItem("password",password);
		localStorage.setItem("user_id",user_id);
		//defaults
		localStorage.setItem("club_id",club_id);
		localStorage.setItem("roles_id",roles_id);
		localStorage.setItem("team_id",team_id); 
        }
}
