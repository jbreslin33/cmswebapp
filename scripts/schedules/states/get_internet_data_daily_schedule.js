
'use strict';

class GET_INTERNET_DATA_DAILY_SCHEDULE extends State
{
	constructor() 
	{
		super();
	}

        enter(daily_schedule)
        {
		if (daily_schedule.mStateLogs || daily_schedule.mStateEnterLogs)
		{
			console.log("GET_INTERNET_DATA_DAILY_SCHEDULE: ENTER");        
		}
		console.log("GET DATA FROM INTERNET");
		daily_schedule.getData();
	}

        execute(daily_schedule)
        {
		if (daily_schedule.mStateLogs || daily_schedule.mStateExecuteLogs)
		{
			console.log("GET_INTERNET_DATA_DAILY_SCHEDULE: EXECUTE");        
		}
	}

        exit(daily_schedule)
        {
		if (daily_schedule.mStateLogs || daily_schedule.mStateExitLogs)
		{
			console.log("GET_INTERNET_DATA_DAILY_SCHEDULE: EXIT");        
		}
	}
}
