'use strict';

class Affair
{
	constructor(schedule)
	{
		this.mSchedule = schedule;

                this.mAffairDate = 'JAN 01 2000';
                this.mArrivalTime = '11PM';
                this.mStartTime = '12AM';
                this.mEndTime = null;
                this.mAddress   = 'NOWHERE';
                this.mCoordinates   = null;
                this.mPitch   = null;
                this.mFieldName   = null;
                this.mTeam   = null;
                this.mAffairType = 'Practice';
		
		this.mAffairScreen = null;
	}
	destructor()
	{
		this.mAffairScreen.destructor();
		this.mAffairScreen = null;
		delete this.mAffairScreen;
	}
}
