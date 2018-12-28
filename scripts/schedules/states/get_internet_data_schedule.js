
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
						for (i = 0; i < APPLICATION.mSchedule.mSelectAffairArray.length; i++)
						{
							var affair = APPLICATION.mSchedule.mSelectAffairArray.shift();
							affair.mScreen.mDivCard.style.display = "none";
						}
						
						i = 0;
						while (data[i])
						{
							var affair = new SelectAffair(schedule);
							for (var b = 0; b < 10; b++)
							{
								affair.mData.push(data[i][b]);
							}

							//set affair member vars
							/*
                                                	affair.mAffairDate  = data[i][0];
							affair.mArrivalTime = data[i][1];
							affair.mStartTime   = data[i][2];
							affair.mEndTime     = data[i][3];
                                                	affair.mAddress     = data[i][4];
                                                	affair.mCoordinates = data[i][5];
                                                	affair.mPitch       = data[i][6];
                                                	affair.mFieldName   = data[i][7];
                                                	affair.mTeam        = data[i][8];
                                                	affair.mAffairType  = data[i][9];
							*/
						
							//create screen to display data
							affair.mScreen = new SelectAffairScreen(affair);

							//update screen card
                                                	affair.mScreen.update();
				
							//save for later
							APPLICATION.mSchedule.saveToLocalStorage(affair);

							//push to array
							APPLICATION.mSchedule.mSelectAffairArray.push(affair);
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
		for (var i=0; i < schedule.mSelectAffairArray.length; i++)
		{
			schedule.mSelectAffairArray[i].destructor();
			schedule.mSelectAffairArray[i] = null;
			delete schedule.mSelectAffairArray[i];
		}
	}
}
