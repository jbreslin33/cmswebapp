'use strict';

class Practice extends Occasion
{
	constructor(application)
	{
		super(application);
		this.mPracticeScreen = new PracticeScreen(application,this);
	}
}
