
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
	}
}
