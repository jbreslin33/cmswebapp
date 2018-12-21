
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
                var url = "/php/classes/query/schedule_query.php?username=" + APPLICATION.mLogin.mUsername;

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
						for (i = 0; i < APPLICATION.mSchedule.mAffairArray.length; i++)
						{
							var affair = APPLICATION.mSchedule.mAffairArray.shift();
							affair.mAffairScreen.mDivCard.style.display = "none";
						}
						
						i = 0;
						while (data[i])
						{
							var affair = new Affair(schedule);

							//set affair member vars
                                                	affair.mAffairType = data[i][0];
                                                	affair.mAffairDate = data[i][1];
							affair.mStartTime = data[i][2];
							affair.mArrivalTime = data[i][3];
                                                	affair.mAddress   = data[i][4];
						
							//create screen to display data
							affair.mAffairScreen = new AffairScreen(affair);

							//update screen card
                                                	affair.mAffairScreen.update();
				
							//save for later
							APPLICATION.mSchedule.saveToLocalStorage(schedule.mAffair);

							//push to array
							APPLICATION.mSchedule.mAffairArray.push(affair);
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
		console.log('url:' + url);
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
