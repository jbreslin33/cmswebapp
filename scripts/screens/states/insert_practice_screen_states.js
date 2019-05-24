
class GLOBAL_INSERT_PRACTICE_SCREEN extends State
{
        constructor()
        {
                super();
        }

        enter(owner)
        {
                if (owner.mStateLogs || owner.mStateEnterLogs)
                {
                        console.log("GLOBAL_INSERT_PRACTICE_SCREEN: ENTER");
                }
        }

        execute(owner)
        {
                if (owner.mStateLogs || owner.mStateExecuteLogs)
                {
                        console.log("GLOBAL_INSERT_PRACTICE_SCREEN: EXECUTE");
                }
        }

        exit(owner)
        {
                if (owner.mStateLogs || owner.mStateExitLogs)
                {
                        console.log("GLOBAL_INSERT_PRACTICE_SCREEN: EXIT");
                }
        }
}

class INIT_INSERT_PRACTICE_SCREEN extends State
{
        constructor()
        {
                super();
        }
        
	enter(owner)
        {
                if (owner.mStateLogs || owner.mStateEnterLogs)
                {
                        console.log("INIT_INSERT_PRACTICE_SCREEN: ENTER");
                }
                owner.mStateMachine.changeState(owner.mWAIT_FOR_SELECTS_INSERT_PRACTICE_SCREEN);
        }

        execute(owner)
        {
                if (owner.mStateLogs || owner.mStateExecuteLogs)
                {
                        console.log("INIT_INSERT_PRACTICE_SCREEN: EXECUTE");
                }
        }

        exit(owner)
        {
                if (owner.mStateLogs || owner.mStateExitLogs)
                {
                        console.log("INIT_INSERT_PRACTICE_SCREEN: EXIT");
                }
        }
}

class WAIT_FOR_SELECTS_INSERT_PRACTICE_SCREEN extends State
{
        constructor()
        {
                super();
        }

        enter(owner)
        {
                if (owner.mStateLogs || owner.mStateEnterLogs)
                {
                        console.log("WAIT_FOR_SELECTS_INSERT_PRACTICE_SCREEN: ENTER");
                }
                owner.showSpinner();
		owner.get();
        }

        execute(owner)
        {
                if (owner.mStateLogs || owner.mStateExecuteLogs)
                {
                        console.log("WAIT_FOR_SELECTS_INSERT_PRACTICE_SCREEN: EXECUTE");
                }

		if (owner.mData)
                {
                        owner.mCode = owner.mApplication.mUtility.getCode(owner.mData);
                        owner.mJson = owner.mApplication.mUtility.getJson(owner.mData);
                        owner.show();

                        if (owner.mCode == -100)
                        {

				//remove all old options

                                //load up option
                                var select = document.getElementById("insert_practice_screen_team_id");
                                for (var i = 0; i < owner.mJson.clubs.length; i++)
                                {
                                        var opt = document.createElement('option');
                                        opt.value = owner.mJson.clubs[i].id;
                                        opt.innerHTML = owner.mJson.clubs[i].name;
                                        select.appendChild(opt);
                                }

                                owner.mStateMachine.changeState(owner.mWAIT_FOR_SUBMIT_INSERT_PRACTICE_SCREEN);
                        }
                        if (owner.mCode == -113)
                        {
                                //owner.mApplication.mStateMachine.changeState(owner.mApplication.mMAIN_APPLICATION);
                                //let us know there is an error figuring out what club you are admin of......
                                document.getElementById('insert_practice_screen_email_message_id').style.color = 'red';
                                document.getElementById('insert_practice_screen_email_message_id').innerHTML = 'You are not administrator of any clubs. Would you like to add a club? <a href="#insert_club_screen">Add Club</a>';
                        }
                }
        }

        exit(owner)
        {
                if (owner.mStateLogs || owner.mStateExitLogs)
                {
                        console.log("WAIT_FOR_SELECTS_INSERT_PRACTICE_SCREEN: EXIT");
                }
                owner.mCode = 0;
                owner.mData = null;
        }
}

class WAIT_FOR_SUBMIT_INSERT_PRACTICE_SCREEN extends State
{
        constructor()
        {
                super();
        }

        enter(owner)
        {
                if (owner.mStateLogs || owner.mStateEnterLogs)
                {
                        console.log("WAIT_FOR_SUBMIT_INSERT_PRACTICE_SCREEN: ENTER");
                }
        }

        execute(owner)
        {
                if (owner.mStateLogs || owner.mStateExecuteLogs)
                {
                        console.log("WAIT_FOR_SUBMIT_INSERT_PRACTICE_SCREEN: EXECUTE");
                }

		if (owner.mHit == true)
		{
			owner.showSpinner();
		}

                if (owner.mData)
                {
                        owner.mCode = owner.mApplication.mUtility.getCode(owner.mData);

                        if (owner.mCode == -100)
                        {
                                owner.mStateMachine.changeState(owner.mWAIT_INSERT_PRACTICE_SCREEN);
                                owner.mApplication.mStateMachine.changeState(owner.mApplication.mMAIN_APPLICATION);
                        }
                        if (owner.mCode == -111)
                        {
                                owner.show();
                                document.getElementById('insert_practice_screen_email_message_id').style.color = 'red';
                                document.getElementById('insert_practice_screen_email_message_id').innerHTML = 'Invite failed.';
                                owner.mCode = 0;
                                owner.mData = null;
                        }
                }
        }

        exit(owner)
        {
                if (owner.mStateLogs || owner.mStateExitLogs)
                {
                        console.log("WAIT_FOR_SUBMIT_INSERT_PRACTICE_SCREEN: EXIT");
                }
        }
}

class WAIT_INSERT_PRACTICE_SCREEN extends State
{
        constructor()
        {
                super();
        }

        enter(owner)
        {
                if (owner.mStateLogs || owner.mStateEnterLogs)
                {
                        console.log("WAIT_INSERT_PRACTICE_SCREEN: ENTER");
                }
                owner.hide();
        }
        execute(owner)
        {
                if (owner.mStateLogs || owner.mStateEnterLogs)
                {
                        console.log("WAIT_INSERT_PRACTICE_SCREEN: EXECUTE");
                }
        }
        exit(owner)
        {
                if (owner.mStateLogs || owner.mStateEnterLogs)
                {
                        console.log("WAIT_INSERT_PRACTICE_SCREEN: EXIT");
                }
        }
}


