
'use strict';

class SHOW_DAILY_SCHEDULE_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(app)
        {
		if (app.mStateLogs || app.mStateEnterLogs)
		{
			console.log("SHOW_DAILY_SCHEDULE_APPLICATION: ENTER");        
		}
		if (app.mDailySchedule)
		{
			//also maybe some clean up as well, so just leaving this if statement here.
			app.mDailySchedule = new DailySchedule(app);

		}
		else
		{
			app.mDailySchedule = new DailySchedule(app);
		}
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("SHOW_DAILY_SCHEDULE_APPLICATION: EXECUTE");        
		}
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("SHOW_DAILY_SCHEDULE_APPLICATION: EXIT");        
		}
		//hide it for now maybe delete later
		app.mDailySchedule.hideSchedule();
	}
}
