
'use strict';

class SHOW_SCHEDULE_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(app)
        {
		if (app.mStateLogs || app.mStateEnterLogs)
		{
			console.log("SHOW_SCHEDULE_APPLICATION: ENTER");        
		}
		if (app.mSchedule)
		{

		}
		else
		{
			app.mSchedule = new Schedule(app);
		}
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("SHOW_SCHEDULE_APPLICATION: EXECUTE");        
		}
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("SHOW_SCHEDULE_APPLICATION: EXIT");        
		}
	}
}
