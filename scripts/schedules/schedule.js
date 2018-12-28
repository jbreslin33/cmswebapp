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
                this.mLoggedIn = false;

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
}
