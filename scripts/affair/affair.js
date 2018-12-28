'use strict';

class Affair
{
	constructor(schedule)
	{
		this.mSchedule = schedule;

		this.mData = new Array();
		this.mScreen = null;
	}
	destructor()
	{
		this.mScreen.destructor();
		this.mScreen = null;
		delete this.mScreen;
	}
}
