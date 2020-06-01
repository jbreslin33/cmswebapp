'use strict';

class Item
{
        constructor(application, json, titleText, textArray, deleteId)
        {
                this.mApplication = application;
		this.mJson = json;

                this.mDivArray = new Array();
                this.mCardDiv = null;
                this.mContainerDiv = null;

		this.mTextArray = textArray;

                this.mTitle = null;
		this.mTitleText = titleText;

                this.mButtonArray = new Array();
		this.mDeleteId = deleteId;
        }

        removeDivs()
        {
                for (var x = 0; x < this.mDivArray.length; x++)
                {
                        this.mDivArray[x].remove();
                }

                for (var b = 0; b < this.mButtonArray.length; b++)
                {
                        this.mButtonArray[b].remove();
                }
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
			console.log('title if GGG');
                	this.mTitle = document.createElement('h5');
                        this.mContainerDiv.appendChild(this.mTitle);
                       	this.mTitle.innerHTML = '' + this.mTitleText;
                }
	}

	makeDeleteButton()
	{
		//delete button
		if (this.mDeleteId)
		{
                	var button = document.createElement("BUTTON");
                	button.setAttribute("class","delete-button");
                	button.innerHTML = 'DELETE';
                	this.mContainerDiv.appendChild(button);

             		button.setAttribute("id", this.mDeleteId);

                	button.onclick = this.mApplication.getCurrentScreen().deleteHit.bind(button);
              		this.mButtonArray.push(button);
		}
	}

	printToScreen()
        {
		this.makeCard();
		this.makeContainer();
		this.makeTitle();
		this.makeDeleteButton();
	}
}
