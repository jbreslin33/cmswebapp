
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
              
                if (app.mLogin.mData)
                {
                        var dataArray = app.mLogin.mData.split(",");
                        app.mLogin.mCode = dataArray[0];

                        if (app.mLogin.mCode == -100)
                        {
                                app.mLogin.mJWT = dataArray[1]; //set jwt
                                console.log("mJWT:" + app.mLogin.mJWT);
                                //put in local storage
                                // localStorage.setItem('mEventoArrayLocal', JSON.stringify(schedule.mEventoArray));
                                localStorage.setItem('mJWT', app.mLogin.mJWT);

                                app.mStateMachine.changeState(app.mMAIN_APPLICATION);
                        	document.getElementById('insert_login_screen_email_message_id').innerHTML = '';
                        }
                        if (app.mLogin.mCode == -101)
                        {
				document.getElementById('insert_login_screen_email_message_id').style.color = 'red';
                        	document.getElementById('insert_login_screen_email_message_id').innerHTML = 'Email already exists. Do you want to log in instead?';
				//show link as well
				document.getElementById("insert_login_screen_link_id").style.display = "block";
                        }
                }
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("INSERT_LOGIN_SCREEN_APPLICATION: EXIT");        
		}
		app.mInsertLoginScreen.mCode = 0;
		app.mInsertLoginScreen.mData = null;

		//hide it for now maybe delete later
		var element = document.getElementById("insert_login_screen_nav_id");
                element.className = element.className.replace(/\active\b/g, "");

		app.mInsertLoginScreen.hide();
	}
}
