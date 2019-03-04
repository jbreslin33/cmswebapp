
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
                document.getElementById("join_site_nav_id").className += " active";
		app.mJoinSiteScreen.show();
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("JOIN_SITE_SCREEN_APPLICATION: EXECUTE");        
		}
               
		if (app.mJoinSiteScreen.mJoined == true)
                {
			console.log("what");
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
		var element = document.getElementById("join_site_nav_id");
                element.className = element.className.replace(/\active\b/g, "");

		app.mJoinSiteScreen.hide();
	}
}
