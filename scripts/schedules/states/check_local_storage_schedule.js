
'use strict';

class CHECK_LOCAL_STORAGE_SCHEDULE extends State
{
	constructor() 
	{
		super();
	}

        enter(schedule)
        {
		if (schedule.mStateLogs || schedule.mStateEnterLogs)
		{
			console.log("CHECK_LOCAL_STORAGE_SCHEDULE: ENTER");        
		}

		//basically we are either using initial or localstorage then regardless we are going to internet state

                schedule.mPractice = localStorage.mPractice;
		if (schedule.mPractice)
		{
			//local storage
			var data = JSON.parse(schedule.mPractice);
			schedule.mPractice.mPracticeScreen.update();

			schedule.mDivEventDate.textContent = data.mEventDate;
			schedule.mDivStartTime.textContent = data.mStartTime;
			schedule.mDivAddress.textContent = data.mAddress;
		}
		else
		{
                	var fakePractice = new Practice(schedule);
                        fakePractice.mPracticeScreen = new PracticeScreen(fakePractice);

                        //update screen card
                        fakePractice.mPracticeScreen.update();

                        //save for later
                        schedule.saveToLocalStorage(fakePractice);

                        //push to array
                       	schedule.mPracticeArray.push(fakePractice);
		}

		//go to getInternetData state
		schedule.mStateMachine.changeState(schedule.mGET_INTERNET_DATA_SCHEDULE);
	}

        execute(schedule)
        {
		if (schedule.mStateLogs || schedule.mStateExecuteLogs)
		{
			console.log("CHECK_LOCAL_STORAGE_SCHEDULE: EXECUTE");        
		}
	}

        exit(schedule)
        {
		if (schedule.mStateLogs || schedule.mStateExitLogs)
		{
			console.log("CHECK_LOCAL_STORAGE_SCHEDULE: EXIT");        
		}
	}
}
