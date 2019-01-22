
'use strict';

class CHECK_LOCALSTORAGE extends State
{
	constructor() 
	{
		super();
	}

        enter(app)
        {
		if (app.mStateLogs || app.mStateEnterLogs)
		{
			console.log("CHECK_LOCALSTORAGE: ENTER");        
		}
		
		//set login credentials from local storage
		app.mLogin.mUsername = localStorage.getItem("username");
		app.mLogin.mPassword = localStorage.getItem("password");

		//this checks if you have credentials saved local if so it sends login credentials to reference against db, if not it takes you to login screen.
		if (app.mLogin.mUsername && app.mLogin.mPassword)
		{
			app.mLogin.sendLogin();
		}
		else
		{
			app.mStateMachine.changeState(app.mSCREEN_LOGIN);
		}
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("CHECK_LOCALSTORAGE: EXECUTE");        
		}

		if (app.mLogin.mLoggedIn == true)
		{
                        app.mStateMachine.changeState(app.mLOGGED_IN);
		}
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("CHECK_LOCALSTORAGE: EXIT");        
		}
	}
}
