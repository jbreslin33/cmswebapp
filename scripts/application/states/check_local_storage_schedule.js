
'use strict';

class CHECK_LOCAL_STORAGE_SCHEDULE extends State
{
	constructor() 
	{
		super();
	}

        enter(app)
        {
		if (app.mStateLogs || app.mStateEnterLogs)
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
		app.mStateMachine.changeState(app.mGET_INTERNET_DATA_SCHEDULE);
		//schedule.mStateMachine.changeState(schedule.mDISPLAY_SCHEDULE);
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("CHECK_LOCAL_STORAGE_SCHEDULE: EXECUTE");        
		}
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("CHECK_LOCAL_STORAGE_SCHEDULE: EXIT");        
		}
	}
}
