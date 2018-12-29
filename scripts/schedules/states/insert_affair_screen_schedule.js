
'use strict';

class INSERT_AFFAIR_SCREEN_SCHEDULE extends State
{
	constructor() 
	{
		super();
	}
        
	enter(schedule)
        {
		if (schedule.mStateLogs || schedule.mStateEnterLogs)
		{
			console.log("INSERT_AFFAIR_SCREEN_SCHEDULE: ENTER");        
		}
		schedule.mInsertAffair = new InsertAffair(schedule);
		var url = "/php/classes/query/pitch_query.php?username=" + APPLICATION.mLogin.mUsername;

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
                                                for (var i = 0; i < data.length; i++)
                                                {
							var option = document.createElement("option");
							option.value = data[i][0];
							option.text = data[i][1];
							APPLICATION.mSchedule.mInsertAffair.mScreen.mPitch.appendChild(option);
                                                }
                                        }
                                        else
                                        {
                                                console.log('no pitch data');
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
			console.log("INSERT_AFFAIR_SCREEN_SCHEDULE: EXECUTE");        
		}
	}

        exit(schedule)
        {
		if (schedule.mStateLogs || schedule.mStateExitLogs)
		{
			console.log("INSERT_AFFAIR_SCREEN_SCHEDULE: EXIT");        
		}
	}
}
