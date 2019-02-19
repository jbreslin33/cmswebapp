
'use strict';

class ADD_CLUB_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(app)
        {
		if (app.mStateLogs || app.mStateEnterLogs)
		{
			console.log("ADD_CLUB_APPLICATION: ENTER");        
		}
		if (app.mAddClub)
		{
			//also maybe some clean up as well, so just leaving this if statement here.
			app.mAddClub = new AddClub(app);

		}
		else
		{
			app.mAddClub = new AddClub(app);
		}
		app.mAddClub.show();
		//document.getElementById("daily_schedule_nav_id").className += " active";
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("ADD_CLUB_APPLICATION: EXECUTE");        
		}
              /* 
		if (app.mLogin.mLoggedIn == true)
                {
                        //app.mStateMachine.changeState(app.mSHOW_DAILY_SCHEDULE_APPLICATION);
                        app.mStateMachine.changeState(app.mMAIN_APPLICATION);
                }
		*/

	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("ADD_CLUB_APPLICATION: EXIT");        
		}
		//hide it for now maybe delete later
		app.mAddClub.hide();

		//document.getElementById("daily_schedule_nav_id").className = document.getElementById("daily_schedule_nav_id").className.replace(" active", "");
	}
}
