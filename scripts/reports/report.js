'use strict';

class Report
{
	constructor(application)
	{
		
		this.mApplication = application;

		//main class
                this.mDivMain = document.createElement("DIV");
                this.mDivMain.setAttribute("class", "main");
                document.body.appendChild(this.mDivMain);

                        //card
                        this.mDivCardTemplate = document.createElement("DIV");
                        this.mDivCardTemplate.setAttribute("class", "card cardTemplate weather-forecast");
                        this.mDivCardTemplate.setAttribute('hidden', true);
                        this.mDivMain.appendChild(this.mDivCardTemplate);

	}
}
