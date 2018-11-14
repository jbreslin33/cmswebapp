'use strict';

class Application 
{

	constructor() 
	{
		this.mName = 'yo';
		/*
    		var mStateLogs = true;

                //states
		this.mStateMachine = new StateMachine(this);
			
                var mINIT_APPLICATION    = new INIT_APPLICATION  ();
                
		this.mStateMachine.changeState(this.mINIT_APPLICATION);
                
		this.mStateMachine.update();
		*/
		//this.mWeekReport = new Report(this);
		this.mHeader = new Header(this,"Club Management System");
		this.mDailySchedule = new DailySchedule(this);
		//this.mWeekReport = new OldReport(this);
	}

	update()
	{
		this.mStateMachine.update();
	}
}
