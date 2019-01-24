'use strict';

class InsertEvento extends Evento
{
	constructor(schedule)
	{
		super(schedule);

		this.mScreen = new InsertEventoScreen(this);
	}

}
