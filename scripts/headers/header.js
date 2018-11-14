'use strict';

class Header 
{
	constructor(application,text)
	{
		//Application
		this.mApplication = application;

		//text
		this.mText = text;	

		//header
		this.mHeader = document.createElement("header");
		this.mHeader.setAttribute("class", "header");
		document.body.appendChild(this.mHeader);

		//h1
		this.mHeaderTitle = document.createElement("H1");
		this.mHeaderTitleText = document.createTextNode(this.mText);
		this.mHeaderTitle.setAttribute("class", "header__title");
		this.mHeaderTitle.appendChild(this.mHeaderTitleText);
		this.mHeader.appendChild(this.mHeaderTitle);

		//refreshbutton
		this.mButtonRefresh = document.createElement("BUTTON");
		this.mButtonRefresh.setAttribute("class", "headerButton");
		this.mButtonRefresh.setAttribute("aria-label", "Refresh");
		this.mButtonRefresh.setAttribute("id", "butRefresh");
		this.mHeader.appendChild(this.mButtonRefresh);
		
		this.mButtonRefresh.addEventListener("click",this.buttonRefreshClicked); 
		
		//addbutton
		this.mButtonAdd = document.createElement("BUTTON");
		this.mButtonAdd.setAttribute("class", "headerButton");
		this.mButtonAdd.setAttribute("aria-label", "Add");
		this.mButtonAdd.setAttribute("id", "butAdd");
		this.mHeader.appendChild(this.mButtonAdd);
	}

	buttonRefreshClicked()
	{
		console.log('buttonRefreshClicked');
	}
	

/*
        document.getElementById('butRefresh').addEventListener('click', function()
        {
                // Refresh all of the forecasts and schedules
                APPLICATION.mWeekReport.updateForecasts();
                APPLICATION.mWeekReport.updateSchedules();
        });
*/

}
