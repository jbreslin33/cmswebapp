'use strict';

class Schedule 
{
	constructor(application)
	{
		if (application)
		{
			console.log("app exists");
		}
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
		this.mInitialPractice = null;

		//data
		this.mRequest = null;

		//data storage classes
		this.mPracticeArray = new Array();
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

        saveToLocalStorage(practice)
        {
                //var data = JSON.stringify(practice);
                //localStorage.mPractice = data;
        }
	
	updateCard(practice)
	{
		if (APPLICATION)
		{
			APPLICATION.mSchedule.mDivCard.querySelector('.eventDate').textContent = practice.mEventDate;
			APPLICATION.mSchedule.mDivCard.querySelector('.startTime').textContent = practice.mStartTime;
			APPLICATION.mSchedule.mDivCard.querySelector('.address').textContent = practice.mAddress;
		}
		else
		{
			console.log('NO APPLICATION');
		}
	}

}
