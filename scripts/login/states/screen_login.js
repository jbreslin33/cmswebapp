
'use strict';

class SCREEN_LOGIN extends State
{
	constructor() 
	{
		super();
	}

        enter(login)
        {
		if (login.mStateLogs || login.mStateEnterLogs)
		{
			console.log("SCREEN_LOGIN: ENTER");        
		}
		//create login screen
		login.mLoginScreen = new LoginScreen(login.mApplication,login);	
  		//document.getElementById("login-html").style.display = "block";

	}

        execute(login)
        {
		if (login.mStateLogs || login.mStateExecuteLogs)
		{
			console.log("SCREEN_LOGIN: EXECUTE");        
		}
		if (login.mLoggedIn == true)
		{
			login.mStateMachine.changeState(login.mLOGGED_IN);
		}
	}

        exit(login)
        {
		if (login.mStateLogs || login.mStateExitLogs)
		{
			console.log("SCREEN_LOGIN: EXIT");        
		}
  		//document.getElementById("login-html").style.display = "none";
	}
}
