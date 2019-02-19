'use strict';

class DailySchedule 
{
	constructor(application)
	{
		this.mApplication = application;

               	//logs
                this.mStateLogs = false;
                this.mStateEnterLogs = true;
                this.mStateExecuteLogs = false;
                this.mStateExitLogs = false;

		//data
		this.mRequest = null;

		//data storage classes
		this.mInitialEvento = null;
		this.mEventoArray = new Array();
		this.mEventoArrayLocalStorage = new Array();

		this.mScreenArray = new Array();
	
		//states
                this.mStateMachine = new StateMachine(this);

                this.mGLOBAL_DAILY_SCHEDULE               = new GLOBAL_DAILY_SCHEDULE();
                this.mINIT_DAILY_SCHEDULE                 = new INIT_DAILY_SCHEDULE();

                this.mCHECK_LOCAL_STORAGE_DAILY_SCHEDULE  = new CHECK_LOCAL_STORAGE_DAILY_SCHEDULE();
                this.mGET_INTERNET_DATA_DAILY_SCHEDULE    = new GET_INTERNET_DATA_DAILY_SCHEDULE();
                this.mDISPLAY_DAILY_SCHEDULE              = new DISPLAY_DAILY_SCHEDULE();

                this.mStateMachine.setGlobalState(this.mGLOBAL_DAILY_SCHEDULE);
                this.mStateMachine.changeState(this.mINIT_DAILY_SCHEDULE);

	}
	update(timestamp)
	{
 		this.mStateMachine.update();
	}

	getSchedule()
        {
                var url = "/php/classes/query/schedule_query.php?email=" + APPLICATION.mLogin.mEmail;

                // Fetch the latest data.
                var request = new XMLHttpRequest();
                request.onreadystatechange = function()
                {
                        if (request.readyState === XMLHttpRequest.DONE)
                        {
                                if (request.status === 200)
                                {
                                        var code = this.responseText.slice(0,4);
                                        var data = this.responseText.slice(4,this.responseText.length);
                                        var jsondata = JSON.parse(data);

                                        if (jsondata)
                                        {
                                                //lets clear array of select eventos....
                                                for (var d = 0; d < APPLICATION.mDailySchedule.mEventoArray.length; d++)
                                                {
                                                        var evento = APPLICATION.mDailySchedule.mEventoArray.shift();
                                                }

                                                for (var i = 0; i < jsondata.length; i++)
                                                {
                                                        var evento = new Evento();
							evento.mID             = jsondata[i][0]; 
							evento.mDate           = jsondata[i][1]; 
							evento.mArrivalTime    = jsondata[i][2]; 
							evento.mStartTime      = jsondata[i][3]; 
							evento.mEndTime        = jsondata[i][4]; 
							evento.mAddress        = jsondata[i][5]; 
							evento.mCoordinates    = jsondata[i][6]; 
							evento.mPitch          = jsondata[i][7]; 
							evento.mFieldName      = jsondata[i][8]; 
							evento.mTeam           = jsondata[i][9]; 
							evento.mEventoTypes    = jsondata[i][10]; 
								
							evento.mAvailabilityID = jsondata[i][11]; 
							evento.mClub           = jsondata[i][12]; 
                                                        
							//push to array
                                                        APPLICATION.mDailySchedule.mEventoArray.push(evento);
                                                }
                                        }
                                        else
                                        {
                                                console.log('no schedule');
                                        }
                                }
                        }
                };
                request.open('GET', url);
                request.send();
        }

	displaySchedule()
	{
                for (var i = 0; i < APPLICATION.mDailySchedule.mEventoArray.length; i++)
		{
                        //create screen to display data

			var evento = APPLICATION.mDailySchedule.mEventoArray[i];	
			var screen = new SelectEventoScreen(evento);	
			this.mScreenArray.push(screen);

			screen.update();
		}
	}
	hideSchedule()
	{
        	for (var i = 0; i < this.mScreenArray.length; i++)
		{
			this.mScreenArray[i].hide();
		}
	}
}
