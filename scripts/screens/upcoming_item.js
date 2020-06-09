'use strict';

class UpcomingItem extends Item 
{
        constructor(application, json, titleText, textArray, deleteId)
        {
        	super(application, json, titleText, textArray, deleteId);

		//for smash
		this.mPlayerNameArray = new Array();
		this.mParentNameArray = new Array();
		this.mCoachNameArray = new Array();
		this.mManagerNameArray = new Array();
		
		this.mPlayerIdArray = new Array();
		this.mParentIdArray = new Array();
		this.mCoachIdArray = new Array();
		this.mManagerIdArray = new Array();

		this.mAvailabilityIdArray = new Array();

		//availability buttons unique to schedules
		this.mAvailabilityButtonArray = new Array();
	}

	makeButtons()
	{
		for (var i = 0; i < this.mPlayerIdArray.length; i++)
		{
			var availability_id = null;

                       	if (this.mJson.type == 'game')
                        {
                                for (var a = 0; a < this.mApplication.getCurrentScreen().mGamesPlayerAvailabilityArray.length; a++)
                                {
                                        if (this.mApplication.getCurrentScreen().mGamesPlayerAvailabilityArray[a].game_id == this.mJson.id && this.mApplication.getCurrentScreen().mGamesPlayerAvailabilityArray[a].team_club_persons_club_players_id == this.mPlayerIdArray[i] )
                                        {
                                                availability_id = this.mApplication.getCurrentScreen().mGamesPlayerAvailabilityArray[a].availability_id;
                                        }
                                }

                                var button = document.createElement("BUTTON");
                                button.setAttribute("class","availability-button");
                                button.innerHTML = '' + this.mPlayerNameArray[i];
                                this.mContainerDiv.appendChild(button);
                                var id = 'button_1_1_' + this.mJson.id + '_' + this.mPlayerIdArray[i];
                                button.setAttribute("id", id);
                                button.onclick = this.mApplication.getCurrentScreen().setOneHit.bind(button);
                        	if (availability_id == 1)
                                {
                                        button.style.backgroundColor = APPLICATION.mLawnGreen;
                                }
				this.mAvailabilityButtonArray.push(button);


                                var button = document.createElement("BUTTON");
                                button.setAttribute("class","availability-button");
                                button.innerHTML = '' + this.mPlayerNameArray[i];
                                this.mContainerDiv.appendChild(button);
                                var id = 'button_1_2_' + this.mJson.id + '_' + this.mPlayerIdArray[i];
                                button.setAttribute("id", id);
                                button.onclick = this.mApplication.getCurrentScreen().setOneHit.bind(button);
                        	if (availability_id == 2)
                                {
                                        button.style.backgroundColor = APPLICATION.mYellow;
                                }
                                this.mAvailabilityButtonArray.push(button);

                                var button = document.createElement("BUTTON");
                                button.setAttribute("class","availability-button");
                                button.innerHTML = '' + this.mPlayerNameArray[i];
                                this.mContainerDiv.appendChild(button);
                                var id = 'button_1_3_' + this.mJson.id + '_' + this.mPlayerIdArray[i];
                                button.setAttribute("id", id);
                                button.onclick = this.mApplication.getCurrentScreen().setOneHit.bind(button);
                        	if (availability_id == 3)
                                {
                                        button.style.backgroundColor = APPLICATION.mRed;
                                }
                                this.mAvailabilityButtonArray.push(button);
                        }

			if (this.mJson.type == 'practice')
			{
				for (var a = 0; a < this.mApplication.getCurrentScreen().mPracticesPlayerAvailabilityArray.length; a++)
				{
					if (this.mApplication.getCurrentScreen().mPracticesPlayerAvailabilityArray[a].practice_id == this.mJson.id && this.mApplication.getCurrentScreen().mPracticesPlayerAvailabilityArray[a].team_club_persons_club_players_id == this.mPlayerIdArray[i] )
					{
						availability_id = this.mApplication.getCurrentScreen().mPracticesPlayerAvailabilityArray[a].availability_id;	
					}
				}

        			var button = document.createElement("BUTTON");
                		button.setAttribute("class","availability-button");
                        	button.innerHTML = '' + this.mPlayerNameArray[i];
                        	this.mContainerDiv.appendChild(button);
                        	var id = 'button_2_1_' + this.mJson.id + '_' + this.mPlayerIdArray[i];
                        	button.setAttribute("id", id);
                        	button.onclick = this.mApplication.getCurrentScreen().setOneHit.bind(button);
                        	if (availability_id == 1)
                        	{
                        		button.style.backgroundColor = APPLICATION.mLawnGreen;
                        	}
                        	this.mAvailabilityButtonArray.push(button);


                                var button = document.createElement("BUTTON");
                                button.setAttribute("class","availability-button");
                        	button.innerHTML = '' + this.mPlayerNameArray[i];
                                this.mContainerDiv.appendChild(button);
                        	var id = 'button_2_2_' + this.mJson.id + '_' + this.mPlayerIdArray[i];
                                button.setAttribute("id", id);
                        	button.onclick = this.mApplication.getCurrentScreen().setOneHit.bind(button);
				if (availability_id == 2)
                                {
                                	button.style.backgroundColor = APPLICATION.mYellow;
                                }
                                this.mAvailabilityButtonArray.push(button);

                                var button = document.createElement("BUTTON");
                                button.setAttribute("class","availability-button");
                        	button.innerHTML = '' + this.mPlayerNameArray[i];
                                this.mContainerDiv.appendChild(button);
                        	var id = 'button_2_3_' + this.mJson.id + '_' + this.mPlayerIdArray[i];
                                button.setAttribute("id", id);
                        	button.onclick = this.mApplication.getCurrentScreen().setOneHit.bind(button);
				if (availability_id == 3)
                                {
                                	button.style.backgroundColor = APPLICATION.mRed;
                                }
                                this.mAvailabilityButtonArray.push(button);
			}
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
                	document.getElementById("upcoming_screen_col_6_html_id").appendChild(this.mCardDiv);

                	this.mContainerDiv = document.createElement('div');
                	this.mContainerDiv.setAttribute('class','container');
                	this.mCardDiv.appendChild(this.mContainerDiv);
                	this.mDivArray.push(this.mContainerDiv);


			if (this.mTitleText)
                	{
                		this.mTitle = document.createElement('h5');
                        	this.mContainerDiv.appendChild(this.mTitle);
			}
			
			this.mTitle.innerHTML = this.mTitleText;

                       	var p = document.createElement('p');

			this.makeButtons();

                       	this.mContainerDiv.appendChild(p);

                        for (var r = 0; r < this.mTextArray.length; r++)
                        {
                                p.innerHTML = p.innerHTML + ' ' + this.mTextArray[r] + '<br>';
                        }
			
			var team_managed_id = null;

                        for (var a = 0; a < this.mApplication.getCurrentScreen().mTeamsArray.length; a++)
                        {
                        	if (this.mApplication.getCurrentScreen().mTeamsArray[a].id == this.mJson.team_id)
                                {
                                	team_managed_id = this.mApplication.getCurrentScreen().mTeamsArray[a].id;
                                }
                        }

			//do we need delete button?
			if (team_managed_id)
			{
			       	var button = document.createElement("BUTTON");
                                button.setAttribute("class","delete-button");
                                button.innerHTML = 'DELETE ' + this.mJson.type;
                                this.mContainerDiv.appendChild(button);

				var id = this.mJson.id;
                                button.setAttribute("id", id);
				
				var type = this.mJson.type;
				button.setAttribute("type", type);

                                button.onclick = this.mApplication.getCurrentScreen().deleteHit.bind(button);
                                this.mDeleteButtonArray.push(button);
			}
		}// end if (json event)
	}//end print to screen
}

