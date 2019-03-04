
'use strict';

class LOGIN_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(app)
        {
		if (app.mStateLogs || app.mStateEnterLogs)
		{
			console.log("LOGIN_APPLICATION: ENTER");        
		}
		if (app.mLogin)
		{
			//do nothing right now	
		}
		else
		{
			//start the login subsystem
			app.mLogin = new LoginScreen(app);
		}
		document.getElementById("login_nav_id").className += " active";
    		app.mLogin.show();

	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("LOGIN_APPLICATION: EXECUTE");        
		}

		if (app.mLogin.mLoggedIn == true)
		{
			app.mStateMachine.changeState(app.mMAIN_APPLICATION);
		}
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("LOGIN_APPLICATION: EXIT");        
		}
		var element = document.getElementById("login_nav_id");
		element.className = element.className.replace(/\active\b/g, "");
    		app.mLogin.hide();
	}
}
