'use strict';

class ScheduleItem extends Item 
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

                this.mGameRosterArray = new Array();
                this.mPracticeRosterArray = new Array();
                this.mGameTeamAvailabilityArray = new Array();
                this.mPracticeTeamAvailabilityArray = new Array();

		//availability buttons unique to schedules
		this.mAvailabilityButtonArray = new Array();

		this.mTabRow = null;
		this.mPlayerDiv = null;
        	this.mTeamDiv = null;
	}

	removeTeamRosterDivs()
	{
		if (this.mTeamDiv)
		{
			this.mTeamDiv.remove();		
		}
	}

	getTeamAvailability()
	{
		var screen = APPLICATION.getCurrentScreen();
		if (this.mJson.type == 'game')
		{
                	screen.setUrl("/php/classes/screens/team_game_availability.php?" + screen.getStandardParameters() + '&game_id=' + this.mJson.id);
		}
		if (this.mJson.type == 'practice')
		{
                	screen.setUrl("/php/classes/screens/team_practice_availability.php?" + screen.getStandardParameters() + '&practice_id=' + this.mJson.id);
		}
                screen.ajax();
	}

	toggleTeamDiv()
	{
		if (this.mPlayerDiv.style.display == "none")
		{
			this.showPlayerDiv();
			this.hideTeamDiv();
		}
		else
		{
			this.hidePlayerDiv();
			this.showTeamDiv();
			this.getTeamAvailability();
		}
		//get...
		//this.showTeamDiv();
		//this.hidePlayerDiv();
	}

	showPlayerDiv()
	{
                if (this.mPlayerDiv)
                {
                        this.mPlayerDiv.style.display = "block";
                        this.mPlayerDiv.style.visibility = "visible";
                }
	}

	hidePlayerDiv()
	{
                if (this.mPlayerDiv)
                {
                        this.mPlayerDiv.style.display = "none";
                }
	}

        showTeamDiv()
        {
                if (this.mTeamDiv)
                {
                        this.mTeamDiv.style.display = "block";
                        this.mTeamDiv.style.visibility = "visible";
                }
        }

        hideTeamDiv()
        {
                if (this.mTeamDiv)
                {
                        this.mTeamDiv.style.display = "none";
                }
        }

	makeTabs()
	{
        	this.mTabRow = document.createElement("DIV");
                this.mTabRow.setAttribute("class","row");
		this.mContainerDiv.appendChild(this.mTabRow);

        	var tab = document.createElement("DIV");
                this.mTabRow.appendChild(tab);
                
		var paragraph = document.createElement("p");
                paragraph.setAttribute("class","tabs");
                tab.appendChild(paragraph);
                paragraph.innerHTML = this.mTitleText;
		
		var button = document.createElement("BUTTON");
                button.setAttribute("class","tabs");
                button.innerHTML = 'Toggle Team Availability';
                button.onclick = this.toggleTeamDiv.bind(this);
                tab.appendChild(button);
	}

	makeRosterButtons()
	{
		var screen = APPLICATION.getCurrentScreen();

		for (var i = 0; i < this.mGameRosterArray.length; i++)
		{
			var availability_id = null;

                       	if (this.mJson.type == 'game')
                        {
                                for (var a = 0; a < this.mGameTeamAvailabilityArray.length; a++)
                                {
                                        if (this.mGameTeamAvailabilityArray[a].game_id == this.mJson.id && this.mGameTeamAvailabilityArray[a].team_club_player_id == this.mGameRosterArray[i].players )
                                        {
                                                availability_id = this.mGameTeamAvailabilityArray[a].availability_id;
                                        }
                                }

				if (this.mJson.id == this.mGameRosterArray[i].game_id) 
				{

                                	var button = document.createElement("BUTTON");
                                	button.setAttribute("class","availability-button");
                                	button.innerHTML = '' + this.mGameRosterArray[i].first_name + ' ' + this.mGameRosterArray[i].last_name;
                                	this.mTeamDiv.appendChild(button);
                                	var id = 'button_1_1_' + this.mJson.id + '_' + this.mGameRosterArray[i].players;
                                	button.setAttribute("id", id);
                                	button.onclick = this.mApplication.getCurrentScreen().setOneHit.bind(button);
                        		if (availability_id == 1)
                                	{
                                       		button.style.backgroundColor = APPLICATION.mLawnGreen;
                                	}
					this.mAvailabilityButtonArray.push(button);


                                	var button = document.createElement("BUTTON");
                                	button.setAttribute("class","availability-button");
                                	button.innerHTML = '' + this.mGameRosterArray[i].first_name + ' ' + this.mGameRosterArray[i].last_name; 
                                	this.mTeamDiv.appendChild(button);
                                	var id = 'button_1_2_' + this.mJson.id + '_' + this.mGameRosterArray[i].players;
                                	button.setAttribute("id", id);
                                	button.onclick = this.mApplication.getCurrentScreen().setOneHit.bind(button);
                        		if (availability_id == 2)
                                	{
                                       		button.style.backgroundColor = APPLICATION.mYellow;
                                	}
                                	this.mAvailabilityButtonArray.push(button);

                                	var button = document.createElement("BUTTON");
                                	button.setAttribute("class","availability-button");
                                	button.innerHTML = '' + this.mGameRosterArray[i].first_name + ' ' + this.mGameRosterArray[i].last_name;
                                	this.mTeamDiv.appendChild(button);
                                	var id = 'button_1_3_' + this.mJson.id + '_' + this.mGameRosterArray[i].players;
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
		
		for (var i = 0; i < this.mPracticeRosterArray.length; i++)
		{
			var availability_id = null;

			if (this.mJson.type == 'practice')
			{
				for (var a = 0; a < this.mPracticeTeamAvailabilityArray.length; a++)
				{
					if (this.mPracticeTeamAvailabilityArray[a].practice_id == this.mJson.id && this.mPracticeTeamAvailabilityArray[a].team_club_player_id == this.mPracticeRosterArray[i].players )
					{
						availability_id = this.mPracticesPlayerAvailabilityArray[a].availability_id;	
					}
				}
				
				if (this.mJson.id == this.mPracticeRosterArray[i].practice_id) 
				{
        				var button = document.createElement("BUTTON");
                			button.setAttribute("class","availability-button");
                        		button.innerHTML = '' + this.mPracticeRosterArray[i].first_name + ' ' + this.mPracticeRosterArray[i].last_name;
                        		this.mTeamDiv.appendChild(button);
                        		var id = 'button_2_1_' + this.mJson.id + '_' + this.mPracticeRosterArray[i].players;
                        		button.setAttribute("id", id);
                        		button.onclick = this.mApplication.getCurrentScreen().setOneHit.bind(button);
                        		if (availability_id == 1)
                        		{
                        			button.style.backgroundColor = APPLICATION.mLawnGreen;
                        		}
                        		this.mAvailabilityButtonArray.push(button);


                                	var button = document.createElement("BUTTON");
                                	button.setAttribute("class","availability-button");
                        		button.innerHTML = '' + this.mPracticeRosterArray[i].first_name + ' ' + this.mPracticeRosterArray[i].last_name;
                                	this.mTeamDiv.appendChild(button);
                        		var id = 'button_2_2_' + this.mJson.id + '_' + this.mPracticeRosterArray[i].players;
                                	button.setAttribute("id", id);
                        		button.onclick = this.mApplication.getCurrentScreen().setOneHit.bind(button);
					if (availability_id == 2)
                                	{
                                		button.style.backgroundColor = APPLICATION.mYellow;
                                	}
                                	this.mAvailabilityButtonArray.push(button);

                                	var button = document.createElement("BUTTON");
                                	button.setAttribute("class","availability-button");
                        		button.innerHTML = '' + this.mPracticeRosterArray[i].first_name + ' ' + this.mPracticeRosterArray[i].last_name;
                                	this.mTeamDiv.appendChild(button);
                        		var id = 'button_2_3_' + this.mJson.id + '_' + this.mPracticeRosterArray[i].players;
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
	}

	makeButtons()
	{
		var screen = APPLICATION.getCurrentScreen();

		for (var i = 0; i < screen.mGamesPlayersArray.length; i++)
		{
			var availability_id = null;

                       	if (this.mJson.type == 'game')
                        {
                                for (var a = 0; a < this.mApplication.getCurrentScreen().mGamesPlayerAvailabilityArray.length; a++)
                                {
                                        if (this.mApplication.getCurrentScreen().mGamesPlayerAvailabilityArray[a].game_id == this.mJson.id && this.mApplication.getCurrentScreen().mGamesPlayerAvailabilityArray[a].team_club_player_id == screen.mGamesPlayersArray[i].players )
                                        {
                                                availability_id = this.mApplication.getCurrentScreen().mGamesPlayerAvailabilityArray[a].availability_id;
                                        }
                                }

				if (this.mJson.id == screen.mGamesPlayersArray[i].game_id) 
				{

                                	var button = document.createElement("BUTTON");
                                	button.setAttribute("class","availability-button");
                                	button.innerHTML = '' + screen.mGamesPlayersArray[i].first_name + ' ' + screen.mGamesPlayersArray[i].last_name;
                                	this.mPlayerDiv.appendChild(button);
                                	var id = 'button_1_1_' + this.mJson.id + '_' + screen.mGamesPlayersArray[i].players;
                                	button.setAttribute("id", id);
                                	button.onclick = this.mApplication.getCurrentScreen().setOneHit.bind(button);
                        		if (availability_id == 1)
                                	{
                                       		button.style.backgroundColor = APPLICATION.mLawnGreen;
                                	}
					this.mAvailabilityButtonArray.push(button);


                                	var button = document.createElement("BUTTON");
                                	button.setAttribute("class","availability-button");
                                	button.innerHTML = '' + screen.mGamesPlayersArray[i].first_name + ' ' + screen.mGamesPlayersArray[i].last_name; 
                                	this.mPlayerDiv.appendChild(button);
                                	var id = 'button_1_2_' + this.mJson.id + '_' + screen.mGamesPlayersArray[i].players;
                                	button.setAttribute("id", id);
                                	button.onclick = this.mApplication.getCurrentScreen().setOneHit.bind(button);
                        		if (availability_id == 2)
                                	{
                                       		button.style.backgroundColor = APPLICATION.mYellow;
                                	}
                                	this.mAvailabilityButtonArray.push(button);

                                	var button = document.createElement("BUTTON");
                                	button.setAttribute("class","availability-button");
                                	button.innerHTML = '' + screen.mGamesPlayersArray[i].first_name + ' ' + screen.mGamesPlayersArray[i].last_name;
                                	this.mPlayerDiv.appendChild(button);
                                	var id = 'button_1_3_' + this.mJson.id + '_' + screen.mGamesPlayersArray[i].players;
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
//game_id, players
		for (var i = 0; i < screen.mPracticesPlayersArray.length; i++)
		{
			var availability_id = null;

			if (this.mJson.type == 'practice')
			{
				for (var a = 0; a < this.mApplication.getCurrentScreen().mPracticesPlayerAvailabilityArray.length; a++)
				{
					if (this.mApplication.getCurrentScreen().mPracticesPlayerAvailabilityArray[a].practice_id == this.mJson.id && this.mApplication.getCurrentScreen().mPracticesPlayerAvailabilityArray[a].team_club_player_id == screen.mPracticesPlayersArray[i].players )
					{
						availability_id = this.mApplication.getCurrentScreen().mPracticesPlayerAvailabilityArray[a].availability_id;	
					}
				}
				
				if (this.mJson.id == screen.mPracticesPlayersArray[i].practice_id) 
				{
        				var button = document.createElement("BUTTON");
                			button.setAttribute("class","availability-button");
                        		button.innerHTML = '' + screen.mPracticesPlayersArray[i].first_name + ' ' + screen.mPracticesPlayersArray[i].last_name;
                        		this.mPlayerDiv.appendChild(button);
                        		var id = 'button_2_1_' + this.mJson.id + '_' + screen.mPracticesPlayersArray[i].players;
                        		button.setAttribute("id", id);
                        		button.onclick = this.mApplication.getCurrentScreen().setOneHit.bind(button);
                        		if (availability_id == 1)
                        		{
                        			button.style.backgroundColor = APPLICATION.mLawnGreen;
                        		}
                        		this.mAvailabilityButtonArray.push(button);


                                	var button = document.createElement("BUTTON");
                                	button.setAttribute("class","availability-button");
                        		button.innerHTML = '' + screen.mPracticesPlayersArray[i].first_name + ' ' + screen.mPracticesPlayersArray[i].last_name;
                                	this.mPlayerDiv.appendChild(button);
                        		var id = 'button_2_2_' + this.mJson.id + '_' + screen.mPracticesPlayersArray[i].players;
                                	button.setAttribute("id", id);
                        		button.onclick = this.mApplication.getCurrentScreen().setOneHit.bind(button);
					if (availability_id == 2)
                                	{
                                		button.style.backgroundColor = APPLICATION.mYellow;
                                	}
                                	this.mAvailabilityButtonArray.push(button);

                                	var button = document.createElement("BUTTON");
                                	button.setAttribute("class","availability-button");
                        		button.innerHTML = '' + screen.mPracticesPlayersArray[i].first_name + ' ' + screen.mPracticesPlayersArray[i].last_name;
                                	this.mPlayerDiv.appendChild(button);
                        		var id = 'button_2_3_' + this.mJson.id + '_' + screen.mPracticesPlayersArray[i].players;
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
	}


        makeCard(div)
        {
                //put container..
                this.mCardDiv = document.createElement('div');
                this.mDivArray.push(this.mCardDiv);
                this.mCardDiv.setAttribute('class','card');
                div.appendChild(this.mCardDiv);
        }

	printToScreen(div)
	{
		if (this.mJson)
		{
			//put container..

			this.makeCard(div);
			this.makeContainer();

			this.makeTabs();

			//player div..
			this.mPlayerDiv = document.createElement('div');
			this.mContainerDiv.appendChild(this.mPlayerDiv);

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

