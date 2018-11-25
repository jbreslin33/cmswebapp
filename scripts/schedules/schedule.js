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

	updateData()
	{
		/**********************************/
        	//SCHEDULE
        	this.mPractice = localStorage.mPractice;
        	if (this.mPractice)
		{
                	this.mPractice = JSON.parse(this.mPractice);

			//but lets get some new stuff from intertubes
			this.getData();	
		}
		//first run ever
		else
		{
			this.updateCard(this.mInitialPractice);
                	this.saveToLocalStorage(this.mInitialPractice);
		}
	}

        saveToLocalStorage(practice)
        {
                var data = JSON.stringify(practice);
                localStorage.mPractice = data;
        }
	
	getCache()
        {
                var url = "/php/querys/get_schedule.php";

                // TODO add cache logic here
                if ('caches' in window)
                {
                        /*
                        * Check if the service worker has already cached this city's weather
                        * data. If the service worker has the data, then display the cached
                        * data while the app fetches the latest data.
                        */
                        caches.match(url).then(function(response)
                        {
                                if (response)
                                {
                                        response.json().then(function updateFromCache(json)
                                        {
                                                var results = json.query.results;
                                                results.key = key;
                                                results.label = label;
                                                results.created = json.query.created;
                                                this.updateScheduleCard(results);
                                        });
                                }
                        });
                }
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
class Practice
{
        constructor()
        {
                this.mEventDate = 'JAN 01 2000';
                this.mStartTime = '12AM';
                this.mAddress   = 'NOWHERE';
        }
}
