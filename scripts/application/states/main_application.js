
'use strict';

class MAIN_APPLICATION extends State
{
	constructor() 
	{
		super();
	}

        enter(app)
        {
		if (app.mStateLogs || app.mStateEnterLogs)
		{
			console.log("MAIN_APPLICATION: ENTER");        
		}
		//app.mStateMachine.changeState(app.mLOGIN_APPLICATION);
		
		if (app.mMain)
		{
                        //also maybe some clean up as well, so just leaving this if statement here.
                      app.mMain = new Main(app);

                }
                else
                {
                      app.mMain = new Main(app);
                }
             	document.getElementById("main_nav_id").className += " active";

                //app.mMain.show();

	}

        execute(app)
        {
		if (app.mStateLogs || app.mStateExecuteLogs)
		{
			console.log("MAIN_APPLICATION: EXECUTE");        
		}
	}

        exit(app)
        {
		if (app.mStateLogs || app.mStateExitLogs)
		{
			console.log("MAIN_APPLICATION: EXIT");        
		}
                //app.mMain.hide();
               	var element = document.getElementById("main_nav_id");
                element.className = element.className.replace(/\active\b/g, "");
	}
}
