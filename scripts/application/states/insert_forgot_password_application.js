
'use strict';

class INSERT_FORGOT_PASSWORD_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(app)
        {
		if (app.mStateLogs || app.mStateEnterLogs)
		{
			console.log("INSERT_FORGOT_PASSWORD_APPLICATION: ENTER");        
		}
		if (app.mInsertForgotPasswordScreen)
		{
			app.mInsertForgotPasswordScreen = new InsertForgotPasswordScreen(app);
		}
		else
		{
			app.mInsertForgotPasswordScreen = new InsertForgotPasswordScreen(app);
		}
		app.mInsertForgotPasswordScreen.show();
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("INSERT_FORGOT_PASSWORD_APPLICATION: EXECUTE");        
		}
             
		if (app.mInsertForgotPasswordScreen.mData)
                {
                        var dataArray = app.mInsertForgotPasswordScreen.mData.split(",");
                        app.mInsertForgotPasswordScreen.mCode = dataArray[0];


                        if (app.mInsertForgotPasswordScreen.mCode == -100)
                        {
                                //app.mStateMachine.changeState(app.mMAIN_APPLICATION);
                                document.getElementById('insert_forgot_password_screen_name_message_id').innerHTML = 'A link to reset password has been sent to your email.';
                        }
                        if (app.mInsertForgotPasswordScreen.mCode == -111)
                        {
                                document.getElementById('insert_forgot_password_screen_name_message_id').style.color = 'red';
                                document.getElementById('insert_forgot_password_screen_name_message_id').innerHTML = 'Email does not exist. Do you want to create an account with that email?';
				app.mInsertForgotPasswordScreen.mCode = 0;
				app.mInsertForgotPasswordScreen.mData = null;
                        }
                }
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("INSERT_FORGOT_PASSWORD_APPLICATION: EXIT");        
		}
		app.mInsertForgotPasswordScreen.hide();
		app.mInsertForgotPasswordScreen.mCode = 0;
		app.mInsertForgotPasswordScreen.mData = null;
	}
}
