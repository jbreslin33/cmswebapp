
'use strict';

class LOGIN_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(app)
        {
		if (app.mStateLogs || app.mStateEnterLogs)
		{
			console.log("LOGIN_APPLICATION: ENTER");        
		}
		//login
		//app.mLogin = new Login(app);
		//app.mStateMachine.changeState(app.mCHECK_LOCALSTORAGE);
		//
		if (app.mLogin)
		{
			//do nothing right now	
		}
		else
		{
			//start the login subsystem
			app.mLogin = new Login(app);
		}
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("LOGIN_APPLICATION: EXECUTE");        
		}
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("LOGIN_APPLICATION: EXIT");        
		}
	}
}
