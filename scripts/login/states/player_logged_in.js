
'use strict';

class PLAYER_LOGGED_IN extends State
{
	constructor() 
	{
		super();
	}

        enter(login)
        {
		if (login.mStateLogs || login.mStateEnterLogs)
		{
			console.log("PLAYER_LOGGED_IN: ENTER");        
		}

		//if there is a login screen hide it
		if (login.mLoginScreen)
		{
			login.mLoginScreen.hide();
		}
		//create header
		login.mHeader = new PlayerHeader(this,"PLAYER CMS");

		//fill select from db for choosing a different role in club with a particular team
		login.mHeader.getClubTeamRole();

		//display schedule since this a player
                login.mApplication.mSchedule = new Schedule(login.mApplication);
	}

        execute(login)
        {
		if (login.mStateLogs || login.mStateExecuteLogs)
		{
			console.log("PLAYER_LOGGED_IN: EXECUTE");        
		}
		if (login.mLoggedIn == false)
		{
			//you should relaunch or goto intial login state	
		}
	}

        exit(login)
        {
		if (login.mStateLogs || login.mStateExitLogs)
		{
			console.log("PLAYER_LOGGED_IN: EXIT");        
		}
	}
}
