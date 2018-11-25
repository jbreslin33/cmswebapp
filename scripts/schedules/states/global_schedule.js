
'use strict';

class GLOBAL_SCHEDULE extends State
{
	constructor() 
	{
		super();
	}

        enter(schedule)
        {
                if (schedule.mStateLogs || schedule.mStateEnterLogs)
                {
                        console.log("GLOBAL_SCHEDULE: ENTER"); 
                }
	}

        execute(schedule)
        {
                if (schedule.mStateLogs || schedule.mStateExecuteLogs)
                {
                        console.log("GLOBAL_SCHEDULE: EXECUTE"); 
                }
	}

        exit(schedule)
        {
                if (schedule.mStateLogs || schedule.mStateExitLogs)
                {
                        console.log("GLOBAL_SCHEDULE: EXIT"); 
                }
	}
}
