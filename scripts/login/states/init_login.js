
'use strict';

class INIT_LOGIN extends State
{
	constructor() 
	{
		super();
	}

        enter(login)
        {
		if (login.mStateLogs || login.mStateEnterLogs)
		{
			console.log("INIT_LOGIN: ENTER");        
		}
		var username = localStorage.getItem("username");
		var password = localStorage.getItem("pasword");
		if (username && password)
		{
			console.log("username and password in localstorage");
			//processlogin
		}
		else
		{
			console.log("no username so create screen");
			//create login screen
			login.mLoginScreen = new LoginScreen(login.mApplication,login);	
		}
		//check local storage....
		//if local storage send login request...
		//
		//else show login screen


	}

        execute(login)
        {
		if (login.mStateLogs || login.mStateExecuteLogs)
		{
			console.log("INIT_LOGIN: EXECUTE");        
		}
	}

        exit(login)
        {
		if (login.mStateLogs || login.mStateExitLogs)
		{
			console.log("INIT_LOGIN: EXIT");        
		}
	}
}
