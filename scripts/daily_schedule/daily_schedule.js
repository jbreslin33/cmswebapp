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
		this.mSelectEventoArray = new Array();
	
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

        saveToLocalStorage(evento)
        {
                //var data = JSON.stringify(evento);
                //localStorage.mEvento = data;
        }
	
	getSchedule()
        {
                var url = "/php/classes/query/schedule_query.php?username=" + APPLICATION.mLogin.mUsername;

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
                                                for (var d = 0; d < APPLICATION.mDailySchedule.mSelectEventoArray.length; d++)
                                                {
                                                        var evento = APPLICATION.mDailySchedule.mSelectEventoArray.shift();
                                                }

                                                var i = 0;
                                                while (jsondata[i])
                                                {
                                                        var evento = new SelectEvento(APPLICATION.mDailySchedule);
                                                        for (var b = 0; b < 14; b++)
                                                        {
                                                                evento.mData.push(jsondata[i][b]);
                                                        }

                                                        //save for later
                                                        APPLICATION.mDailySchedule.saveToLocalStorage(evento);

                                                        //push to array
                                                        APPLICATION.mDailySchedule.mSelectEventoArray.push(evento);
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
                request.open('GET', url);
                request.send();
        }

	displaySchedule()
	{
                for (var i = 0; i < APPLICATION.mDailySchedule.mSelectEventoArray.length; i++)
		{
                        //create screen to display data

			var evento = APPLICATION.mDailySchedule.mSelectEventoArray[i];	
			var screen = new SelectEventoScreen(evento);	

			APPLICATION.mDailySchedule.mSelectEventoArray[i].mScreen = screen;

			screen.update();
		}
	}
}
