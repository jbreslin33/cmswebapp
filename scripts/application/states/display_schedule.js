
'use strict';

class DISPLAY_SCHEDULE extends State
{
	constructor() 
	{
		super();
	}
        
	enter(app)
        {
		if (app.mStateLogs || app.mStateEnterLogs)
		{
			console.log("DISPLAY_SCHEDULE: ENTER");        
		}
		app.mSchedule.displaySchedule();
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("DISPLAY_SCHEDULE: EXECUTE");        
		}
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("DISPLAY_SCHEDULE: EXIT");        
		}
	}
}
