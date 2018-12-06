
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
                var url = "/php/classes/query/query.php?username=" + APPLICATION.mLogin.mUsername;

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
						//lets clear array....
						var i = 0;
						for (i = 0; i < APPLICATION.mSchedule.mPracticeArray.length; i++)
						{
							var practice = APPLICATION.mSchedule.mPracticeArray.shift();
							practice.mPracticeScreen.mDivCard.style.display = "none";
						}
						
						i = 0;
						while (data[i])
						{
							var practice = new Practice(schedule);
							practice.mPracticeScreen = new PracticeScreen(practice);

							//set practice member vars

                                                	practice.mEventDate = data[i][0];
							practice.mStartTime = "Start Time: " + schedule.mTime.convertFromMilitaryToHuman(data[i][1]);
                                                	practice.mAddress   = data[i][2];

							//update screen card
                                                	practice.mPracticeScreen.update();
				
							//save for later
							APPLICATION.mSchedule.saveToLocalStorage(schedule.mPractice);

							//push to array
							APPLICATION.mSchedule.mPracticeArray.push(practice);
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
