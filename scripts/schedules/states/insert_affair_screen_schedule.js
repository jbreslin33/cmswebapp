
'use strict';

class INSERT_AFFAIR_SCREEN_SCHEDULE extends State
{
	constructor() 
	{
		super();
	}
        
	enter(schedule)
        {
		if (schedule.mStateLogs || schedule.mStateEnterLogs)
		{
			console.log("INSERT_AFFAIR_SCREEN_SCHEDULE: ENTER");        
		}
		schedule.mInsertAffair = new InsertAffair(schedule);
	}

        execute(schedule)
        {
		if (schedule.mStateLogs || schedule.mStateExecuteLogs)
		{
			console.log("INSERT_AFFAIR_SCREEN_SCHEDULE: EXECUTE");        
		}
	}

        exit(schedule)
        {
		if (schedule.mStateLogs || schedule.mStateExitLogs)
		{
			console.log("INSERT_AFFAIR_SCREEN_SCHEDULE: EXIT");        
		}
	}
}
