
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
                if (location.hash == '#add-event' && app.mStateMachine.mCurrentState != app.mINSERT_SCHEDULE_APPLICATION)
                {
                        console.log("change state to insert affair");
                        APPLICATION.mStateMachine.changeState(APPLICATION.mINSERT_SCHEDULE_APPLICATION);
                }
	/*	
		if (location.hash === '#login-screen')
                if (location.hash == '#login-screen' && app.mStateMachine.mCurrentState != app.mLOGIN_SCREENINSERT_AFFAIR_SCREEN_SCHEDULE)
                {
                        console.log("change state to login");
                        //APPLICATION.mLogin.mStateMachine.changeState(APPLICATION.mLogin.INIT_LOGIN);
                }
                if (location.hash == '#add-event' && app.mStateMachine.mCurrentState != app.mINSERT_AFFAIR_SCREEN_SCHEDULE)
                {
                        console.log("change state to insert affair");
                        APPLICATION.mSchedule.mStateMachine.changeState(APPLICATION.mSchedule.mINSERT_AFFAIR_SCREEN_SCHEDULE);
                }
                if (location.hash === '#schedule')
                {
                        console.log("change state to schedule");
                        APPLICATION.mSchedule.mStateMachine.changeState(APPLICATION.mSchedule.mINIT_SCHEDULE);
                }
*/
	}

        exit(application)
        {
                if (application.mStateLogs || application.mStateExitLogs)
		{
                        console.log("GLOBAL_APPLICATION: EXIT"); 
                }
	}
}
