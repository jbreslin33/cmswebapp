
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
		var url = "/php/querys/get_schedule.php";

                // Fetch the latest data.
                daily_schedule.mRequest= new XMLHttpRequest();
                daily_schedule.mRequest.onreadystatechange = function()
                {
                        if (daily_schedule.mRequest.readyState === XMLHttpRequest.DONE)
                        {
                                if (daily_schedule.mRequest.status === 200)
                                {
                                        var data = JSON.parse(this.responseText);
                                        if (data)
                                        {
                                                daily_schedule.mPractice = new Practice();
                                                APPLICATION.mDailySchedule.mPractice.mEventDate = data[0][0];
                                                APPLICATION.mDailySchedule.mPractice.mStartTime = data[0][1];
                                                APPLICATION.mDailySchedule.mPractice.mAddress = data [0][2];
                                                APPLICATION.mDailySchedule.updateCard(APPLICATION.mDailySchedule.mPractice);
                                        }
                                        else
                                        {
                                                console.log('no schedule');
                                        }
                                }
                        }
                };
                daily_schedule.mRequest.open('GET', url);
                daily_schedule.mRequest.send();
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
