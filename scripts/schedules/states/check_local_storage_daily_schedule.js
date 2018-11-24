
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
		//daily_schedule.updateData();
                daily_schedule.mPractice = localStorage.mPractice;
		if (daily_schedule.mPractice)
		{
			console.log("practice");
		}
		else
		{
			console.log("no practice");
			//daily_schedule.updateCard(daily_schedule.mInitialPractice);
	                if (APPLICATION)
                	{
				if (daily_schedule)
				{
					console.log('daily_schedule exists');
				}
				if (daily_schedule.mDivCard)
				{
					console.log('div card exists');
				}
				daily_schedule.mDivEventDate.textContent = "DFDDDD";
                        	//daily_schedule.mDivCard.querySelector('.eventDate').textContent = daily_schedule.mInitialPractice.mEventDate;
                        	//APPLICATION.mDailySchedule.mDivCard.querySelector('.startTime').textContent = practice.mStartTime;
                        	//APPLICATION.mDailySchedule.mDivCard.querySelector('.address').textContent = practice.mAddress;
                	}
                	else
                	{
                        	console.log('NO APPLICATION');
                	}
		}
/*
                if (this.mPractice)
                {
                        this.mPractice = JSON.parse(this.mPractice);

                        //but lets get some new stuff from intertubes
                        this.getData();
                }
                //first run ever
                else
                {
                        this.updateCard(this.mInitialPractice);
                        this.saveToLocalStorage(this.mInitialPractice);
                }
		*/

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
