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
		this.mButtonRefresh.addEventListener("click",this.buttonRefreshClicked); 
		this.mHeader.appendChild(this.mButtonRefresh);
		
		this.mSelectRole = document.createElement("SELECT");
		//this.mSelectRole.setAttribute("class", "headerButton");
		this.mHeader.appendChild(this.mSelectRole);
		
		this.mSelectTeam = document.createElement("SELECT");
		this.mHeader.appendChild(this.mSelectTeam);
	}

	buttonRefreshClicked()
	{
		console.log('buttonRefreshClicked');
		//call some kind of update all function
	}
}
