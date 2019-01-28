'use strict';

class INIT_INSERT_EVENTO extends State
{
	constructor() 
	{
		super();
	}
        
	enter(insertEvento)
        {
		if (insertEvento.mStateLogs || insertEvento.mStateEnterLogs)
		{
			console.log("INIT_INSERT_EVENTO: ENTER");        
		}

		insertEvento.getEventoTypes();
		insertEvento.getPitches();
	}

        execute(insertEvento)
        {
		if (insertEvento.mStateLogs || insertEvento.mStateExecuteLogs)
		{
			console.log("INIT_INSERT_EVENTO: EXECUTE");        
		}
		insertEvent.mStateMachine.changeState(insertEvent.mWAIT_INSERT_EVENTO);
	}

        exit(insertEvento)
        {
		if (insertEvento.mStateLogs || insertEvento.mStateExitLogs)
		{
			console.log("INIT_INSERT_EVENTO: EXIT");        
		}
	}
}
