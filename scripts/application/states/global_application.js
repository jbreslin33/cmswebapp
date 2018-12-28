
'use strict';

class GLOBAL_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(application)
        {
                if (application.mStateLogs || application.mStateEnterLogs)
                {
                        console.log("GLOBAL_APPLICATION: ENTER"); 
                }
	}

        execute(application)
        {
                if (application.mStateLogs || application.mStateExecuteLogs)
                {
                        console.log("GLOBAL_APPLICATION: EXECUTE"); 
                }
	}

        exit(application)
        {
                if (application.mStateLogs || application.mStateExitLogs)
		{
                        console.log("GLOBAL_APPLICATION: EXIT"); 
                }
	}
}
