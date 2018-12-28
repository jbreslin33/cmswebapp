
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

                schedule.mAffair = localStorage.mAffair;
		if (schedule.mAffair)
		{
			//local storage
			var data = JSON.parse(schedule.mAffair);
			schedule.mAffair.mAffairScreen.update();

			schedule.mDivAffairDate.textContent = data.mAffairDate;
			schedule.mDivStartTime.textContent = data.mStartTime;
			schedule.mDivAddress.textContent = data.mAddress;
		}
		else
		{
                	var fakeAffair = new SelectAffair(schedule);
                        fakeAffair.mScreen = new SelectAffairScreen(fakeAffair);

                        //update screen card
                        fakeAffair.mScreen.update();

                        //save for later
                        schedule.saveToLocalStorage(fakeAffair);

                        //push to array
                       	schedule.mSelectAffairArray.push(fakeAffair);
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
