
'use strict';

class INIT_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(application)
        {
		if (application.mStateLogs)
		{
			console.log("INIT_APPLICATION_STATE: ENTER");        
		}
	}

        execute(application)
        {
		if (application.mStateLogs)
		{
			console.log("INIT_APPLICATION_STATE: EXECUTE");        
		}
		application.mStateMachine.changeState(application.mLOGIN_APPLICATION);
	}

        exit(application)
        {
		if (application.mStateLogs)
		{
			console.log("INIT_APPLICATION_STATE: EXIT");        
		}
	}
}
