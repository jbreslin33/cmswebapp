
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
		owner.get();
        }

        execute(owner)
        {
                if (owner.mStateLogs || owner.mStateExecuteLogs)
                {
                        console.log("INIT_INSERT_INVITE_CLUB_MEMBER_SCREEN: EXECUTE");
                }
               //console.log("XINIT_INSERT_INVITE_CLUB_MEMBER_SCREEN: EXECUTE");
		//get clubs
                if (owner.mData)
                {
                        var dataArray = owner.mData.split(",");
                        owner.mCode = dataArray[0];
                        console.log('mCode from owner:' + owner.mCode);
                        var length = owner.mData.length;
                        var jsonString = owner.mData.slice(6,length);
                        console.log('mCode from owner:' + owner.mCode);
                        console.log('jsonString:' + jsonString);

			var obj = JSON.parse(jsonString);
			for (var i = 0; i < obj.clubs.length; i++)
			{
				console.log(obj.clubs[i].id);
				console.log(obj.clubs[i].name);
			}

                        if (owner.mCode == -100)
                        {
                                owner.mApplication.mStateMachine.changeState(owner.mApplication.mMAIN_APPLICATION);
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
                owner.showSpinner();
        }

        execute(owner)
        {
                if (owner.mStateLogs || owner.mStateExecuteLogs)
                {
                        console.log("WAIT_INSERT_INVITE_CLUB_MEMBER_SCREEN: EXECUTE");
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
                                document.getElementById('insert_invite_club_member_screen_email_message_id').style.color = 'red';
                                document.getElementById('insert_invite_club_member_screen_email_message_id').innerHTML = 'Email does not exist. Would you like to <a href="#insert_native_login_screen">Join</a> with the above email instead? Or perhaps you typed email wrong?';
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



