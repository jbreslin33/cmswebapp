'use strict';

class Affair
{
	constructor(schedule)
	{
		this.mSchedule = schedule;

		this.mData = new Array();
/*
                this.mAffairDate   = 'JAN 01 2000';
                this.mArrivalTime  = '11PM';
                this.mStartTime    = '12AM';
                this.mEndTime      = null;
                this.mAddress      = 'NOWHERE';
                this.mCoordinates  = null;
                this.mPitch        = null;
                this.mFieldName    = null;
                this.mTeam         = null;
                this.mAffairType   = 'Practice';
*/		
		this.mScreen = null;
	}
	destructor()
	{
		this.mScreen.destructor();
		this.mScreen = null;
		delete this.mScreen;
	}
}
