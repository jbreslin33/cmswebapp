'use strict';

class Screen
{
	constructor(application)
	{
		this.mApplication = application;

		location.hash = null;

		this.mCode = 0;
		this.mData = null;

		this.mHit = false;

                //states
		this.mStateLogs = false;
                this.mStateEnterLogs = true;
                this.mStateExecuteLogs = false;
                this.mStateExitLogs = false;

                this.mStateMachine = null;
	}

	hit()
	{
	
	}
       
	showSpinner()
	{
	}

	show()
	{
	}

	hide()
	{
	}

	update(timestamp)
	{
		if (this.mStateMachine)
		{
			this.mStateMachine.update();
		}
	}
}
