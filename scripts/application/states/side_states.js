
'use strict';

class GLOBAL_SIDE_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(app)
        {
                if (app.mSideStateLogs || app.mSideStateEnterLogs)
                {
                        console.log("GLOBAL_SIDE_APPLICATION: ENTER"); 
                }
	}

        execute(app)
        {

                if (app.mSideStateLogs || app.mSideStateExecuteLogs)
                {
                        console.log("GLOBAL_SIDE_APPLICATION: EXECUTE"); 
                }

		if (location.hash == '#side_screen' && app.mSideStateMachine.mCurrentState != app.mOPEN_SIDE_APPLICATION)
                {
                        APPLICATION.mSideStateMachine.changeState(APPLICATION.mOPEN_SIDE_APPLICATION);
                }

		else if (location.hash == '#closed_side_screen' && app.mSideStateMachine.mCurrentState != app.mCLOSED_SIDE_APPLICATION)
                {
                        APPLICATION.mSideStateMachine.changeState(APPLICATION.mCLOSED_SIDE_APPLICATION);
                }
	}

        exit(application)
        {
                if (application.mSideStateLogs || application.mSideStateExitLogs)
		{
                        console.log("GLOBAL_SIDE_APPLICATION: EXIT"); 
                }
	}
}

class INIT_SIDE_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(application)
        {
		if (application.mSideStateLogs || application.mSideStateEnterLogs)
		{
			console.log("INIT_SIDE APPLICATION_STATE: ENTER");        
		}

		if (application.getSideScreenHtml())
		{
			application.getSideScreenHtml().style.display = "none";
		}
	}
        
	execute(application)
        {
		if (application.mSideStateLogs || application.mSideStateExecuteLogs)
		{
			console.log("INIT_APPLICATION_STATE: EXECUTE");        
		}
	}

        exit(application)
        {
		if (application.mSideStateLogs || application.mSideStateExitLogs)
		{
			console.log("INIT_APPLICATION_STATE: EXIT");        
		}
	}
}

class OPEN_SIDE_APPLICATION extends State
{
        constructor()
        {
                super();
        }

        enter(app)
        {
                if (app.mSideStateLogs || app.mSideStateEnterLogs)
                {
                        console.log("OPEN SIDE_APPLICATION: ENTER");
                }

		app.setSideScreen(new SideScreen(app));
		app.getSideScreen().enter();

		document.getElementById("side_screen_html_id").style.width = "250px";
        }

        execute(app)
        {
                if (app.mSideStateLogs || app.mSideStateExecuteLogs)
                {
                        console.log("OPEN SIDE_APPLICATION: EXECUTE");
                }

                app.getSideScreen().execute();
        }

        exit(app)
        {
                if (app.mSideStateLogs || app.mSideStateExitLogs)
                {
                        console.log("OPEN SIDE_APPLICATION: EXIT");
                }
		document.getElementById("side_screen_html_id").style.width = "0px";

                app.getSideScreen().exit();
		document.getElementById("side_screen_html_id").style.width = "0px";
		app.setSideScreen(null);
        }
}

class CLOSED_SIDE_APPLICATION extends State
{
        constructor()
        {
                super();
        }

        enter(app)
        {
                if (app.mSideStateLogs || app.mSideStateEnterLogs)
                {
                        console.log("CLOSED SIDE_APPLICATION: ENTER");
                }

		//app.setSideScreen(new SideScreen(app));
		//app.getSideScreen().enter();

        }

        execute(app)
        {
                if (app.mSideStateLogs || app.mSideStateExecuteLogs)
                {
                        console.log("CLOSED SIDE_APPLICATION: EXECUTE");
                }

                //app.getSideScreen().execute();
        }

        exit(app)
        {
                if (app.mSideStateLogs || app.mSideStateExitLogs)
                {
                        console.log("CLOSED SIDE_APPLICATION: EXIT");
                }
		//document.getElementById("side_screen_html_id").style.width = "0px";

                //app.getSideScreen().exit();
        }
}



