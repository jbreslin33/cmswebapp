
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
			console.log("MAIN_JOIN: ENTER");        
		}
	}

        execute(join)
        {
		if (join.mStateLogs || join.mStateExecuteLogs)
		{
			console.log("MAIN_JOIN: EXECUTE");        
		}
		//join.mStateMachine.changeState(join.mCHECK_LOCALSTORAGE);
	}

        exit(join)
        {
		if (join.mStateLogs || join.mStateExitLogs)
		{
			console.log("MAIN_JOIN: EXIT");        
		}
	}
}
