'use strict';

class Report
{
	constructor(application)
	{
		
		this.mApplication = application;

                //card
                this.mDivCard = document.createElement("DIV");
                this.mDivCard.setAttribute("class", "card cardTemplate weather-forecast");
                this.mDivCard.setAttribute('hidden', true);
                this.mApplication.mDivMain.appendChild(this.mDivCard);
	}
}
