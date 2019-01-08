'use strict';

class Application 
{
	constructor() 
	{
		this.mStateLogs = false;
		this.mStateEnterLogs = true;
		this.mStateExecuteLogs = false;
		this.mStateExitLogs = false;
		
		//login first
		this.mLogin = null;
		
		//report
		this.mSchedule = null;

		//main class
                this.mDivMain = document.createElement("DIV");
                this.mDivMain.setAttribute("class", "main");
                document.body.appendChild(this.mDivMain);

		//states
		this.mStateMachine = new StateMachine(this);
		this.mGLOBAL_APPLICATION = new GLOBAL_APPLICATION();
		this.mINIT_APPLICATION = new INIT_APPLICATION();
		this.mMAIN_APPLICATION = new MAIN_APPLICATION();

		this.mStateMachine.setGlobalState(this.mGLOBAL_APPLICATION);
		this.mStateMachine.changeState(this.mINIT_APPLICATION);
	}

	update(timestamp)
	{
		this.mStateMachine.update();

		if (this.mLogin)
		{
			this.mLogin.update(timestamp);
		}
		if (this.mSchedule)
		{
			this.mSchedule.update(timestamp);
		}

		//run again
	        window.requestAnimationFrame(APPLICATION.update.bind(APPLICATION));
	}
}
