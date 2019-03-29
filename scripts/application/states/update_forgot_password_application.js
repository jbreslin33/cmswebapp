
'use strict';

class UPDATE_FORGOT_PASSWORD_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(app)
        {
		if (app.mStateLogs || app.mStateEnterLogs)
		{
			console.log("UPDATE_FORGOT_PASSWORD_APPLICATION: ENTER");        
		}
		if (app.mUpdateForgotPasswordScreen)
		{
			app.mUpdateForgotPasswordScreen = new UpdateForgotPasswordScreen(app);
		}
		else
		{
			app.mUpdateForgotPasswordScreen = new UpdateForgotPasswordScreen(app);
		}
		app.mUpdateForgotPasswordScreen.show();
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("UPDATE_FORGOT_PASSWORD_APPLICATION: EXECUTE");        
		}
             
		if (app.mUpdateForgotPasswordScreen.mData)
                {
                        var dataArray = app.mUpdateForgotPasswordScreen.mData.split(",");
                        app.mUpdateForgotPasswordScreen.mCode = dataArray[0];


                        if (app.mUpdateForgotPasswordScreen.mCode == -100)
                        {
                                //app.mStateMachine.changeState(app.mMAIN_APPLICATION);
                                document.getElementById('insert_forgot_password_screen_name_message_id').innerHTML = 'Success';
                        }
                        if (app.mUpdateForgotPasswordScreen.mCode == -111)
                        {
                                document.getElementById('insert_forgot_password_screen_name_message_id').style.color = 'red';
                                document.getElementById('insert_forgot_password_screen_name_message_id').innerHTML = 'Email does not exist. Do you want to create an account with that email?';
				app.mUpdateForgotPasswordScreen.mCode = 0;
				app.mUpdateForgotPasswordScreen.mData = null;
                        }
                }
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("UPDATE_FORGOT_PASSWORD_APPLICATION: EXIT");        
		}
		app.mUpdateForgotPasswordScreen.hide();
		app.mUpdateForgotPasswordScreen.mCode = 0;
		app.mUpdateForgotPasswordScreen.mData = null;
	}
}
