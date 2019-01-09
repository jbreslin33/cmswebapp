
'use strict';

class LOGGED_IN extends State
{
	constructor() 
	{
		super();
	}

        enter(login)
        {
		if (login.mStateLogs || login.mStateEnterLogs)
		{
			console.log("LOGGED_IN: ENTER");        
		}

	}

        execute(login)
        {
		if (login.mStateLogs || login.mStateExecuteLogs)
		{
			console.log("LOGGED_IN: EXECUTE");        
		}
		//yeah so right here i need to send you somewhere like a default schedule screeen for player/parents but it should be used by everyone on initial load just to give them the upcoming events
		//so basically send them to schedule state
		if (login.mLoggedIn == false)
		{
			//you should relaunch or goto intial login state	
			login.mStateMachine.changeState(login.mSCREEN_LOGIN);
		}
               
		//display schedule since this a player
                login.mApplication.mSchedule = new Schedule(login.mApplication);

	}

        exit(login)
        {
		if (login.mStateLogs || login.mStateExitLogs)
		{
			console.log("LOGGED_IN: EXIT");        
		}
	}
}
