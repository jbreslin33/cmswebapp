
'use strict';

class INIT extends State
{
	constructor() 
	{
		super();
	}

        enter(login)
        {
		if (login.mStateLogs || login.mStateEnterLogs)
		{
			console.log("INIT: ENTER");        
		}
	}

        execute(login)
        {
		if (login.mStateLogs || login.mStateExecuteLogs)
		{
			console.log("INIT: EXECUTE");        
		}
		login.mStateMachine.changeState(login.mCHECK_LOCALSTORAGE);
	}

        exit(login)
        {
		if (login.mStateLogs || login.mStateExitLogs)
		{
			console.log("INIT: EXIT");        
		}
	}
}
