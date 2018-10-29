
'use strict';

class INIT_APPLICATION extends State
{
	constructor() 
	{
		super();

	}

        enter(application)
        {
		conole.log("INIT_APPLICATION_STATE: ENTER");        
	}

        execute(application)
        {
		conole.log("INIT_APPLICATION_STATE: EXECUTE");        
	}

        exit(application)
        {
        
	}
}
