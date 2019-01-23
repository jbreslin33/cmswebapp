
'use strict';

class SHOW_SCHEDULE_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(app)
        {
		if (app.mStateLogs || app.mStateEnterLogs)
		{
			console.log("SHOW_SCHEDULE_APPLICATION: ENTER");        
		}
		//login
		//app.mLogin = new Login(app);
		//app.mStateMachine.changeState(app.mCHECK_LOCALSTORAGE);
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("SHOW_SCHEDULE_APPLICATION: EXECUTE");        
		}
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("SHOW_SCHEDULE_APPLICATION: EXIT");        
		}
	}
}
