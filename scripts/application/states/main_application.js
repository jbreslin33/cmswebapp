
'use strict';

class MAIN_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(application)
        {
		if (application.mStateLogs || application.mStateEnterLogs)
		{
			console.log("MAIN_APPLICATION: ENTER");        
		}
		//login
		application.mLogin = new Login(application);
	}

        execute(application)
        {
		if (application.mStateLogs || application.mStateExecuteLogs)
		{
			console.log("MAIN_APPLICATION: EXECUTE");        
		}
	}

        exit(application)
        {
		if (application.mStateLogs || application.mStateExitLogs)
		{
			console.log("MAIN_APPLICATION: EXIT");        
		}
	}
}
