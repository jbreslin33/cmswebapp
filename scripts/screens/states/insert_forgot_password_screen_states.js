class GLOBAL_INSERT_FORGOT_PASSWORD_SCREEN extends State
{
        constructor()
        {
                super();
        }

        enter(owner)
        {
                if (owner.mStateLogs || owner.mStateEnterLogs)
                {
                        console.log("GLOBAL_INSERT_FORGOT_PASSWORD_SCREEN: ENTER");
                }
        }

        execute(owner)
        {
                if (owner.mStateLogs || owner.mStateExecuteLogs)
                {
                        console.log("GLOBAL_INSERT_FORGOT_PASSWORD_SCREEN: EXECUTE");
                }
        }

        exit(owner)
        {
                if (owner.mStateLogs || owner.mStateExitLogs)
                {
                        console.log("GLOBAL_INSERT_FORGOT_PASSWORD_SCREEN: EXIT");
                }
        }
}

class INIT_INSERT_FORGOT_PASSWORD_SCREEN extends State
{
        constructor()
        {
                super();
        }
        
	enter(owner)
        {
                if (owner.mStateLogs || owner.mStateEnterLogs)
                {
                        console.log("INIT_INSERT_FORGOT_PASSWORD_SCREEN: ENTER");
                }
        }

        execute(owner)
        {
                if (owner.mStateLogs || owner.mStateExecuteLogs)
                {
                        console.log("INIT_INSERT_FORGOT_PASSWORD_SCREEN: EXECUTE");
                }
                if (owner.mHit)
                {
                        owner.mStateMachine.changeState(owner.mWAIT_INSERT_FORGOT_PASSWORD_SCREEN);
                }
        }

        exit(owner)
        {
                if (owner.mStateLogs || owner.mStateExitLogs)
                {
                        console.log("INIT_INSERT_FORGOT_PASSWORD_SCREEN: EXIT");
                }
        }
}
/*
                if (app.mInsertForgotPasswordScreen.mHit)
                {
                        app.mInsertForgotPasswordScreen.showSpinner();
                }

                if (app.mInsertForgotPasswordScreen.mData)
                {
                        var dataArray = app.mInsertForgotPasswordScreen.mData.split(",");
                        app.mInsertForgotPasswordScreen.mCode = dataArray[0];

                        if (app.mInsertForgotPasswordScreen.mCode == -100)
                        {
                                app.mStateMachine.changeState(app.mMAIN_APPLICATION);
                                //document.getElementById('insert_forgot_password_screen_name_message_id').innerHTML = 'A link to reset password has been sent to your email.';
                        }
                        if (app.mInsertForgotPasswordScreen.mCode == -111)
                        {
                                app.mInsertForgotPasswordScreen.show();
                                document.getElementById('insert_forgot_password_screen_name_message_id').style.color = 'red';
                                document.getElementById('insert_forgot_password_screen_name_message_id').innerHTML = 'Email does not exist. Do you want to create an account with that email?';
                                app.mInsertForgotPasswordScreen.mCode = 0;
                                app.mInsertForgotPasswordScreen.mData = null;
                        }
                }
*/
class WAIT_INSERT_FORGOT_PASSWORD_SCREEN extends State
{
        constructor()
        {
                super();
        }

        enter(owner)
        {
                if (owner.mStateLogs || owner.mStateEnterLogs)
                {
                        console.log("WAIT_INSERT_FORGOT_PASSWORD_SCREEN: ENTER");
                }
        }

        execute(owner)
        {
                if (owner.mStateLogs || owner.mStateExecuteLogs)
                {
                        console.log("WAIT_INSERT_FORGOT_PASSWORD_SCREEN: EXECUTE");
                }
                if (owner.mHit)
                {
                        owner.showSpinner();
                }

                if (owner.mData)
                {
                        var dataArray = owner.mData.split(",");
                        owner.mCode = dataArray[0];

                        if (owner.mCode == -100)
                        {
                                owner.mApplication.mStateMachine.changeState(owner.mApplication.mMAIN_APPLICATION);
                        }
                        if (owner.mCode == -111)
                        {
                                owner.show();
                                document.getElementById('insert_forgot_password_screen_name_message_id').style.color = 'red';
                                document.getElementById('insert_forgot_password_screen_name_message_id').innerHTML = 'Email does not exist. Do you want to create an account with that email?';
                                owner.mCode = 0;
                                owner.mData = null;
                        }
                }
        }

        exit(owner)
        {
                if (owner.mStateLogs || owner.mStateExitLogs)
                {
                        console.log("WAIT_INSERT_FORGOT_PASSWORD_SCREEN: EXIT");
                }
        }
}



