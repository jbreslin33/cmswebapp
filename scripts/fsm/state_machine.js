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
		console.log('state_machine update');
		if(this.mGlobalState)
		{
			this.mGlobalState.execute(this.mOwner);
		}
		if (this.mCurrentState)
		{
			this.mCurrentState.execute(this.mOwner);
		}
	}	

	changeState(pNewState)
	{
		this.mPreviousState = this.mCurrentState;

		if(this.mCurrentState)
		{
       			this.mCurrentState.exit(this.mOwner);
		}

		this.mCurrentState = pNewState;

		if(this.mCurrentState)
		{
			console.log('enter');
        		this.mCurrentState.enter(this.mOwner);
		}
		else
		{
			console.log('nothign');
		}
	}

	currentState()
	{
		return this.mCurrentState;
	}
}
