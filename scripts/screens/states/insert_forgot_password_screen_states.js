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
                owner.showSpinner();
        }

        execute(owner)
        {
                if (owner.mStateLogs || owner.mStateExecuteLogs)
                {
                        console.log("WAIT_INSERT_FORGOT_PASSWORD_SCREEN: EXECUTE");
                }

                if (owner.mData)
                {
                        var dataArray = owner.mData.split(",");
                        owner.mCode = dataArray[0];
			console.log('mCode from owner:' + owner.mCode);

                        if (owner.mCode == -100)
                        {
                                owner.mApplication.mStateMachine.changeState(owner.mApplication.mMAIN_APPLICATION);
                        }
                        if (owner.mCode == -102)
                        {
                                owner.show();
				//document.getElementById("insert_forgot_password_screen_spinner_id").style.visibility = "visible";

                                document.getElementById('insert_forgot_password_screen_email_message_id').style.color = 'red';
                                document.getElementById('insert_forgot_password_screen_email_message_id').innerHTML = 'Email does not exist. Do you want to create an account with that email?';
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



