
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
		//hide evertthing
		document.getElementById("nav_bar_id").style.display = "none";
		document.getElementById("join_screen_html_id").style.display = "none";
		document.getElementById("login_screen_html_id").style.display = "none";
		document.getElementById("card_original_id").style.display = "none";
		document.getElementById("insert_evento_html_id").style.display = "none";
	}

        execute(application)
        {
		if (application.mStateLogs || application.mStateExecuteLogs)
		{
			console.log("INIT_APPLICATION_STATE: EXECUTE");        
		}
		application.mStateMachine.changeState(application.mMAIN_APPLICATION);
	}

        exit(application)
        {
		if (application.mStateLogs || application.mStateExitLogs)
		{
			console.log("INIT_APPLICATION_STATE: EXIT");        
		}
	}
}
