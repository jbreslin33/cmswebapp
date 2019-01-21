
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
/*

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
		else //put up fake data
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

		//either way go for fresh data from getInternetData state
*/
		schedule.mStateMachine.changeState(schedule.mGET_INTERNET_DATA_SCHEDULE);
		//schedule.mStateMachine.changeState(schedule.mDISPLAY_SCHEDULE);
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
