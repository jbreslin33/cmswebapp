
'use strict';

class GET_INTERNET_DATA_SCHEDULE extends State
{
	constructor() 
	{
		super();
	}

        enter(schedule)
        {
		if (schedule.mStateLogs || schedule.mStateEnterLogs)
		{
			console.log("GET_INTERNET_DATA_SCHEDULE: ENTER");        
		}
		console.log("GET DATA FROM INTERNET");
		var url = "/php/querys/get_schedule.php";

                // Fetch the latest data.
                schedule.mRequest= new XMLHttpRequest();
                schedule.mRequest.onreadystatechange = function()
                {
                        if (schedule.mRequest.readyState === XMLHttpRequest.DONE)
                        {
                                if (schedule.mRequest.status === 200)
                                {
                                        var data = JSON.parse(this.responseText);
                                        if (data)
                                        {
						console.log('size:' + data.length);
						var i = 0;
						while (data[i])
						{
							console.log('data[' + i + '] ='   + data[i][0]);
                                                	
							var practice = new Practice(APPLICATION);

                                                	practice.mEventDate = data[i][0];
                                                	practice.mStartTime = data[i][1];
                                                	practice.mAddress   = data[i][2];
                                                	APPLICATION.mSchedule.updateCard(APPLICATION.mSchedule.mPractice);
							APPLICATION.mSchedule.saveToLocalStorage(schedule.mPractice);

							APPLICATION.mPracticeArray.push(practice);
							i++;
						}
                                        }
                                        else
                                        {
                                                console.log('no schedule');
                                        }
                                }
                        }
                };
                schedule.mRequest.open('GET', url);
                schedule.mRequest.send();
	}

        execute(schedule)
        {
		if (schedule.mStateLogs || schedule.mStateExecuteLogs)
		{
			console.log("GET_INTERNET_DATA_SCHEDULE: EXECUTE");        
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
