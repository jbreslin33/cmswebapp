
'use strict';

class CHECK_LOCAL_STORAGE_DAILY_SCHEDULE extends State
{
	constructor() 
	{
		super();
	}

        enter(daily_schedule)
        {
		if (daily_schedule.mStateLogs || daily_schedule.mStateEnterLogs)
		{
			console.log("CHECK_LOCAL_STORAGE_DAILY_SCHEDULE: ENTER");        
		}
                daily_schedule.mPractice = localStorage.mPractice;
		if (daily_schedule.mPractice)
		{
			//we have some local stored data go to that state
		}
		else
		{
			//we have nothing. post up default
			daily_schedule.mDivEventDate.textContent = daily_schedule.mInitialPractice.mEventDate;
			daily_schedule.mDivStartTime.textContent = daily_schedule.mInitialPractice.mStartTime;
			daily_schedule.mDivAddress.textContent = daily_schedule.mInitialPractice.mAddress;
			daily_schedule.saveToLocalStorage(daily_schedule.mIntialPractice);
			//go to getInternetData state
			daily_schedule.mStateMachine.changeState(daily_schedule.mGET_INTERNET_DATA_DAILY_SCHEDULE);
		}
	}

        execute(daily_schedule)
        {
		if (daily_schedule.mStateLogs || daily_schedule.mStateExecuteLogs)
		{
			console.log("CHECK_LOCAL_STORAGE_DAILY_SCHEDULE: EXECUTE");        
		}
	}

        exit(daily_schedule)
        {
		if (daily_schedule.mStateLogs || daily_schedule.mStateExitLogs)
		{
			console.log("CHECK_LOCAL_STORAGE_DAILY_SCHEDULE: EXIT");        
		}
	}
}
