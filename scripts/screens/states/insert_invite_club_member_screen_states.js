
class GLOBAL_INSERT_INVITE_CLUB_MEMBER_SCREEN extends State
{
        constructor()
        {
                super();
        }

        enter(owner)
        {
                if (owner.mStateLogs || owner.mStateEnterLogs)
                {
                        console.log("GLOBAL_INSERT_INVITE_CLUB_MEMBER_SCREEN: ENTER");
                }
        }

        execute(owner)
        {
                if (owner.mStateLogs || owner.mStateExecuteLogs)
                {
                        console.log("GLOBAL_INSERT_INVITE_CLUB_MEMBER_SCREEN: EXECUTE");
                }
        }

        exit(owner)
        {
                if (owner.mStateLogs || owner.mStateExitLogs)
                {
                        console.log("GLOBAL_INSERT_INVITE_CLUB_MEMBER_SCREEN: EXIT");
                }
        }
}

class INIT_INSERT_INVITE_CLUB_MEMBER_SCREEN extends State
{
        constructor()
        {
                super();
        }
        
	enter(owner)
        {
                if (owner.mStateLogs || owner.mStateEnterLogs)
                {
                        console.log("INIT_INSERT_INVITE_CLUB_MEMBER_SCREEN: ENTER");
                }
		//use ajax to get club names and ids
                //owner.showSpinner();
		/*
		if (document.getElementById("insert_invite_club_member_screen_select_id").length > 0)
		{
                	//owner.mStateMachine.changeState(owner.mWAIT_INSERT_INVITE_CLUB_MEMBER_SCREEN);
			console.log('if');
		}
		else
		{
                	owner.mStateMachine.changeState(owner.mWAIT_FOR_CLUBS_INSERT_INVITE_CLUB_MEMBER_SCREEN);
			//owner.get();
			console.log('else');
		}
		*/

        }

        execute(owner)
        {
                if (owner.mStateLogs || owner.mStateExecuteLogs)
                {
                        console.log("INIT_INSERT_INVITE_CLUB_MEMBER_SCREEN: EXECUTE");
                }

                if (owner.mHit)
                {
                        owner.mStateMachine.changeState(owner.mWAIT_INSERT_INVITE_CLUB_MEMBER_SCREEN);
                }
        }

        exit(owner)
        {
                if (owner.mStateLogs || owner.mStateExitLogs)
                {
                        console.log("INIT_INSERT_INVITE_CLUB_MEMBER_SCREEN: EXIT");
                }
        }
}

class WAIT_FOR_CLUBS_INSERT_INVITE_CLUB_MEMBER_SCREEN extends State
{
        constructor()
        {
                super();
        }

        enter(owner)
        {
                if (owner.mStateLogs || owner.mStateEnterLogs)
                {
                        console.log("WAIT_FOR_CLUBS_INSERT_INVITE_CLUB_MEMBER_SCREEN: ENTER");
                }
		owner.get();
        }

        execute(owner)
        {
                if (owner.mStateLogs || owner.mStateExecuteLogs)
                {
                        console.log("WAIT_FOR_CLUBS_INSERT_INVITE_CLUB_MEMBER_SCREEN: EXECUTE");
                }

		if (owner.mData)
                {
                        owner.mCode = owner.mApplication.mUtility.getCode(owner.mData);
                        owner.mJson = owner.mApplication.mUtility.getJson(owner.mData);

                        if (owner.mCode == -100)
                        {
                                //load up option
                                var select = document.getElementById("insert_invite_club_member_screen_select_id");
                                for (var i = 0; i < owner.mJson.clubs.length; i++)
                                {
                                        var opt = document.createElement('option');
                                        opt.value = owner.mJson.clubs[i].id;
                                        opt.innerHTML = owner.mJson.clubs[i].name;
                                        select.appendChild(opt);
                                }

                                owner.mStateMachine.changeState(owner.mINIT_INSERT_INVITE_CLUB_MEMBER_SCREEN);
                        }
                        if (owner.mCode == -113)
                        {
                                //owner.mApplication.mStateMachine.changeState(owner.mApplication.mMAIN_APPLICATION);
                                //let us know there is an error figuring out what club you are admin of......
                                owner.show();
                                document.getElementById('insert_invite_club_member_screen_email_message_id').style.color = 'red';
                                document.getElementById('insert_invite_club_member_screen_email_message_id').innerHTML = 'You are not administrator of any clubs. Would you like to add a club? <a href="#insert_club_screen">Add Club</a>';
                        }
                }


        }

        exit(owner)
        {
                if (owner.mStateLogs || owner.mStateExitLogs)
                {
                        console.log("WAIT_FOR_CLUBS_INSERT_INVITE_CLUB_MEMBER_SCREEN: EXIT");
                }
                owner.mCode = 0;
                owner.mData = null;
        }
}
		//get clubs
/*
                if (owner.mData)
                {
                        owner.mCode = owner.mApplication.mUtility.getCode(owner.mData);
                        owner.mJson = owner.mApplication.mUtility.getJson(owner.mData);

                        if (owner.mCode == -100)
                        {
				//load up option
				var select = document.getElementById("insert_invite_club_member_screen_select_id");
				for (var i = 0; i < owner.mJson.clubs.length; i++)
				{
					var opt = document.createElement('option');
					opt.value = owner.mJson.clubs[i].id; 
					opt.innerHTML = owner.mJson.clubs[i].name; 
					select.appendChild(opt);
				}
				
                                owner.mStateMachine.changeState(owner.mINIT_INSERT_INVITE_CLUB_MEMBER_SCREEN);
                        }
                        if (owner.mCode == -113)
                        {
                                //owner.mApplication.mStateMachine.changeState(owner.mApplication.mMAIN_APPLICATION);
				//let us know there is an error figuring out what club you are admin of......
                                owner.show();
                                document.getElementById('insert_invite_club_member_screen_email_message_id').style.color = 'red';
                                document.getElementById('insert_invite_club_member_screen_email_message_id').innerHTML = 'You are not administrator of any clubs. Would you like to add a club? <a href="#insert_club_screen">Add Club</a>';
                        }
                }
*/
class WAIT_INSERT_INVITE_CLUB_MEMBER_SCREEN extends State
{
        constructor()
        {
                super();
        }

        enter(owner)
        {
                if (owner.mStateLogs || owner.mStateEnterLogs)
                {
                        console.log("WAIT_INSERT_INVITE_CLUB_MEMBER_SCREEN: ENTER");
                }
        }

        execute(owner)
        {
                if (owner.mStateLogs || owner.mStateExecuteLogs)
                {
                        console.log("WAIT_INSERT_INVITE_CLUB_MEMBER_SCREEN: EXECUTE");
                }

                if (owner.mData)
                {
                        owner.mCode = owner.mApplication.mUtility.getCode(owner.mData);

                        if (owner.mCode == -100)
                        {
                                owner.mApplication.mStateMachine.changeState(owner.mApplication.mMAIN_APPLICATION);
                        }
                        if (owner.mCode == -111)
                        {
                                owner.show();
                                document.getElementById('insert_invite_club_member_screen_email_message_id').style.color = 'red';
                                document.getElementById('insert_invite_club_member_screen_email_message_id').innerHTML = 'Invite failed.';
                                owner.mCode = 0;
                                owner.mData = null;
                        }
                }
        }

        exit(owner)
        {
                if (owner.mStateLogs || owner.mStateExitLogs)
                {
                        console.log("WAIT_INSERT_INVITE_CLUB_MEMBER_SCREEN: EXIT");
                }
        }
}



