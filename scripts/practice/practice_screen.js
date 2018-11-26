'use strict';

class PracticeScreen extends OccasionScreen
{
	constructor(application,practice)
	{
		super(application);
		this.mPractice = practice;
	}

	update()
	{
         	this.mDivCard.querySelector('.eventDate').textContent = this.mPractice.mEventDate;
         	this.mDivCard.querySelector('.startTime').textContent = this.mPractice.mStartTime;
         	this.mDivCard.querySelector('.address').textContent = this.mPractice.mAddress;
	}
}
