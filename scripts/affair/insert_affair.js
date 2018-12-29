'use strict';

class InsertAffair extends Affair
{
	constructor(schedule)
	{
		super(schedule);

		this.mScreen = new InsertAffairScreen(this);
	}

}
