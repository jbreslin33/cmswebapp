
'use strict';

class DISPLAY_SCHEDULE extends State
{
	constructor() 
	{
		console.log("CONSt dis");
		super();
	}
        
	enter(schedule)
        {
		if (schedule.mStateLogs || schedule.mStateEnterLogs)
		{
			console.log("DISPLAY_SCHEDULE: ENTER");        
		}
		schedule.displaySchedule();
	}

        execute(schedule)
        {
		if (schedule.mStateLogs || schedule.mStateExecuteLogs)
		{
			console.log("DISPLAY_SCHEDULE: EXECUTE");        
		}
	}

        exit(schedule)
        {
		if (schedule.mStateLogs || schedule.mStateExitLogs)
		{
			console.log("DISPLAY_SCHEDULE: EXIT");        
		}
	}
}
