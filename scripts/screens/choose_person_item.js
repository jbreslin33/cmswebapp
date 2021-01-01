'use strict';

class ChoosePersonItem extends Item
{
        constructor(application, json, titleText, textArray, id)
        {
        	super(application, json, titleText, textArray, id);
        }

	makeButton()
	{
		if (this.mId)
		{
                	var button = document.createElement("BUTTON");
                	button.setAttribute("class","delete-button");
                	button.innerHTML = this.mTitleText;
                	this.mContainerDiv.appendChild(button);

             		button.setAttribute("id", this.mId);

                	button.onclick = this.mApplication.getCurrentScreen().hitChoosePerson.bind(button);
			this.mButton = button;
		}
	}
}
