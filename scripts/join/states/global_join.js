
'use strict';

class GLOBAL_JOIN extends State
{
	constructor() 
	{
		super();
	}

        enter(join)
        {
                if (join.mStateLogs || join.mStateEnterLogs)
                {
                        console.log("GLOBAL_JOIN_STATE: ENTER"); 
                }
	}

        execute(join)
        {
                if (join.mStateLogs || join.mStateExecuteLogs)
                {
                        console.log("GLOBAL_JOIN_STATE: EXECUTE"); 
                }
	}

        exit(join)
        {
                if (join.mStateLogs || join.mStateExitLogs)
                {
                        console.log("GLOBAL_JOIN_STATE: EXIT"); 
                }
	}
}
