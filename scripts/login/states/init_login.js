
'use strict';

class INIT_LOGIN extends State
{
	constructor() 
	{
		super();
	}

        enter(login)
        {
		if (login.mStateLogs || login.mStateEnterLogs)
		{
			console.log("INIT_LOGIN: ENTER");        
		}
	}

        execute(login)
        {
		if (login.mStateLogs || login.mStateExecuteLogs)
		{
			console.log("INIT_LOGIN: EXECUTE");        
		}
		login.mStateMachine.changeState(login.mCHECK_LOCALSTORAGE_LOGIN);
	}

        exit(login)
        {
		if (login.mStateLogs || login.mStateExitLogs)
		{
			console.log("INIT_LOGIN: EXIT");        
		}
	}
}
