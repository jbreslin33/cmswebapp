
'use strict';

class LOGGED_IN extends State
{
	constructor() 
	{
		super();
	}

        enter(app)
        {
		if (app.mStateLogs || app.mStateEnterLogs)
		{
			console.log("LOGGED_IN: ENTER");        
		}
                //if there is a login screen hide it
                if (app.mLogin.mLoginScreen)
                {
                        app.mLogin.mLoginScreen.hide();
                }

		//show navbar
		document.getElementById("nav_bar_id").style.display = "block";

                //display schedule since this a player
                app.mSchedule = new Schedule(app);
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("LOGGED_IN: EXECUTE");        
		}
		//yeah so right here i need to send you somewhere like a default schedule screeen for player/parents but it should be used by everyone on initial load just to give them the upcoming events
		//so basically send them to schedule state
		if (app.mLogin.mLoggedIn == false)
		{
			//you should relaunch or goto intial login state	
			app.mStateMachine.changeState(app.mSCREEN_LOGIN);
		}
	
               

	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("LOGGED_IN: EXIT");        
		}
	}
}
