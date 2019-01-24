
'use strict';

class DISPLAY_DAILY_SCHEDULE extends State
{
	constructor() 
	{
		super();
	}
        
	enter(schedule)
        {
		if (schedule.mStateLogs || schedule.mStateEnterLogs)
		{
			console.log("DISPLAY_DAILY_SCHEDULE: ENTER");        
		}
		schedule.displaySchedule();
	}

        execute(schedule)
        {
		if (schedule.mStateLogs || schedule.mStateExecuteLogs)
		{
			console.log("DISPLAY_DAILY_SCHEDULE: EXECUTE");        
		}
	}

        exit(schedule)
        {
		if (schedule.mStateLogs || schedule.mStateExitLogs)
		{
			console.log("DISPLAY_DAILY_SCHEDULE: EXIT");        
		}
	}
}
