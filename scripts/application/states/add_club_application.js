
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
		if (app.mAddClub)
		{
			app.mAddClub = new AddClub(app);
		}
		else
		{
			app.mAddClub = new AddClub(app);
		}
		app.mAddClub.show();
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("ADD_CLUB_APPLICATION: EXECUTE");        
		}
               
		if (app.mAddClub.mCode == 100)
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
		app.mAddClub.hide();
		app.mAddClub.mCode == 0;
	}
}
