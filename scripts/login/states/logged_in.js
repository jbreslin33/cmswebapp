
'use strict';

class LOGGED_IN extends State
{
	constructor() 
	{
		super();
	}

        enter(login)
        {
		if (login.mStateLogs || login.mStateEnterLogs)
		{
			console.log("LOGGED_IN: ENTER");        
		}

	}

        execute(login)
        {
		if (login.mStateLogs || login.mStateExecuteLogs)
		{
			console.log("LOGGED_IN: EXECUTE");        
		}
		if (login.mRolesID == 1)
		{
			login.mStateMachine.changeState(login.mPLAYER_LOGGED_IN);
		}
		if (login.mRolesID == 2)
		{
			login.mStateMachine.changeState(login.mPARENT_LOGGED_IN);
		}
		if (login.mRolesID == 3)
		{
			login.mStateMachine.changeState(login.mMANAGER_LOGGED_IN);
		}
		if (login.mRolesID == 4)
		{
			login.mStateMachine.changeState(login.mCOACH_LOGGED_IN);
		}
		if (login.mRolesID == 5)
		{
			login.mStateMachine.changeState(login.mDIRECTOR_LOGGED_IN);
		}
		if (login.mLoggedIn == false)
		{
			//you should relaunch or goto intial login state	
			login.mStateMachine.changeState(login.mSCREEN_LOGIN);
		}
	}

        exit(login)
        {
		if (login.mStateLogs || login.mStateExitLogs)
		{
			console.log("LOGGED_IN: EXIT");        
		}
	}
}
