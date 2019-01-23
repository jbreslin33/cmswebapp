'use strict';

class Evento
{
	constructor(schedule)
	{
		this.mSchedule = schedule;

		this.mID = null;
		this.mEventosUsersAvailabilityID = null;
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
