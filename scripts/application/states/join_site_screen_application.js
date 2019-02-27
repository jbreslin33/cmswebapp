
'use strict';

class JOIN_SITE_SCREEN_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(app)
        {
		if (app.mStateLogs || app.mStateEnterLogs)
		{
			console.log("JOIN_SITE_SCREEN_APPLICATION: ENTER");        
		}
		if (app.mJoinSiteScreen)
		{
			//also maybe some clean up as well, so just leaving this if statement here.
			app.mJoinSiteScreen = new JoinSiteScreen(app);

		}
		else
		{
			app.mJoinSiteScreen = new JoinSiteScreen(app);
		}
		app.mJoinSiteScreen.show();
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("JOIN_SITE_SCREEN_APPLICATION: EXECUTE");        
		}
               
		if (app.mLogin.mLoggedIn == true)
                {
                        app.mStateMachine.changeState(app.mMAIN_APPLICATION);
                }

	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("JOIN_SITE_SCREEN_APPLICATION: EXIT");        
		}
		//hide it for now maybe delete later
		app.mJoinSiteScreen.hide();
	}
}
