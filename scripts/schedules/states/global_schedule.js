
'use strict';

class GLOBAL_DAILY_SCHEDULE extends State
{
	constructor() 
	{
		super();
	}

        enter(login)
        {
                if (login.mStateLogs || login.mStateEnterLogs)
                {
                        console.log("GLOBAL_DAILY_SCHEDULE: ENTER"); 
                }
	}

        execute(login)
        {
                if (login.mStateLogs || login.mStateExecuteLogs)
                {
                        console.log("GLOBAL_DAILY_SCHEDULE: EXECUTE"); 
                }
	}

        exit(login)
        {
                if (login.mStateLogs || login.mStateExitLogs)
                {
                        console.log("GLOBAL_DAILY_SCHEDULE: EXIT"); 
                }
	}
}
