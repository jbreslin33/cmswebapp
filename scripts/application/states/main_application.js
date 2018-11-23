
'use strict';

class MAIN_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(application)
        {
		if (application.mStateLogs)
		{
			console.log("MAIN_APPLICATION: ENTER");        
		}
	}

        execute(application)
        {
		if (application.mStateLogs)
		{
			console.log("MAIN_APPLICATION: EXECUTE");        
		}
	}

        exit(application)
        {
		if (application.mStateLogs)
		{
			console.log("MAIN_APPLICATION: EXIT");        
		}
	}
}
