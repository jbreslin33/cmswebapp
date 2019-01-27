
'use strict';

class CHECK_LOCAL_STORAGE_DAILY_SCHEDULE extends State
{
	constructor() 
	{
		super();
	}

        enter(dailySchedule)
        {
		if (dailySchedule.mStateLogs || dailySchedule.mStateEnterLogs)
		{
			console.log("CHECK_LOCAL_STORAGE_DAILY_SCHEDULE: ENTER");        
		}
		if (localStorage.mEventoArray)
		{
			dailySchedule.mEventoArrayLocalStorage = localStorage.mEventoArray;
			console.log('data:' + dailySchedule.mEventoArrayLocalStorage);
			console.log('d10:' + dailySchedule.mEventoArrayLocalStorage[0]);
			console.log('d10:' + dailySchedule.mEventoArrayLocalStorage[0][0][0]);
			console.log('d10:' + dailySchedule.mEventoArrayLocalStorage[0][0][1]);
			console.log('d10:' + dailySchedule.mEventoArrayLocalStorage[0][0][2]);
			console.log('d10:' + dailySchedule.mEventoArrayLocalStorage[0][0][3]);
			console.log('d10:' + dailySchedule.mEventoArrayLocalStorage[0][0][4]);

			console.log('d10:' + dailySchedule.mEventoArrayLocalStorage[0][1]);
			console.log('d10:' + dailySchedule.mEventoArrayLocalStorage[0][2]);
			console.log('d10:' + dailySchedule.mEventoArrayLocalStorage[0][3]);
			console.log('d10:' + dailySchedule.mEventoArrayLocalStorage[0][4]);
			console.log('d10:' + dailySchedule.mEventoArrayLocalStorage[0][5]);
			
			console.log('a:' + dailySchedule.mEventoArrayLocalStorage[0].mEventosUsersAvailabilityID);
			console.log('b:' + dailySchedule.mEventoArrayLocalStorage[0].mData);
			
			
			dailySchedule.mEventoArrayLocalStorage = JSON.parse(localStorage.mEventoArray);
			console.log('mEventoArrayLocalStorage:' + dailySchedule.mEventoArrayLocalStorage);
			console.log('mEventoArrayLocalStorage:' + dailySchedule.mEventoArrayLocalStorage.mData);
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
                	var fakeEvento = new Evento(schedule);
                        fakeEvento.mScreen = new SelectEventoScreen(fakeEvento);

                        //update screen card
                        fakeEvento.mScreen.update();

                        //save for later
                        schedule.saveToLocalStorage(fakeEvento);

                        //push to array
                       	schedule.mEventoArray.push(fakeEvento);
		}

		//either way go for fresh data from getInternetData state
*/
		dailySchedule.mStateMachine.changeState(dailySchedule.mGET_INTERNET_DATA_DAILY_SCHEDULE);
		//schedule.mStateMachine.changeState(schedule.mDISPLAY_DAILY_SCHEDULE);
	}

        execute(dailySchedule)
        {
		if (dailySchedule.mStateLogs || dailySchedule.mStateExecuteLogs)
		{
			console.log("CHECK_LOCAL_STORAGE_DAILY_SCHEDULE: EXECUTE");        
		}
	}

        exit(dailySchedule)
        {
		if (dailySchedule.mStateLogs || dailySchedule.mStateExitLogs)
		{
			console.log("CHECK_LOCAL_STORAGE_DAILY_SCHEDULE: EXIT");        
		}
	}
}
