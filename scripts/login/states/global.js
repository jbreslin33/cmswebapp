
'use strict';

class GLOBAL extends State
{
	constructor() 
	{
		super();
	}

        enter(login)
        {
                if (login.mStateLogs || login.mStateEnterLogs)
                {
                        console.log("GLOBAL_STATE: ENTER"); 
                }
	}

        execute(login)
        {
                if (login.mStateLogs || login.mStateExecuteLogs)
                {
                        console.log("GLOBAL_STATE: EXECUTE"); 
                }
	}

        exit(login)
        {
                if (login.mStateLogs || login.mStateExitLogs)
                {
                        console.log("GLOBAL_STATE: EXIT"); 
                }
	}
}
