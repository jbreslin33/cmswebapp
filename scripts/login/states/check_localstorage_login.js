
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
		/*
		if (login.mLoggedIn == true)
		{
			login.mApplication.mDailySchedule = new DailySchedule(login.mApplication);
		}
		*/
	}

        exit(login)
        {
		if (login.mStateLogs || login.mStateExitLogs)
		{
			console.log("CHECK_LOCALSTORAGE_LOGIN: EXIT");        
		}
	}
}
