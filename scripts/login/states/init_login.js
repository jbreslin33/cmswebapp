
'use strict';

class INIT_LOGIN extends State
{
	constructor() 
	{
		super();
	}

        enter(application)
        {
		if (application.mStateLogs)
		{
			console.log("INIT_LOGIN: ENTER");        
		}
	}

        execute(application)
        {
		if (application.mStateLogs)
		{
			console.log("INIT_LOGIN: EXECUTE");        
		}
		application.mStateMachine.changeState(application.mLOGIN_APPLICATION);
	}

        exit(application)
        {
		if (application.mStateLogs)
		{
			console.log("INIT_LOGIN: EXIT");        
		}
	}
}
