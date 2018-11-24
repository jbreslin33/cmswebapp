
'use strict';

class CHECK_LOCALSTORAGE_LOGIN extends State
{
	constructor() 
	{
		super();
	}

        enter(login)
        {
		if (login.mStateLogs || login.mStateEnterLogs)
		{
			console.log("CHECK_LOCALSTORAGE_LOGIN: ENTER");        
		}
		var username = localStorage.getItem("username");
		var password = localStorage.getItem("password");
		if (username && password)
		{
			console.log("sendloginfrom localstorage");
			//processlogin
			login.sendLoginFromLocalStorage(username,password);
		}
		else
		{
			console.log("no username so create screen state");
			login.mStateMachine.changeState(login.mSCREEN_LOGIN);
		}
	}

        execute(login)
        {
		if (login.mStateLogs || login.mStateExecuteLogs)
		{
			console.log("CHECK_LOCALSTORAGE_LOGIN: EXECUTE");        
		}
		if (login.mLoggedIn == true)
		{
			console.log('loged in true in CHECK_LOCALSTORAGE_LOGIN state');
                        login.mApplication.mDailySchedule = new DailySchedule(login.mApplication);
                        login.mApplication.mDailySchedule.update();
                        login.mStateMachine.changeState(login.mLOGGED_IN_LOGIN);
		}
	}

        exit(login)
        {
		if (login.mStateLogs || login.mStateExitLogs)
		{
			console.log("CHECK_LOCALSTORAGE_LOGIN: EXIT");        
		}
	}
}
