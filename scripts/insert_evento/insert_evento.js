'use strict';

class InsertEvento
{
	constructor(application)
	{
		this.mApplication = application;
		this.mScreen = new InsertEventoScreen(this);
	}

}
