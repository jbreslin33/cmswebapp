
'use strict';

class INIT_SCHEDULE extends State
{
	constructor() 
	{
		super();
	}

        enter(schedule)
        {
		if (schedule.mStateLogs || schedule.mStateEnterLogs)
		{
			console.log("INIT_SCHEDULE: ENTER");        
		}
		//schedule.mStateMachine.changeState(schedule.mCHECK_LOCAL_STORAGE_SCHEDULE);
	}

        execute(schedule)
        {
		if (schedule.mStateLogs || schedule.mStateExecuteLogs)
		{
			console.log("INIT_SCHEDULE: EXECUTE");        
		}
	}

        exit(schedule)
        {
		if (schedule.mStateLogs || schedule.mStateExitLogs)
		{
			console.log("INIT_SCHEDULE: EXIT");        
		}
	}
}
