
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
                        console.log("GLOBAL_APPLICATION: ENTER"); 
                }
	}

        execute(application)
        {
                if (application.mStateLogs)
                {
                        console.log("GLOBAL_APPLICATION: EXECUTE"); 
                }
	}

        exit(application)
        {
                if (application.mStateLogs)
                {
                        console.log("GLOBAL_APPLICATION: EXIT"); 
                }
	}
}
