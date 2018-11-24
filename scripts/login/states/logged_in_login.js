
'use strict';

class LOGGED_IN_LOGIN extends State
{
	constructor() 
	{
		super();
	}

        enter(login)
        {
		if (login.mStateLogs || login.mStateEnterLogs)
		{
			console.log("LOGGED_IN_LOGIN: ENTER");        
		}

		//if there is a login screen hide it
		if (login.mLoginScreen)
		{
			login.mLoginScreen.hide();
		}

		//lets fire up a report since we are logged in
                login.mApplication.mDailySchedule = new DailySchedule(login.mApplication);
                login.mApplication.mDailySchedule.update();
	}

        execute(login)
        {
		if (login.mStateLogs || login.mStateExecuteLogs)
		{
			console.log("LOGGED_IN_LOGIN: EXECUTE");        
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
			console.log("LOGGED_IN_LOGIN: EXIT");        
		}
	}
}
