
'use strict';

class GET_INTERNET_DATA_SCHEDULE extends State
{
	constructor() 
	{
		super();
	}
        
	enter(app)
        {
		if (app.mStateLogs || app.mStateEnterLogs)
		{
			console.log("GET_INTERNET_DATA_SCHEDULE: ENTER");        
		}
		//delete previous data

		for (var i=0; i < app.mSchedule.mSelectAffairArray.length; i++)
		{
			app.mSchedule.mSelectAffairArray[i].destructor();
			app.mSchedule.mSelectAffairArray[i] = null;
			delete app.mSchedule.mSelectAffairArray[i];
		}
		//get new data from internets
		app.mSchedule.getSchedule();
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("GET_INTERNET_DATA_SCHEDULE: EXECUTE");        
		}
		//do we have something to display???
		if (app.mSchedule.mSelectAffairArray.length > 0)
		{
 			app.mStateMachine.changeState(app.mDISPLAY_SCHEDULE);
		}
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("GET_INTERNET_DATA_SCHEDULE: EXIT");        
		}
	}
}
