
'use strict';

class GET_INTERNET_DATA_DAILY_SCHEDULE extends State
{
	constructor() 
	{
		super();
	}
        
	enter(schedule)
        {
		if (schedule.mStateLogs || schedule.mStateEnterLogs)
		{
			console.log("GET_INTERNET_DATA_DAILY_SCHEDULE: ENTER");        
		}
		//delete previous data

		for (var i=0; i < schedule.mEventoArray.length; i++)
		{
			schedule.mEventoArray[i].destructor();
			schedule.mEventoArray[i] = null;
			delete schedule.mEventoArray[i];
		}
		//get new data from internets
		schedule.getSchedule();
	}

        execute(schedule)
        {
		if (schedule.mStateLogs || schedule.mStateExecuteLogs)
		{
			console.log("GET_INTERNET_DATA_DAILY_SCHEDULE: EXECUTE");        
		}
		//do we have something to display???
		if (schedule.mEventoArray.length > 0)
		{
 			schedule.mStateMachine.changeState(schedule.mDISPLAY_DAILY_SCHEDULE);
		}


               
	}

        exit(schedule)
        {
		if (schedule.mStateLogs || schedule.mStateExitLogs)
		{
			console.log("GET_INTERNET_DATA_DAILY_SCHEDULE: EXIT");        
		}
		//and lets save our findings to local storage
		localStorage.setItem('mEventoArrayLocal', JSON.stringify(schedule.mEventoArray));
/*
		var eventoArray = JSON.parse(localStorage.getItem('mEventoArrayLocal'));
		for(var i = 0; i < eventoArray.length; i++)
		{
			console.log('mID:' + eventoArray[i].mID);
			console.log('mDate:' + eventoArray[i].mDate);
			console.log('mTeam:' + eventoArray[i].mTeam);
		}
*/
	}
}
