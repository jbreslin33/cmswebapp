'use strict';

class Application 
{
	constructor() 
	{
		this.mStateLogs = false;
		this.mStateEnterLogs = true;
		this.mStateExecuteLogs = false;
		this.mStateExitLogs = false;

		//state changed
		window.onhashchange = this.locationHashChanged;

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

	locationHashChanged() 
	{
  		if (location.hash === '#login-screen') 
		{
    			console.log("change state to login");
  		}
  		if (location.hash === '#add-event') 
		{
    			console.log("change state to insert affair");
  		}
	}

	hashchanged()
	{
		if (location.hash == "login-screen")
		{
			console.log('goto login state');
		}
		if (location.hash == "add-event")
		{
			console.log('goto insert affair state');
		}
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
