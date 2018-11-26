
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
		if (login.mApplication)
		{
			console.log("mAppliation exists");
		}
                login.mApplication.mSchedule = new Schedule(login.mApplication);
		login.mApplication.mSchedule.mPractice = new Practice(login.mApplication.mSchedule);
		login.mApplication.mSchedule.mPractice.mPracticeScreen = new PracticeScreen(login.mApplication.mSchedule.mPractice);

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
