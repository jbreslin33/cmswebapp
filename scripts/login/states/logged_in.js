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
                //if there is a login screen hide it
                if (login.mLoginScreen)
                {
                        login.mLoginScreen.hide();
                }

		//show navbar
		document.getElementById("nav_bar_id").style.display = "block";

                //display schedule since this a player
                //login.app.mSchedule = new Schedule(app);
	}

        execute(login)
        {
		if (login.mStateLogs || login.mStateExecuteLogs)
		{
			console.log("LOGGED_IN: EXECUTE");        
		}
		//yeah so right here i need to send you somewhere like a default schedule screeen for player/parents but it should be used by everyone on initial load just to give them the upcoming events
		//so basically send them to schedule state
		if (login.mLoggedIn == true)
		{
            		//login.mStateMachine.changeState(app.mCHECK_LOCAL_STORAGE_SCHEDULE);

		}
		else
		{
			//you should relaunch or goto intial login state	
			//login.mStateMachine.changeState(app.mSCREEN_LOGIN);
		}
	}

        exit(login)
        {
		if (login.mStateLogs || login.mStateExitLogs)
		{
			console.log("LOGGED_IN: EXIT");        
		}
	}
}
