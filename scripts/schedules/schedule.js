'use strict';

class Schedule 
{
	constructor(application)
	{
		this.mApplication = application;

               	//logs
                this.mStateLogs = false;
                this.mStateEnterLogs = true;
                this.mStateExecuteLogs = false;
                this.mStateExitLogs = false;

		//utilities
		this.mTime = new Time();
	
		//data
		this.mRequest = null;

		//data storage classes
		this.mInitialAffair = null;
		this.mSelectAffairArray = new Array();
		this.mInsertAffair = null;
	
		//day and month
		this.mDayArray = new Array();
		this.mDayArray.push('Sunday');
		this.mDayArray.push('Monday');
		this.mDayArray.push('Tuesday');
		this.mDayArray.push('Wednesday');
		this.mDayArray.push('Thursday');
		this.mDayArray.push('Friday');
		this.mDayArray.push('Saturday');
		
		this.mMonthArray = new Array();
		this.mMonthArray.push('January');
		this.mMonthArray.push('February');
		this.mMonthArray.push('March');
		this.mMonthArray.push('April');
		this.mMonthArray.push('May');
		this.mMonthArray.push('June');
		this.mMonthArray.push('July');
		this.mMonthArray.push('August');
		this.mMonthArray.push('September');
		this.mMonthArray.push('October');
		this.mMonthArray.push('November');
		this.mMonthArray.push('December');

		//states
                this.mStateMachine = new StateMachine(this);

                this.mGLOBAL_SCHEDULE = new GLOBAL_SCHEDULE();
                this.mINIT_SCHEDULE = new INIT_SCHEDULE();
                this.mCHECK_LOCAL_STORAGE_SCHEDULE = new CHECK_LOCAL_STORAGE_SCHEDULE();
                this.mGET_INTERNET_DATA_SCHEDULE = new GET_INTERNET_DATA_SCHEDULE();
                this.mINSERT_AFFAIR_SCREEN_SCHEDULE = new INSERT_AFFAIR_SCREEN_SCHEDULE();

                this.mStateMachine.setGlobalState(this.mGLOBAL_SCHEDULE);
                this.mStateMachine.changeState(this.mINIT_SCHEDULE);

	}
	update(timestamp)
	{

	}

        saveToLocalStorage(affair)
        {
                //var data = JSON.stringify(affair);
                //localStorage.mAffair = data;
        }
        convertDate(data)
        {
                var date = new Date(data);
                var dayElement = date.getDay();
                var monthElement = date.getMonth();
                var dayOfMonth = date.getDate() + 1;

                return this.mDayArray[dayElement] + ' ' + this.mMonthArray[monthElement] + ' ' + dayOfMonth;
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
                                                //lets clear array....
                                                var i = 0;
                                                for (i = 0; i < APPLICATION.mSchedule.mSelectAffairArray.length; i++)
                                                {
                                                        var affair = APPLICATION.mSchedule.mSelectAffairArray.shift();
                                                        affair.mScreen.mDivCard.style.display = "none";
                                                }

                                                i = 0;
                                                while (jsondata[i])
                                                {
                                                        var affair = new SelectAffair(APPLICATION.mSchedule);
                                                        for (var b = 0; b < 10; b++)
                                                        {
                                                                affair.mData.push(jsondata[i][b]);
                                                        }

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
                request.open('GET', url);
                request.send();
        }
}
