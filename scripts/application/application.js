'use strict';

class Application 
{

	constructor() 
	{
		/*
    		var mStateLogs = true;

                //states
		this.mStateMachine = new StateMachine(this);
			
                var mINIT_APPLICATION    = new INIT_APPLICATION  ();
                
		this.mStateMachine.changeState(this.mINIT_APPLICATION);
                
		this.mStateMachine.update();
		*/
		this.mWeekReport = new Report();
	}

	update()
	{
		this.mStateMachine.update();
	}
}
