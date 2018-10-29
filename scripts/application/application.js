'use strict';

class Application 
{
	constructor() 
	{
		console.log("Application constructor");

    		this.mStateLogs = true;

                //states
                this.mStateMachine = new StateMachine(this);
			
                this.mGLOBAL_APPLICATION  = new GLOBAL_APPLICATION();
                this.mINIT_APPLICATION    = new INIT_APPLICATION  ();

                this.mStateMachine.setGlobalState(this.mGLOBAL_APPLICATION);
                this.mStateMachine.changeState(this.mINIT_APPLICATION);
		
                //START UPDATING
                var t=setInterval("APPLICATION.update()",32)
	}

        update()
        {
                this.mStateMachine.update();
        }
}
