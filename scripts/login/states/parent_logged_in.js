
'use strict';

class PARENT_LOGGED_IN extends State
{
	constructor() 
	{
		super();
	}

        enter(login)
        {
		if (login.mStateLogs || login.mStateEnterLogs)
		{
			console.log("PARENT_LOGGED_IN: ENTER");        
		}

		//if there is a login screen hide it
		if (login.mLoginScreen)
		{
			login.mLoginScreen.hide();
		}

                login.mApplication.mSchedule = new Schedule(login.mApplication);
	}

        execute(login)
        {
		if (login.mStateLogs || login.mStateExecuteLogs)
		{
			console.log("PARENT_LOGGED_IN: EXECUTE");        
		}
		if (login.mLoggedIn == false)
		{
			//you should relaunch or goto intial login state	
		}
	}

        exit(login)
        {
		if (login.mStateLogs || login.mStateExitLogs)
		{
			console.log("PARENT_LOGGED_IN: EXIT");        
		}
	}
}
