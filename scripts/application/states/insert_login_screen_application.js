
'use strict';

class INSERT_LOGIN_SCREEN_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(app)
        {
		if (app.mStateLogs || app.mStateEnterLogs)
		{
			console.log("INSERT_LOGIN_SCREEN_APPLICATION: ENTER");        
		}
		if (app.mInsertLoginScreen)
		{
			//also maybe some clean up as well, so just leaving this if statement here.
			app.mInsertLoginScreen = new InsertLoginScreen(app);

		}
		else
		{
			app.mInsertLoginScreen = new InsertLoginScreen(app);
		}
                document.getElementById("insert_login_screen_nav_id").className += " active";
		app.mInsertLoginScreen.show();


	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("INSERT_LOGIN_SCREEN_APPLICATION: EXECUTE");        
		}
               
		if (app.mInsertLoginScreen.mCode == 100)
                {
                        app.mStateMachine.changeState(app.mMAIN_APPLICATION);
                }
		if (app.mInsertLoginScreen.mCode == 101)
		{
                        document.getElementById('insert_login_screen_email_message_id').style.color = 'red';
                        document.getElementById('insert_login_screen_email_message_id').innerHTML = 'Email already exists. Do you want to log in instead?.';
			//show link as well
			document.getElementById("insert_login_screen_link_id").style.display = "block";

		}
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("INSERT_LOGIN_SCREEN_APPLICATION: EXIT");        
		}
		app.mInsertLoginScreen.mCode = 0;

		//hide it for now maybe delete later
		var element = document.getElementById("insert_login_screen_nav_id");
                element.className = element.className.replace(/\active\b/g, "");

		app.mInsertLoginScreen.hide();
	}
}
