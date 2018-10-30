'use strict';

class Application 
{
	constructor() 
	{
		console.log("Application constructor");

    		this.mStateLogs = true;

                //states
		this.mStateMachine = 0;
                
		this.mStateMachine = new StateMachine(this);
			
                //this.mGLOBAL_APPLICATION  = new GLOBAL_APPLICATION();
                this.mINIT_APPLICATION    = new INIT_APPLICATION  ();
                
		this.mStateMachine.changeState(this.mINIT_APPLICATION);

                //var t=setInterval(this.update,32);
		
	}

	//startTimer()
	//{
                //this.mStateMachine.setGlobalState(this.mGLOBAL_APPLICATION);
                //START UPDATING
	//}

        update()
        {
                //this.mStateMachine.update();
        }
}
