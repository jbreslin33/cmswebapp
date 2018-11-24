'use strict';

class Report
{
	constructor(application)
	{
		
		this.mApplication = application;

		              //states
                this.mStateMachine = new StateMachine(this);

                //card
                this.mDivCard = document.createElement("DIV");
                this.mDivCard.setAttribute("class", "card");
                this.mApplication.mDivMain.appendChild(this.mDivCard);
	}
}
