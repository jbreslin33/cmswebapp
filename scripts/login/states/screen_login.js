
'use strict';

class SCREEN_LOGIN extends State
{
	constructor() 
	{
		super();
	}

        enter(app)
        {
		if (app.mStateLogs || app.mStateEnterLogs)
		{
			console.log("SCREEN_LOGIN: ENTER");        
		}
		//create login screen
		app.mLogin.mLoginScreen = new LoginScreen(app,app.mLogin);	
  		document.getElementById("loginscreenhtmlid").style.display = "block";

	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("SCREEN_LOGIN: EXECUTE");        
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
			console.log("SCREEN_LOGIN: EXIT");        
		}
  		document.getElementById("loginscreenhtmlid").style.display = "none";
	}
}
