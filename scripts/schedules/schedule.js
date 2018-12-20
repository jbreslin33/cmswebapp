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
	
		//initial
		this.mInitialAffair = null;

		//data
		this.mRequest = null;

		//data storage classes
		this.mAffairArray = new Array();
		this.mGameArray = new Array();

		//states
                this.mStateMachine = new StateMachine(this);

                this.mGLOBAL_SCHEDULE = new GLOBAL_SCHEDULE();
                this.mINIT_SCHEDULE = new INIT_SCHEDULE();
                this.mCHECK_LOCAL_STORAGE_SCHEDULE = new CHECK_LOCAL_STORAGE_SCHEDULE();
                this.mGET_INTERNET_DATA_SCHEDULE = new GET_INTERNET_DATA_SCHEDULE();

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
	
	updateCard(affair)
	{
		if (APPLICATION)
		{
			APPLICATION.mSchedule.mDivCard.querySelector('.affairDate').textContent = affair.mAffairDate;
			APPLICATION.mSchedule.mDivCard.querySelector('.startTime').textContent = affair.mStartTime;
			APPLICATION.mSchedule.mDivCard.querySelector('.address').textContent = affair.mAddress;
		}
		else
		{
			console.log('NO APPLICATION');
		}
	}

}
