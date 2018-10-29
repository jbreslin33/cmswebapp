'use strict';

class Application 
{
	constructor() 
	{
		console.log("Application constructor");

    		this.mStateLogs = false;

                //states
                this.mStateMachine = new StateMachine(this);
			

                this.mGLOBAL_APPLICATION  = new GLOBAL_APPLICATION();
                //this.mINIT_APPLICATION    = new INIT_APPLICATION         (this);
                //this.mNORMAL_APPLICATION  = new NORMAL_APPLICATION         (this);
	}

        update()
        {
                //this.mStateMachine.update();
        }
}
