
'use strict';

class GLOBAL_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(app)
        {
                if (app.mStateLogs || app.mStateEnterLogs)
                {
                        console.log("GLOBAL_APPLICATION: ENTER"); 
                }
	}

        execute(app)
        {
                if (app.mStateLogs || app.mStateExecuteLogs)
                {
                        console.log("GLOBAL_APPLICATION: EXECUTE"); 
                }

                if (location.hash == '#add-event' && app.mStateMachine.mCurrentState != app.mINSERT_EVENTO_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mINSERT_EVENTO_APPLICATION);
                }
		else if (location.hash == '#schedule' && app.mStateMachine.mCurrentState != app.mSHOW_DAILY_SCHEDULE_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mSHOW_DAILY_SCHEDULE_APPLICATION);
                }
		if (location.hash == '#schedule')
		{
			console.log("sch d");
		}
	}

        exit(application)
        {
                if (application.mStateLogs || application.mStateExitLogs)
		{
                        console.log("GLOBAL_APPLICATION: EXIT"); 
                }
	}
}
