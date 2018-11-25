
'use strict';

class GLOBAL_DAILY_SCHEDULE extends State
{
	constructor() 
	{
		super();
	}

        enter(daily_schedule)
        {
                if (daily_schedule.mStateLogs || daily_schedule.mStateEnterLogs)
                {
                        console.log("GLOBAL_DAILY_SCHEDULE: ENTER"); 
                }
	}

        execute(daily_schedule)
        {
                if (daily_schedule.mStateLogs || daily_schedule.mStateExecuteLogs)
                {
                        console.log("GLOBAL_DAILY_SCHEDULE: EXECUTE"); 
                }
	}

        exit(daily_schedule)
        {
                if (daily_schedule.mStateLogs || daily_schedule.mStateExitLogs)
                {
                        console.log("GLOBAL_DAILY_SCHEDULE: EXIT"); 
                }
	}
}
