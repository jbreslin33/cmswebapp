
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
		owner.get();
        }

        execute(owner)
        {
                if (owner.mStateLogs || owner.mStateExecuteLogs)
                {
                        console.log("INIT_INSERT_INVITE_CLUB_MEMBER_SCREEN: EXECUTE");
                }
		
		//get clubs
                if (owner.mData)
                {
                        owner.mCode = owner.mApplication.mUtility.getCode(owner.mData);
                        owner.mJson = owner.mApplication.mUtility.getJson(owner.mData);
/*
			for (var i = 0; i < owner.mJson.clubs.length; i++)
			{
				console.log(owner.mJson.clubs[i].id);
				console.log(owner.mJson.clubs[i].name);
			}
			*/

                        if (owner.mCode == -100)
                        {
				//load up option
				//insert_invite_club_member_screen_select_id
				//
				//   var opt = document.createElement('option');
    				//opt.value = i;
    				//opt.innerHTML = i;
    				//select.appendChild(opt);
				var select = document.getElementById("insert_invite_club_member_screen_select_id");
				for (var i = 0; i < owner.mJson.clubs.length; i++)
				{
					//console.log(owner.mJson.clubs[i].id);
					//console.log(owner.mJson.clubs[i].name);
					var opt = document.createElement('option');
					opt.value = owner.mJson.clubs[i].id; 
					opt.innerHTML = owner.mJson.clubs[i].name; 
					select.appendChild(opt);
					
				}
				
                                owner.mStateMachine.changeState(owner.mWAIT_INSERT_INVITE_CLUB_MEMBER_SCREEN);
				//no we are going to populate select instead
                        }
                        if (owner.mCode == -102)
                        {
                                owner.mApplication.mStateMachine.changeState(owner.mApplication.mMAIN_APPLICATION);
				//let us know there is an error figuring out what club you are admin of......
				/*
                                owner.show();
                                document.getElementById('insert_invite_club_member_screen_email_message_id').style.color = 'red';
                                document.getElementById('insert_invite_club_member_screen_email_message_id').innerHTML = 'Email does not exist. Would you like to <a href="#insert_native_login_screen">Join</a> with the above email instead? Or perhaps you typed email wrong?';
				*/
                                owner.mCode = 0;
                                owner.mData = null;
                        }
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
/*
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
                                document.getElementById('insert_invite_club_member_screen_email_message_id').style.color = 'red';
                                document.getElementById('insert_invite_club_member_screen_email_message_id').innerHTML = 'Email does not exist. Would you like to <a href="#insert_native_login_screen">Join</a> with the above email instead? Or perhaps you typed email wrong?';
                                owner.mCode = 0;
                                owner.mData = null;
                        }
                }
		*/
        }

        exit(owner)
        {
                if (owner.mStateLogs || owner.mStateExitLogs)
                {
                        console.log("WAIT_INSERT_INVITE_CLUB_MEMBER_SCREEN: EXIT");
                }
        }
}



