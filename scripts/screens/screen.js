'use strict';

class Screen
{
	constructor(application)
	{
		this.mApplication = application;

		location.hash = null;

		//html ids
		this.mSpinnerId = null;
		this.mHtmlId = null;

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

	get()
	{

	}
       
	update(timestamp)
	{
		if (this.mStateMachine)
		{
			this.mStateMachine.update();
		}
	}

        showSpinner()
        {
                document.getElementById(this.mHtmlId).style.visibility = "hidden";
                document.getElementById(this.mSpinnerId).style.visibility = "visible";
        }

        show()
        {
                document.getElementById(this.mHtmlId).style.display = "block";
                document.getElementById(this.mHtmlId).style.visibility = "visible";
                document.getElementById(this.mSpinnerId).style.visibility = "hidden";
        }

        hide()
        {
                document.getElementById(this.mHtmlId).style.display = "none";
        }
}
