'use strict';

class Practice extends Occasion
{
	constructor(schedule)
	{
		super(schedule);

                this.mEventDate = 'JAN 01 2000';
                this.mStartTime = '12AM';
                this.mAddress   = 'NOWHERE';
		
		this.mPracticeScreen = new PracticeScreen(this);

	}
}
