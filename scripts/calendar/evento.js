'use strict';

class Evento 
{
        constructor(application,jsonEvent)
        {
		this.mApplication = application;
		this.mJsonEvent = jsonEvent;

		this.mDivArray = new Array();

                this.mCardDiv = document.createElement('div');
                this.mDivArray.push(this.mCardDiv);
                this.mCardDiv.setAttribute('class','card');
                document.getElementById("upcoming_screen_col_6_html_id").appendChild(this.mCardDiv);

                this.mContainerDiv = document.createElement('div');
                this.mContainerDiv.setAttribute('class','container');
                this.mCardDiv.appendChild(this.mContainerDiv);
                this.mDivArray.push(this.mContainerDiv);

		this.mTitle = null;
		this.mTextArray = new Array();

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

		this.mButtonArray = new Array();

	}

	removeDivs()
	{
		for (var x = 0; x < this.mDivArray.length; x++)
                {
                	console.log('remove:' + x);
                       	this.mDivArray[x].remove();
                }
	}


	makeButtons()
	{
		for (var i = 0; i < this.mPlayerIdArray.length; i++)
		{
			if (this.mJsonEvent.type == 'practice')
			{
                       		var p = document.createElement('p');
                       		this.mContainerDiv.appendChild(p);
				p.innerHTML = this.mPlayerNameArray[i] + '<br>';

        			var button = document.createElement("BUTTON");
                		button.setAttribute("class","availability-button");
                        	button.innerHTML = "Going";
                        	this.mContainerDiv.appendChild(button);
                        	var id = 'button_2_1_' + this.mJsonEvent.id + '_' + this.mPlayerIdArray[i];
                        	button.setAttribute("id", id);
                        	button.onclick = this.mApplication.getCurrentScreen().setOneHit.bind(button);
                        	if (this.mAvailabilityIdArray[i] == 1)
                        	{
                        		button.style.backgroundColor = "#4CAF50";
                        	}
                        	this.mButtonArray.push(button);


                                var button = document.createElement("BUTTON");
                                button.setAttribute("class","availability-button");
                                button.innerHTML = "Maybe Going";
                                this.mContainerDiv.appendChild(button);
                        	var id = 'button_2_2_' + this.mJsonEvent.id + '_' + this.mPlayerIdArray[i];
                                button.setAttribute("id", id);
                        	button.onclick = this.mApplication.getCurrentScreen().setOneHit.bind(button);
                        	if (this.mAvailabilityIdArray[i] == 2)
                                {
                                	button.style.backgroundColor = "yellow";
                                }
                                this.mButtonArray.push(button);

                                var button = document.createElement("BUTTON");
                                button.setAttribute("class","availability-button");
                                button.innerHTML = "Not Going";
                                this.mContainerDiv.appendChild(button);
                        	var id = 'button_2_3_' + this.mJsonEvent.id + '_' + this.mPlayerIdArray[i];
                                button.setAttribute("id", id);
                        	button.onclick = this.mApplication.getCurrentScreen().setOneHit.bind(button);
                        	if (this.mAvailabilityIdArray[i] == 3)
                                {
                                	button.style.backgroundColor = "red";
                                }
                                this.mButtonArray.push(button);

                       		
				var p = document.createElement('p');
                       		this.mContainerDiv.appendChild(p);
				p.innerHTML = '<br>';
			}
		}

	}

	printToScreen()
	{
		if (this.mJsonEvent)
		{

			if (this.mJsonEvent.event_date)
                	{
                		this.mTitle = document.createElement('h5');
                        	this.mContainerDiv.appendChild(this.mTitle);
			}

			this.mTitle.innerHTML = 'Practice: ' + this.mApplication.mCalendar.convertDate(this.mJsonEvent.event_date);
                       	

			this.mTextArray = new Array();
                       	var p = document.createElement('p');

                        if (this.mJsonEvent.first_name)
                        {
                        	//this.mTextArray.push('Player: ' + this.mEventsArray[i].first_name + ' ' + this.mEventsArray[i].last_name);
                                this.mTextArray.push('' + this.mJsonEvent.names);
                        }
			
			console.log('make ' + this.mPlayerIdArray.length + ' buttons');
			this.makeButtons();

                        

                       	this.mContainerDiv.appendChild(p);


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

