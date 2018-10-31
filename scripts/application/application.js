'use strict';

class Application 
{

	constructor() 
	{
    		var mStateLogs = true;

                //states
		this.mStateMachine = new StateMachine(this);
			
                //this.mGLOBAL_APPLICATION  = new GLOBAL_APPLICATION();
                var mINIT_APPLICATION    = new INIT_APPLICATION  ();
                
                //this.mStateMachine.setGlobalState(this.mGLOBAL_APPLICATION);
		this.mStateMachine.changeState(this.mINIT_APPLICATION);
                
		this.mStateMachine.update();
	}

	update()
	{
		this.mStateMachine.update();
	}
}

class Report
{
	constructor()
	{

	}
} 
