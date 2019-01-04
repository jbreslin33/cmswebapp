
'use strict';

class SCREEN extends State
{
	constructor() 
	{
		super();
	}

        enter(login)
        {
		if (login.mStateLogs || login.mStateEnterLogs)
		{
			console.log("SCREEN: ENTER");        
		}
		//create login screen
		login.mLoginScreen = new LoginScreen(login.mApplication,login);	
	}

        execute(login)
        {
		if (login.mStateLogs || login.mStateExecuteLogs)
		{
			console.log("SCREEN: EXECUTE");        
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
			console.log("SCREEN: EXIT");        
		}
	}
}
