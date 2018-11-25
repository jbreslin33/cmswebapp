
'use strict';

class INIT_DAILY_SCHEDULE extends State
{
	constructor() 
	{
		super();
	}

        enter(daily_schedule)
        {
		if (daily_schedule.mStateLogs || daily_schedule.mStateEnterLogs)
		{
			console.log("INIT_DAILY_SCHEDULE: ENTER");        
		}
		daily_schedule.mStateMachine.changeState(daily_schedule.mCHECK_LOCAL_STORAGE_DAILY_SCHEDULE);
	}

        execute(daily_schedule)
        {
		if (daily_schedule.mStateLogs || daily_schedule.mStateExecuteLogs)
		{
			console.log("INIT_DAILY_SCHEDULE: EXECUTE");        
		}
	}

        exit(daily_schedule)
        {
		if (daily_schedule.mStateLogs || daily_schedule.mStateExitLogs)
		{
			console.log("INIT_DAILY_SCHEDULE: EXIT");        
		}
	}
}
