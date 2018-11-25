'use strict';

class Schedule extends Report
{
	constructor(application)
	{
		super(application);

               	//logs
                this.mStateLogs = false;
                this.mStateEnterLogs = true;
                this.mStateExecuteLogs = false;
                this.mStateExitLogs = false;
                this.mLoggedIn = false;
		
		console.log('create mInitialPractice');
		this.mInitialPractice = new Practice();

		//data
		this.mPractice = null;

		this.mDivEventDate = document.createElement("DIV");
                this.mDivEventDate.setAttribute("class", "eventDate");
                this.mDivCard.appendChild(this.mDivEventDate);

		this.mDivStartTime = document.createElement("DIV");
                this.mDivStartTime.setAttribute("class", "startTime");
                this.mDivCard.appendChild(this.mDivStartTime);
		
		this.mDivAddress = document.createElement("DIV");
                this.mDivAddress.setAttribute("class", "address");
                this.mDivCard.appendChild(this.mDivAddress);

		this.mRequest = null;

                //report vars
                this.mIsLoading = true;
                this.mSpinner = document.querySelector('.loader');
		
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
                var data = JSON.stringify(practice);
                localStorage.mPractice = data;
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
