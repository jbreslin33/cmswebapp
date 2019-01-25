'use strict';

class WAIT_INSERT_EVENTO extends State
{
	constructor() 
	{
		super();
	}
        
	enter(insertEvento)
        {
		if (insertEvento.mStateLogs || insertEvento.mStateEnterLogs)
		{
			console.log("WAIT_INSERT_EVENTO: ENTER");        
		}
	}

        execute(insertEvento)
        {
		if (insertEvento.mStateLogs || insertEvento.mStateExecuteLogs)
		{
			console.log("WAIT_INSERT_EVENTO: EXECUTE");        
		}
	}

        exit(insertEvento)
        {
		if (insertEvento.mStateLogs || insertEvento.mStateExitLogs)
		{
			console.log("WAIT_INSERT_EVENTO: EXIT");        
		}
	}
}
