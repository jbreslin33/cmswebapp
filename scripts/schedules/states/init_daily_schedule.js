
'use strict';

class INIT_DAILY_SCHEDULE extends State
{
	constructor() 
	{
		super();
	}

        enter(login)
        {
		if (login.mStateLogs || login.mStateEnterLogs)
		{
			console.log("INIT_DAILY_SCHEDULE: ENTER");        
		}
	}

        execute(login)
        {
		if (login.mStateLogs || login.mStateExecuteLogs)
		{
			console.log("INIT_DAILY_SCHEDULE: EXECUTE");        
		}
		//login.mStateMachine.changeState(login.mCHECK_LOCALSTORAGE_DAILY_SCHEDULE);
	}

        exit(login)
        {
		if (login.mStateLogs || login.mStateExitLogs)
		{
			console.log("INIT_DAILY_SCHEDULE: EXIT");        
		}
	}
}
