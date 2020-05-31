'use strict';

class Item
{
        constructor(application,json)
        {
                this.mApplication = application;
                this.mJson = json;

                this.mDivArray = new Array();
                this.mCardDiv = null;
                this.mContainerDiv = null;

                this.mTitle = null;
                this.mTextArray = new Array();

                this.mButtonArray = new Array();
        }

        removeDivs()
        {
		console.log('removeDivs in item called');
                for (var x = 0; x < this.mDivArray.length; x++)
                {
			console.log('rm div:' + x );
                        this.mDivArray[x].remove();
                }

                for (var b = 0; b < this.mButtonArray.length; b++)
                {
			console.log('rm button:' + b);
                        this.mButtonArray[b].remove();
                }
        }

	printToScreen()
        {
                if (this.mJson)
                {
                        //put container..
                        this.mCardDiv = document.createElement('div');
                        this.mDivArray.push(this.mCardDiv);
                        this.mCardDiv.setAttribute('class','card');
			this.mApplication.getCurrentScreen().getColSixHtml().appendChild(this.mCardDiv);
                        //document.getElementById("upcoming_screen_col_6_html_id").appendChild(this.mCardDiv);

                        this.mContainerDiv = document.createElement('div');
                        this.mContainerDiv.setAttribute('class','container');
                        this.mCardDiv.appendChild(this.mContainerDiv);
                        this.mDivArray.push(this.mContainerDiv);

                        if (this.mJson.team_name)
                        {
                                this.mTitle = document.createElement('h5');
                                this.mContainerDiv.appendChild(this.mTitle);
                               	this.mTitle.innerHTML = '' + this.mJson.team_name;
                        }

			//delete button
                        var button = document.createElement("BUTTON");
                        button.setAttribute("class","delete-button");
                        button.innerHTML = 'DELETE TEAM';
                        this.mContainerDiv.appendChild(button);

                        var id = this.mJson.team_id;
                       	button.setAttribute("id", id);

                        button.onclick = this.mApplication.getCurrentScreen().deleteHit.bind(button);
                       	this.mButtonArray.push(button);
		}
	}
}
