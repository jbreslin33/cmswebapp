
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
			conole.log("INIT_APPLICATION_STATE: ENTER");        
		}
	}

        execute(application)
        {
		if (application.mStateLogs)
		{
			conole.log("INIT_APPLICATION_STATE: EXECUTE");        
		}
	}

        exit(application)
        {
		if (application.mStateLogs)
		{
			conole.log("INIT_APPLICATION_STATE: EXIT");        
		}
	}
}
