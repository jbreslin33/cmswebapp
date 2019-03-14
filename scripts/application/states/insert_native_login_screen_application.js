
'use strict';

class INSERT_NATIVE_LOGIN_SCREEN_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(app)
        {
		if (app.mStateLogs || app.mStateEnterLogs)
		{
			console.log("INSERT_NATIVE_LOGIN_SCREEN_APPLICATION: ENTER");        
		}
		if (app.mInsertNativeLoginScreen)
		{
			//also maybe some clean up as well, so just leaving this if statement here.
			app.mInsertNativeLoginScreen = new InsertLoginScreen(app);

		}
		else
		{
			app.mInsertNativeLoginScreen = new InsertLoginScreen(app);
		}
                document.getElementById("insert_native_login_screen_nav_id").className += " active";
		app.mInsertNativeLoginScreen.show();
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("INSERT_NATIVE_LOGIN_SCREEN_APPLICATION: EXECUTE");        
		}
              
                if (app.mInsertNativeLoginScreen.mData)
                {
                        var dataArray = app.mInsertNativeLoginScreen.mData.split(",");
                        app.mInsertNativeLoginScreen.mCode = dataArray[0];

                        if (app.mInsertNativeLoginScreen.mCode == -100)
                        {
                                app.mInsertNativeLoginScreen.mJWT = dataArray[1]; //set jwt
                                console.log("mJWT:" + app.mInsertNativeLoginScreen.mJWT);
                                //put in local storage
                                localStorage.setItem('mJWT', app.mInsertNativeLoginScreen.mJWT);

                                app.mStateMachine.changeState(app.mMAIN_APPLICATION);
                        	document.getElementById('insert_native_login_screen_email_message_id').innerHTML = '';
                        }
                        if (app.mInsertNativeLoginScreen.mCode == -101)
                        {
				document.getElementById('insert_native_login_screen_email_message_id').style.color = 'red';
                        	document.getElementById('insert_native_login_screen_email_message_id').innerHTML = 'Email already exists. Do you want to log in instead?';
				//show link as well
				document.getElementById("insert_native_login_screen_link_id").style.display = "block";
                        }
                }
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("INSERT_NATIVE_LOGIN_SCREEN_APPLICATION: EXIT");        
		}
		app.mInsertNativeLoginScreen.mCode = 0;
		app.mInsertNativeLoginScreen.mData = null;

		//hide it for now maybe delete later
		var element = document.getElementById("insert_native_login_screen_nav_id");
                element.className = element.className.replace(/\active\b/g, "");

		app.mInsertNativeLoginScreen.hide();
	}
}
