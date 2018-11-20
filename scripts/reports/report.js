'use strict';

class Report
{
	constructor(application)
	{
		
		this.mApplication = application;

                //card
                this.mDivCardTemplate = document.createElement("DIV");
                this.mDivCardTemplate.setAttribute("class", "card cardTemplate weather-forecast");
                //this.mDivCardTemplate.setAttribute("class", "card");
                this.mDivCardTemplate.setAttribute('hidden', true);
                this.mApplication.mDivMain.appendChild(this.mDivCardTemplate);
	}
}
