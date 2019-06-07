
class GLOBAL_UPDATE_FORGOT_PASSWORD_SCREEN extends State
{
        constructor()
        {
                super();
        }

        enter(owner)
        {
                if (owner.mStateLogs || owner.mStateEnterLogs)
                {
                        console.log("GLOBAL_UPDATE_FORGOT_PASSWORD_SCREEN: ENTER");
                }
        }

        execute(owner)
        {
                if (owner.mStateLogs || owner.mStateExecuteLogs)
                {
                        console.log("GLOBAL_UPDATE_FORGOT_PASSWORD_SCREEN: EXECUTE");
                }
        }

        exit(owner)
        {
                if (owner.mStateLogs || owner.mStateExitLogs)
                {
                        console.log("GLOBAL_UPDATE_FORGOT_PASSWORD_SCREEN: EXIT");
                }
        }
}

class INIT_UPDATE_FORGOT_PASSWORD_SCREEN extends State
{
        constructor()
        {
                super();
        }
        
	enter(owner)
        {
                if (owner.mStateLogs || owner.mStateEnterLogs)
                {
                        console.log("INIT_UPDATE_FORGOT_PASSWORD_SCREEN: ENTER");
                }
        }

        execute(owner)
        {
                if (owner.mStateLogs || owner.mStateExecuteLogs)
                {
                        console.log("INIT_UPDATE_FORGOT_PASSWORD_SCREEN: EXECUTE");
                }
                if (owner.mHit)
                {
                        owner.mStateMachine.changeState(owner.mWAIT_UPDATE_FORGOT_PASSWORD_SCREEN);
                }
        }

        exit(owner)
        {
                if (owner.mStateLogs || owner.mStateExitLogs)
                {
                        console.log("INIT_UPDATE_FORGOT_PASSWORD_SCREEN: EXIT");
                }
        }
}

class WAIT_UPDATE_FORGOT_PASSWORD_SCREEN extends State
{
        constructor()
        {
                super();
        }

        enter(owner)
        {
                if (owner.mStateLogs || owner.mStateEnterLogs)
                {
                        console.log("WAIT_UPDATE_FORGOT_PASSWORD_SCREEN: ENTER");
                }
                owner.showSpinner();
        }

        execute(owner)
        {
                if (owner.mStateLogs || owner.mStateExecuteLogs)
                {
                        console.log("WAIT_UPDATE_FORGOT_PASSWORD_SCREEN: EXECUTE");
                }

                if (owner.mData)
                {
                        var dataArray = owner.mData.split(",");
                        owner.mCode = dataArray[0];

                        if (owner.mCode == -100)
                        {
				owner.mApplication.mJWT = dataArray[1]; //set jwt
                                //put in local storage
                                localStorage.setItem('mJWT', owner.mApplication.mJWT);

                                //JSON
                                dataArray.shift(); //remove mCode
                                dataArray.shift(); //remove mJwt
                                dataArray.join();
                                owner.mJson = JSON.parse(dataArray);
                                //remove all old options


                                //load up option
                                var select = document.getElementById("person_select_id");
                                select.length = 0;
                                for (var i = 0; i < owner.mJson.persons.length; i++)
                                {
                                        var opt = document.createElement('option');
                                        opt.value = owner.mJson.persons[i].id;
                                        var full_name = owner.mJson.persons[i].first_name + ' ' + owner.mJson.persons[i].middle_name + ' ' + owner.mJson.persons[i].last_name;
                                        opt.innerHTML = full_name;
                                        select.appendChild(opt);
                                }

                                owner.mApplication.mStateMachine.changeState(owner.mApplication.mMAIN_APPLICATION);
                        }
                        if (owner.mCode == -102)
                        {
                                owner.show();
                                document.getElementById('update_forgot_password_screen_email_message_id').style.color = 'red';
                                document.getElementById('update_forgot_password_screen_email_message_id').innerHTML = 'Email does not exist. Would you like to <a href="#update_native_login_screen">Join</a> with the above email instead? Or perhaps you typed email wrong?';
                                owner.mCode = 0;
                                owner.mData = null;
                        }
                }
        }

        exit(owner)
        {
                if (owner.mStateLogs || owner.mStateExitLogs)
                {
                        console.log("WAIT_UPDATE_FORGOT_PASSWORD_SCREEN: EXIT");
                }
        }
}



