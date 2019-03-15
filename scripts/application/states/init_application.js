
'use strict';

class INIT_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(application)
        {
		if (application.mStateLogs || application.mStateEnterLogs)
		{
			console.log("INIT_APPLICATION_STATE: ENTER");        
		}
		//hide evertthing except nav_bar_id
		document.getElementById("nav_bar_id").style.display = "block";
		document.getElementById("insert_native_login_screen_html_id").style.display = "none";
		document.getElementById("login_screen_html_id").style.display = "none";
		document.getElementById("card_original_id").style.display = "none";
		document.getElementById("insert_evento_html_id").style.display = "none";
		document.getElementById("add_club_screen_html_id").style.display = "none";
	}

        execute(application)
        {
		if (application.mStateLogs || application.mStateExecuteLogs)
		{
			console.log("INIT_APPLICATION_STATE: EXECUTE");        
		}
		application.mJWT = localStorage.getItem("mJWT");
		if (application.mJWT)
		{
			application.mStateMachine.changeState(application.mMAIN_APPLICATION);
		}
		else
		{
			application.mStateMachine.changeState(application.mLOGIN_APPLICATION);
		}
	}

        exit(application)
        {
		if (application.mStateLogs || application.mStateExitLogs)
		{
			console.log("INIT_APPLICATION_STATE: EXIT");        
		}
	}
}
