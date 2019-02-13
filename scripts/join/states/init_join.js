'use strict';

class INIT_JOIN extends State
{
	constructor() 
	{
		super();
	}

        enter(join)
        {
		if (join.mStateLogs || join.mStateEnterLogs)
		{
			console.log("INIT_JOIN: ENTER");        
		}
	
	}
        execute(join)
        {
		if (join.mStateLogs || join.mStateExecuteLogs)
		{
			console.log("INIT_JOIN: EXECUTE");        
		}
		join.mStateMachine.changeState(join.mCHECK_LOCALSTORAGE);
	}

        exit(join)
        {
		if (join.mStateLogs || join.mStateExitLogs)
		{
			console.log("INIT_JOIN: EXIT");        
		}
	}
}
