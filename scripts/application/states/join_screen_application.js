
'use strict';

class JOIN_SCREEN_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(app)
        {
		if (app.mStateLogs || app.mStateEnterLogs)
		{
			console.log("JOIN_SCREEN_APPLICATION: ENTER");        
		}
		if (app.mJoinScreen)
		{
			//also maybe some clean up as well, so just leaving this if statement here.
			app.mJoinScreen = new JoinScreen(app);

		}
		else
		{
			app.mJoinScreen = new JoinScreen(app);
		}
		app.mJoinScreen.show();
		//document.getElementById("daily_schedule_nav_id").className += " active";
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("JOIN_SCREEN_APPLICATION: EXECUTE");        
		}
               
		if (app.mLogin.mLoggedIn == true)
                {
                        //app.mStateMachine.changeState(app.mSHOW_DAILY_SCHEDULE_APPLICATION);
                        app.mStateMachine.changeState(app.mMAIN_APPLICATION);
                }

	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("JOIN_SCREEN_APPLICATION: EXIT");        
		}
		//hide it for now maybe delete later
		app.mJoinScreen.hide();

		//document.getElementById("daily_schedule_nav_id").className = document.getElementById("daily_schedule_nav_id").className.replace(" active", "");
	}
}
