
'use strict';

class LOGIN_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(application)
        {
		if (application.mStateLogs)
		{
			console.log("LOGIN_APPLICATION_STATE: ENTER");        
		}
		application.mLogin = new Login(application);	
	}

        execute(application)
        {
		if (application.mStateLogs)
		{
			console.log("LOGIN_APPLICATION_STATE: EXECUTE");        
		}
	}

        exit(application)
        {
		if (application.mStateLogs)
		{
			console.log("LOGIN_APPLICATION_STATE: EXIT");        
		}
	}
}
