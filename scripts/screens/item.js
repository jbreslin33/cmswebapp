'use strict';

class Item
{
        constructor(application, json, titleText, textArray, id)
        {
                this.mApplication = application;
		this.mJson = json;

                this.mDivArray = new Array();
                this.mCardDiv = null;
                this.mContainerDiv = null;

		this.mTextArray = textArray;

                this.mTitle = null;
		this.mTitleText = titleText;

                this.mButton = null;
		this.mId = id;
        }

        removeDivs()
        {
		console.log('Item::removeDivs()');
                for (var x = 0; x < this.mDivArray.length; x++)
                {
                        this.mDivArray[x].remove();
                }

                this.mButton.remove();
        }

	makeCard()
	{
        	//put container..
                this.mCardDiv = document.createElement('div');
                this.mDivArray.push(this.mCardDiv);
                this.mCardDiv.setAttribute('class','card');
		this.mApplication.getCurrentScreen().getColSixHtml().appendChild(this.mCardDiv);
	}

	makeContainer()
	{
                this.mContainerDiv = document.createElement('div');
                this.mContainerDiv.setAttribute('class','container');
                this.mCardDiv.appendChild(this.mContainerDiv);
                this.mDivArray.push(this.mContainerDiv);
	}

	makeTitle()
	{
                if (this.mTitleText)
                {
                	this.mTitle = document.createElement('h5');
                        this.mContainerDiv.appendChild(this.mTitle);
                       	this.mTitle.innerHTML = '' + this.mTitleText;
                }
	}

	makeButton()
	{
		if (this.mId)
		{
                	var button = document.createElement("BUTTON");
                	button.setAttribute("class","availability-button");
                	button.innerHTML = '';
                	this.mContainerDiv.appendChild(button);

             		button.setAttribute("id", this.mId);

                	button.onclick = this.mApplication.getCurrentScreen().hit.bind(button);
			this.mButton = button;
		}
	}

	printToScreen()
        {
		this.makeCard();
		this.makeContainer();
		this.makeTitle();
		this.makeButton();
	}
}
