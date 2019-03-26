
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
                
		if (location.hash == '#login_screen' && app.mStateMachine.mCurrentState != app.mLOGIN_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mLOGIN_APPLICATION);
                }

                if (location.hash == '#add_event' && app.mStateMachine.mCurrentState != app.mINSERT_EVENTO_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mINSERT_EVENTO_APPLICATION);
                }
		else if (location.hash == '#daily_schedule' && app.mStateMachine.mCurrentState != app.mSHOW_DAILY_SCHEDULE_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mSHOW_DAILY_SCHEDULE_APPLICATION);
                }
		else if (location.hash == '#insert_native_login_screen' && app.mStateMachine.mCurrentState != app.mINSERT_NATIVE_LOGIN_SCREEN_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mINSERT_NATIVE_LOGIN_SCREEN_APPLICATION);
                }
		else if (location.hash == '#insert_club' && app.mStateMachine.mCurrentState != app.mINSERT_CLUB_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mINSERT_CLUB_APPLICATION);
                }
		else if (location.hash == '#insert_forgot_password' && app.mStateMachine.mCurrentState != app.mINSERT_FORGOT_PASSWORD_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mINSERT_FORGOT_PASSWORD_APPLICATION);
                }
		else if (location.hash == '#main_screen' && app.mStateMachine.mCurrentState != app.mMAIN_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mMAIN_APPLICATION);
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
