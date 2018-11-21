'use strict';

class Application 
{
	constructor() 
	{

		this.mStateLogs = true;

		/* this is the div container for all the cards. The cards hold the individual reports
		*/
		//header	
		this.mHeader = new Header(this,"Club Management System");
                
		//main class
                this.mDivMain = document.createElement("DIV");
                this.mDivMain.setAttribute("class", "main");
                document.body.appendChild(this.mDivMain);


		//states
		this.mStateMachine = new StateMachine(this);
		this.mGLOBAL_APPLICATION = new GLOBAL_APPLICATION();
		this.mINIT_APPLICATION = new INIT_APPLICATION();

		this.mStateMachine.setGlobalState(this.mGLOBAL_APPLICATION);
		this.mStateMachine.changeState(this.mINIT_APPLICATION);


		//login first
		this.mLogin = new Login(this);
		
		
		//report
		this.mDailySchedule = new DailySchedule(this);
		
	}

	update()
	{
		this.mStateMachine.update();
	}
}
