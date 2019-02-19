
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
		//document.getElementById("daily_schedule_nav_id").className.replace(" active", "");
		//document.getElementById("add_event_nav_id").className.replace(" active", "");
	}

        execute(app)
        {
                if (app.mStateLogs || app.mStateExecuteLogs)
                {
                        console.log("GLOBAL_APPLICATION: EXECUTE"); 
                }

                if (location.hash == '#add_event' && app.mStateMachine.mCurrentState != app.mINSERT_EVENTO_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mINSERT_EVENTO_APPLICATION);
                }
		else if (location.hash == '#daily_schedule' && app.mStateMachine.mCurrentState != app.mSHOW_DAILY_SCHEDULE_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mSHOW_DAILY_SCHEDULE_APPLICATION);
                }
		else if (location.hash == '#join_screen' && app.mStateMachine.mCurrentState != app.mJOIN_SCREEN_APPLICATION)
                {
			console.log('join screen cliked');
                        APPLICATION.mStateMachine.changeState(APPLICATION.mJOIN_SCREEN_APPLICATION);
                }
		else if (location.hash == '#add_club' && app.mStateMachine.mCurrentState != app.mADD_CLUB_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mADD_CLUB_APPLICATION);
                }
		else if (location.hash == '#main_screen' && app.mStateMachine.mCurrentState != app.mMAIN_APPLICATION)
                {
                        APPLICATION.mStateMachine.changeState(APPLICATION.mMAIN_APPLICATION);
                }

		//set all tabs to not active
		//document.getElementById("daily_schedule_nav_id").className.replace(" active", "");
		//document.getElementById("add_event_nav_id").className.replace(" active", "");

	}

        exit(application)
        {
                if (application.mStateLogs || application.mStateExitLogs)
		{
                        console.log("GLOBAL_APPLICATION: EXIT"); 
                }
	}
}
