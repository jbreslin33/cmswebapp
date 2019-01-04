
'use strict';

class CHECK_LOCALSTORAGE extends State
{
	constructor() 
	{
		super();
	}

        enter(login)
        {
		if (login.mStateLogs || login.mStateEnterLogs)
		{
			console.log("CHECK_LOCALSTORAGE: ENTER");        
		}
		
		//set login credentials from local storage
		login.mUsername = localStorage.getItem("username");
		login.mPassword = localStorage.getItem("password");

		//this checks if you have credentials saved local if so it sends login credentials to reference against db, if not it takes you to login screen.
		if (login.mUsername && login.mPassword)
		{
			login.sendLogin();
		}
		else
		{
			login.mStateMachine.changeState(login.mSCREEN_LOGIN);
		}
	}

        execute(login)
        {
		if (login.mStateLogs || login.mStateExecuteLogs)
		{
			console.log("CHECK_LOCALSTORAGE: EXECUTE");        
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
			console.log("CHECK_LOCALSTORAGE: EXIT");        
		}
	}
}
