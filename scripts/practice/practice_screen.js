'use strict';

class PracticeScreen extends OccasionScreen
{
	constructor(practice)
	{
		super(practice.mApplication);
		this.mPractice = practice;
	}

	update()
	{
         	this.mDivCard.querySelector('.eventDate').textContent = this.mPractice.mEventDate;
         	this.mDivCard.querySelector('.startTime').textContent = this.mPractice.mStartTime;
         	this.mDivCard.querySelector('.address').textContent = this.mPractice.mAddress;
	}
}
