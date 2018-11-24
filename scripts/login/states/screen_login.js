
'use strict';

class SCREEN_LOGIN extends State
{
	constructor() 
	{
		super();
	}

        enter(login)
        {
		if (login.mStateLogs || login.mStateEnterLogs)
		{
			console.log("SCREEN_LOGIN: ENTER");        
		}
		console.log("no username so create screen");
		//create login screen
		login.mLoginScreen = new LoginScreen(login.mApplication,login);	
		login.mLoginScreen.mButton.addEventListener("click",APPLICATION.mLogin.sendLogin);
	}

        execute(login)
        {
		if (login.mStateLogs || login.mStateExecuteLogs)
		{
			console.log("SCREEN_LOGIN: EXECUTE");        
		}
		if (login.mLoggedIn == true)
		{
			console.log('loged in true in SCREENLOGIN state');
			login.mApplication.mDailySchedule = new DailySchedule(login.mApplication);
			login.mApplication.mDailySchedule.update();
			login.mStateMachine.changeState(login.mLOGGED_IN_LOGIN);
		}
	}

        exit(login)
        {
		if (login.mStateLogs || login.mStateExitLogs)
		{
			console.log("SCREEN_LOGIN: EXIT");        
		}
	}
}
