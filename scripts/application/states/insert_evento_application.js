
'use strict';

class INSERT_EVENTO_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(app)
        {
		if (app.mStateLogs || app.mStateEnterLogs)
		{
			console.log("INSERT_EVENTO_APPLICATION: ENTER");        
		}

		if (app.mInsertEvento)
		{

		}
		else
		{
			app.mInsertEvento = new InsertEvento(app);
		}

		//show
				
		app.mInsertEvento.mScreen.show();	
	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("INSERT_EVENTO_APPLICATION: EXECUTE");        
		}
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("INSERT_EVENTO_APPLICATION: EXIT");        
		}
	}
}
