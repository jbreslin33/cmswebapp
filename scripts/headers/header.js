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
		
		//addbutton 1
		this.mButtonAddA = document.createElement("BUTTON");
		this.mButtonAddA.setAttribute("class", "headerButton");
		this.mButtonAddA.setAttribute("aria-label", "Add");
		this.mButtonAddA.setAttribute("id", "butAdd");
		this.mHeader.appendChild(this.mButtonAddA);
		
		//addbutton 1
		this.mButtonAddB = document.createElement("BUTTON");
		this.mButtonAddB.setAttribute("class", "headerButton");
		this.mButtonAddB.setAttribute("aria-label", "Add");
		this.mButtonAddB.setAttribute("id", "butAdd");
		this.mHeader.appendChild(this.mButtonAddB);
		
		//addbutton 1
		this.mButtonAddC = document.createElement("BUTTON");
		this.mButtonAddC.setAttribute("class", "headerButton");
		this.mButtonAddC.setAttribute("aria-label", "Add");
		this.mButtonAddC.setAttribute("id", "butAdd");
		this.mHeader.appendChild(this.mButtonAddC);
		
		//addbutton 1
		this.mButtonAddD = document.createElement("BUTTON");
		this.mButtonAddD.setAttribute("class", "headerButton");
		this.mButtonAddD.setAttribute("aria-label", "Add");
		this.mButtonAddD.setAttribute("id", "butAdd");
		this.mHeader.appendChild(this.mButtonAddD);
		
		//addbutton 1
		this.mButtonAddE = document.createElement("BUTTON");
		this.mButtonAddE.setAttribute("class", "headerButton");
		this.mButtonAddE.setAttribute("aria-label", "Add");
		this.mButtonAddE.setAttribute("id", "butAdd");
		this.mHeader.appendChild(this.mButtonAddE);
		
		//addbutton 1
		this.mButtonAddF = document.createElement("BUTTON");
		this.mButtonAddF.setAttribute("class", "headerButton");
		this.mButtonAddF.setAttribute("aria-label", "Add");
		this.mButtonAddF.setAttribute("id", "butAdd");
		this.mHeader.appendChild(this.mButtonAddF);
	}

	buttonRefreshClicked()
	{
		console.log('buttonRefreshClicked');
		//call some kind of update all function
	}
}
