'use strict';

class Evento 
{
        constructor(application,jsonEvent)
        {
		this.mApplication = application;
		this.mJsonEvent = jsonEvent;

		this.mPlayerName = null;
		this.mParentName = null;
		this.mCoachName = null;
		this.mManagerName = null;
/*
		team_club_persons_club_players_id = null;
		team_club_persons_club_parents_id = null;
		team_club_persons_club_coaches_id = null;
		team_club_persons_club_managers_id = null;
*/

		this.mDivArray = new Array();

                this.mCardDiv = document.createElement('div');
                this.mDivArray.push(this.mCardDiv);
                this.mCardDiv.setAttribute('class','card');
                document.getElementById("upcoming_screen_col_6_html_id").appendChild(this.mCardDiv);

                this.mContainerDiv = document.createElement('div');
                this.mContainerDiv.setAttribute('class','container');
                this.mCardDiv.appendChild(this.mContainerDiv);

		this.mTitle = null;
		this.mTextArray = new Array();

		if (this.mJsonEvent)
		{

			if (this.mJsonEvent.event_date)
                	{
                		this.mTitle = document.createElement('h5');
                        	this.mContainerDiv.appendChild(this.mTitle);
			}
                        
			this.mTextArray = new Array();

                       	var p = document.createElement('p');
                       	this.mContainerDiv.appendChild(p);

                        if (this.mJsonEvent.first_name)
                        {
                        	//this.mTextArray.push('Player: ' + this.mEventsArray[i].first_name + ' ' + this.mEventsArray[i].last_name);
                                this.mTextArray.push('' + this.mJsonEvent.names);
                        }

                        if (this.mJsonEvent.arrival_time)
                        {
                        	var humanTime = this.mApplication.mTime.convertFromMilitaryToHuman(this.mJsonEvent.arrival_time);
                                this.mTextArray.push('Arrive by: ' + humanTime);
                        }

                        if (this.mJsonEvent.start_time)
                        {
                        	var humanTime = this.mApplication.mTime.convertFromMilitaryToHuman(this.mJsonEvent.start_time);
                                this.mTextArray.push('Start time: ' + humanTime);
                        }


                        if (this.mJsonEvent.end_time)
                        {
                        	var humanTime = this.mApplication.mTime.convertFromMilitaryToHuman(this.mJsonEvent.end_time);
                                this.mTextArray.push('End time: ' + humanTime);
                        }

                        if (this.mJsonEvent.address)
                        {
                                this.mTextArray.push('Address: ' + this.mJsonEvent.address);
                        }

                        if (this.mJsonEvent.coordinates)
                       	{
                                this.mTextArray.push('Coordinates: ' + this.mJsonEvent.coordinates);
                        }

                        if (this.mJsonEvent.pitch_name)
                        {
                                this.mTextArray.push('Pitch: ' + this.mJsonEvent.pitch_name);
                        }

                        if (this.mJsonEvent.field_name)
                        {
                                this.mTextArray.push('Field: ' + this.mJsonEvent.field_name);
                        }

                       	if (this.mJsonEvent.club_name)
                        {
                                this.mTextArray.push('Club: ' + this.mJsonEvent.club_name);
                        }

                        if (this.mJsonEvent.team_name)
                        {
                                this.mTextArray.push('Team: ' + this.mJsonEvent.team_name);
                        }

                        if (this.mJsonEvent.opponent)
                        {
                                this.mTextArray.push('Opponent: ' + this.mJsonEvent.opponent);
                        }

                        for (var r = 0; r < this.mTextArray.length; r++)
                        {
                                p.innerHTML = p.innerHTML + ' ' + this.mTextArray[r] + '<br>';
                        }
		}
	}
}

class Availability 
{
	constructor(application)
	{
		this.mAvailableButton      = document.createElement("BUTTON"); 
                this.mAvailableButton.setAttribute("class","availability-button");
                this.mAvailableButton.innerHTML = "Available";
                container.appendChild(button);
                                                var id = 'button_2_1_' + this.mEventsArray[i].id + '_' + this.mEventsArray[i].team_club_persons_club_players_id;
                                                button.setAttribute("id", id);
                                                button.onclick = this.setOneHit.bind(button);
                                                if (availability_id == 1)
                                                {
                                                        button.style.backgroundColor = "#4CAF50";
                                                }
                                                this.mButtonArray.push(button);



		this.mMaybeAvailableButton = document.createElement("BUTTON");
		this.mNotAvailableButton   = document.createElement("BUTTON");


	}
}

/*
                                                var button = document.createElement("BUTTON");
                                                button.setAttribute("class","availability-button");
                                                button.innerHTML = "Available";
                                                container.appendChild(button);
                                                var id = 'button_2_1_' + this.mEventsArray[i].id + '_' + this.mEventsArray[i].team_club_persons_club_players_id;
                                                button.setAttribute("id", id);
                                                button.onclick = this.setOneHit.bind(button);
                                                if (availability_id == 1)
                                                {
                                                        button.style.backgroundColor = "#4CAF50";
                                                }
                                                this.mButtonArray.push(button);

                                                var button = document.createElement("BUTTON");
                                                button.setAttribute("class","availability-button");
                                                button.innerHTML = "Maybe Available";
                                                container.appendChild(button);
                                                var id = 'button_2_2_' + this.mEventsArray[i].id + '_' + this.mEventsArray[i].team_club_persons_club_players_id;
                                                button.setAttribute("id", id);
                                                button.onclick = this.setOneHit.bind(button);
                                                if (availability_id == 2)
                                                {
                                                        button.style.backgroundColor = "yellow";
                                                }
                                                this.mButtonArray.push(button);

                                                var button = document.createElement("BUTTON");
                                                button.setAttribute("class","availability-button");
                                                button.innerHTML = "Not Available";
                                                container.appendChild(button);
                                                var id = 'button_2_3_' + this.mEventsArray[i].id + '_' + this.mEventsArray[i].team_club_persons_club_players_id;
                                                button.setAttribute("id", id);
                                                button.onclick = this.setOneHit.bind(button);
                                                if (availability_id == 3)
                                                {
                                                        button.style.backgroundColor = "red";
                                                }
                                                this.mButtonArray.push(button);
 
 */
