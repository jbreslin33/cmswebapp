
'use strict';

class CHECK_LOCAL_STORAGE_DAILY_SCHEDULE extends State
{
	constructor() 
	{
		super();
	}

        enter(app)
        {
		if (app.mStateLogs || app.mStateEnterLogs)
		{
			console.log("CHECK_LOCAL_STORAGE_DAILY_SCHEDULE: ENTER");        
		}

		//basically we are either using initial or localstorage then regardless we are going to internet state
/*

                schedule.mEvento = localStorage.mEvento;
		if (schedule.mEvento)
		{
			//local storage
			var data = JSON.parse(schedule.mEvento);
			schedule.mEvento.mEventoScreen.update();

			schedule.mDivEventoDate.textContent = data.mEventoDate;
			schedule.mDivStartTime.textContent = data.mStartTime;
			schedule.mDivAddress.textContent = data.mAddress;
		}
		else //put up fake data
		{
                	var fakeEvento = new SelectEvento(schedule);
                        fakeEvento.mScreen = new SelectEventoScreen(fakeEvento);

                        //update screen card
                        fakeEvento.mScreen.update();

                        //save for later
                        schedule.saveToLocalStorage(fakeEvento);

                        //push to array
                       	schedule.mSelectEventoArray.push(fakeEvento);
		}

		//either way go for fresh data from getInternetData state
*/
		app.mStateMachine.changeState(app.mGET_INTERNET_DATA_DAILY_SCHEDULE);
		//schedule.mStateMachine.changeState(schedule.mDISPLAY_DAILY_SCHEDULE);
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("CHECK_LOCAL_STORAGE_DAILY_SCHEDULE: EXECUTE");        
		}
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("CHECK_LOCAL_STORAGE_DAILY_SCHEDULE: EXIT");        
		}
	}
}
