
'use strict';

class ADD_CLUB_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(app)
        {
		if (app.mStateLogs || app.mStateEnterLogs)
		{
			console.log("ADD_CLUB_APPLICATION: ENTER");        
		}
		if (app.mAddClubScreen)
		{
			app.mAddClubScreen = new AddClubScreen(app);
		}
		else
		{
			app.mAddClubScreen = new AddClubScreen(app);
		}
		app.mAddClubScreen.show();
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("ADD_CLUB_APPLICATION: EXECUTE");        
		}
               
		if (app.mAddClubScreen.mCode == 100)
                {
                        app.mStateMachine.changeState(app.mMAIN_APPLICATION);
                }
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("ADD_CLUB_APPLICATION: EXIT");        
		}
		app.mAddClubScreen.hide();
		app.mAddClubScreen.mCode = 0;
	}
}
