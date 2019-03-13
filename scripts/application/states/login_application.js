
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
				document.getElementById('login_screen_password_message_id').innerHTML = '';
				document.getElementById('login_screen_email_message_id').innerHTML = '';
			}
			if (app.mLogin.mCode == -101)
			{
                		document.getElementById('login_screen_email_message_id').style.color = 'red';
                        	document.getElementById('login_screen_email_message_id').innerHTML = 'email does not exist. Please enter a valid email.';
				document.getElementById('login_screen_password_message_id').innerHTML = '';
			}
			if (app.mLogin.mCode == -102)
			{
                		document.getElementById('login_screen_password_message_id').style.color = 'red';
                        	document.getElementById('login_screen_password_message_id').innerHTML = 'Incorrect password.';
				document.getElementById('login_screen_email_message_id').innerHTML = '';
			}
		}
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("LOGIN_APPLICATION: EXIT");        
		}
		//reset data variables
		app.mLogin.mCode = 0;
		app.mLogin.mData = null;

		var element = document.getElementById("login_nav_id");
		element.className = element.className.replace(/\active\b/g, "");
    		app.mLogin.hide();
	}
}
