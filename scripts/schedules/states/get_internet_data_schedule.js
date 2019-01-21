
'use strict';

class GET_INTERNET_DATA_SCHEDULE extends State
{
	constructor() 
	{
		console.log("con get");
		super();
	}
        
	enter(schedule)
        {
		if (schedule.mStateLogs || schedule.mStateEnterLogs)
		{
			console.log("GET_INTERNET_DATA_SCHEDULE: ENTER");        
		}
		//delete previous data

		for (var i=0; i < schedule.mSelectAffairArray.length; i++)
		{
			schedule.mSelectAffairArray[i].destructor();
			schedule.mSelectAffairArray[i] = null;
			delete schedule.mSelectAffairArray[i];
			console.log('delete mSelectAffairArray:' + i);
		}
		//get new data from internets
		schedule.getSchedule();
	}

        execute(schedule)
        {
		if (schedule.mStateLogs || schedule.mStateExecuteLogs)
		{
			console.log("GET_INTERNET_DATA_SCHEDULE: EXECUTE");        
		}
		console.log("in exe length of array:" + schedule.mSelectAffairArray.length);
		//do we have something to display???
		if (schedule.mSelectAffairArray.length > 0)
		{
			console.log("in exe length of array should be bigger:" + schedule.mSelectAffairArray.length);
 			schedule.mStateMachine.changeState(schedule.mDISPLAY_SCHEDULE);
		}
	}

        exit(schedule)
        {
		if (schedule.mStateLogs || schedule.mStateExitLogs)
		{
			console.log("GET_INTERNET_DATA_SCHEDULE: EXIT");        
		}
	}
}
