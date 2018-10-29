'use strict';

class StateMachine
{
        constructor(owner)
        {
		console.log("StateMachine Constructor");
                this.mOwner = owner;
	
		this.mCurrentState = 0;
		this.mPreviousState = 0;
		this.mGlobalState = 0;
        }

        setCurrentState(s)
        {
		this.mCurrentState = s;
        }


	setGlobalState(s)
	{
		this.mGlobalState = s;
	}

	setPreviousState(s)
	{
		this.mPreviousState = s;
	}

	update()
	{
		if(this.mGlobalState)
		{
			this.mGlobalState.execute(this.mOwner);
		}
		if (this.mCurrentState)
		{
			this.mCurrentState.execute(this.mOwner);
		}
	}	

	changeStatep(pNewState)
	{
		this.mPreviousState = this.mCurrentState;

		if(this.mCurrentState)
		{
       			this.mCurrentState.exit(this.mOwner);
		}

		this.mCurrentState = pNewState;

		if(this.mCurrentState)
		{
        		this.mCurrentState.enter(this.mOwner);
		}
	}

	currentState()
	{
		return this.mCurrentState;
	}
}
