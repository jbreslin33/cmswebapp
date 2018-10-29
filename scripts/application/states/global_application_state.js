
'use strict';

class GLOBAL_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(application)
        {
                if (application.mStateLogs)
                {
                        console.log("GLOBAL_APPLICATION_STATE: ENTER"); 
                }
	}

        execute(application)
        {
                if (application.mStateLogs)
                {
                        console.log("GLOBAL_APPLICATION_STATE: EXECUTE"); 
                }
	}

        exit(application)
        {
                if (application.mStateLogs)
                {
                        console.log("GLOBAL_APPLICATION_STATE: EXIT"); 
                }
	}
}
