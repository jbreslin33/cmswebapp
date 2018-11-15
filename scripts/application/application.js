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

		
		this.mHeader = new Header(this,"Club Management System");

		/* this is the div container for all the cards. The cards hold the individual reports
		*/
                //main class
                this.mDivMain = document.createElement("DIV");
                this.mDivMain.setAttribute("class", "main");
                document.body.appendChild(this.mDivMain);
		
		this.mDailySchedule = new DailySchedule(this);

	}

	update()
	{
		this.mStateMachine.update();
	}
}
