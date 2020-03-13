'use strict';

					/*
					 *
					 
					  4 data points
					  ----------------
					  game:     1
					  practice: 2

				          --------------	
					  available: 1
					  maybe:     2 
					  not:       3 

					  ---------------------
					  game or practice id:
					 
					  --------------------
					  player id:	 
					  */

class ProfileScreen extends Screen
{
        constructor(application)
        {
                super(application);
               	
		location.hash = 'profile_screen';

		this.setHtml(document.getElementById("profile_screen_html_id"));
                this.setMessageElement(document.getElementById("profile_screen_message_id"));
                this.setSpinner(document.getElementById("profile_screen_spinner_id"));
                this.setForm(document.getElementById("profile_screen_form_id"));

		this.mCalendar = new Calendar();

		this.mDivArray = new Array();

		this.mEventsArray = new Array();

		//availability
		this.mAvailabilityArray = new Array();
		this.mAvailabilityList = null;

		//now
                var current_date = new Date();
                var current_month = current_date.getMonth();
                var current_year = current_date.getYear();
                current_year = parseInt(current_year + 1900);
                var current_string = parseInt(current_date.getYear() + 1900) + '-' + parseInt(current_date.getMonth() + 1) + '-' + current_date.getDate();
                var current_date_string = this.mCalendar.inflateDateString(current_string);

		//7 days from now
		var future_date = new Date();
		future_date.setDate(future_date.getDate() + 5000); //over 10 years
                var future_month = future_date.getMonth();
                var future_year = future_date.getYear();
                var future_string = parseInt(future_date.getYear() + 1900) + '-' + parseInt(future_date.getMonth() + 1) + '-' + future_date.getDate();
                var future_date_string = this.mCalendar.inflateDateString(future_string);

		//temp until we write date functions
		this.mFirstDayOfQuery = current_date_string;
		this.mLastDayOfQuery = future_date_string;
	
		//checkboxes at top for multiple availabilities
		this.mButtonArray = new Array();

		this.mPlayerButton = document.getElementById("profile_player_id");
		this.mParentButton = document.getElementById("profile_parent_id");
		this.mCoachButton = document.getElementById("profile_coach_id");
		this.mManagerButton = document.getElementById("profile_manager_id");
		this.mAdministratorButton = document.getElementById("profile_administrator_id");
		
		this.mPlayerButton.onclick = this.hit.bind(this.mPlayerButton);
		this.mParentButton.onclick = this.hit.bind(this.mParentButton);
		this.mCoachButton.onclick = this.hit.bind(this.mCoachButton);
		this.mManagerButton.onclick = this.hit.bind(this.mManagerButton);
		this.mAdministratorButton.onclick = this.hit.bind(this.mAdministratorButton);
		
		this.mPlayerButton.style.backgroundColor = "red";
		this.mParentButton.style.backgroundColor = "red";
		this.mCoachButton.style.backgroundColor = "red";
		this.mManagerButton.style.backgroundColor = "red";
		this.mAdministratorButton.style.backgroundColor = "red";
        }

        get()
        {
		super.get();
		APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/profile.php?" + this.getStandardParameters());
                APPLICATION.getCurrentScreen().ajax();
        }

	exit()
	{
		this.removeDivs();
		super.exit();
	}
	
	removeDivs()
	{
		for (var i = 0; i < APPLICATION.getCurrentScreen().mDivArray.length; i++)
		{
                        APPLICATION.getCurrentScreen().mDivArray[i].remove();
		}
	}

	//lightUp(button

	resetLists()
	{
		this.mAvailabilityList = null;
		this.mAvailabilityArray.length = 0;
	}

	hit()
	{
		var screen = APPLICATION.getCurrentScreen();
		screen.resetLists();

		var a = this.id.split('_');
		var profileType = a[1]; 
		var id = 0;
		var availabilityTxt = null;

		//document.getElementById('button_1_1_' + a[3] + '_' + a[4]).style.backgroundColor = "#4CAF50"; 		
		if (this.style.backgroundColor == "green")
		{
			this.style.backgroundColor = "red";
		}
		else
		{
			this.style.backgroundColor = "green";
		}

		//screen.mAvailabilityList = a[1] + ',' + a[2] + ',' + a[3] + ',' + a[4];
		//send to server
		//screen.updateAvailability();
	}

	updateAvailability()
	{
                var screen = APPLICATION.getCurrentScreen();
		screen.setUrl("/php/classes/screens/upcoming_availability.php?jwt=" + APPLICATION.getJWT() + '&availability=' + this.mAvailabilityList);
                screen.ajax();
	}

        processJsonData()
	{
		super.processJsonData();

		this.mEventsArray.length = 0;

		//make new array containing games and practices together
		if (this.mJson)
		{
                	if (this.mJson.practices)
			{
                        	for (var i = 0; i < this.mJson.practices.length; i++)
				{
					this.mEventsArray.push(this.mJson.practices[i]);
					this.mJson.practices[i].type = 'practice';
				}
			}

			if (this.mJson.games)
			{
                       		for (var i = 0; i < this.mJson.games.length; i++)
				{
					this.mEventsArray.push(this.mJson.games[i]);
					this.mJson.games[i].type = 'game';
				}
			}
		}

		//sort this.mEventsArray by date and arrival time
		this.mEventsArray.sort
		(
			function(a, b)
			{
				var d = new Date(a.event_date) - new Date(b.event_date)
				if (d != 0)
				{
					return d;	
				}
				return new Date('1970/01/01 ' + a.arrival_time) - new Date('1970/01/01 ' + b.arrival_time); 
			}
		);

		//lets set message at top that there is a schedule
		if (this.mEventsArray.length > 0)
		{
			this.setMessage('Upcoming schedule', 'black'); 
		}
		else
		{
			this.setMessage('You have no events upcoming. Enjoy the time off.', 'black'); 
		}

		//print to screen
		if (this.mEventsArray)
                {
                        for (var i = 0; i < this.mEventsArray.length; i++)
                        {

				var div = document.createElement('div');	
				this.mDivArray.push(div);
				div.setAttribute('class','card');
				document.getElementById("upcoming_screen_html_id").appendChild(div);

				var container = document.createElement('div');
				container.setAttribute('class','container');
				div.appendChild(container);

				if (this.mEventsArray[i].event_date)
				{
					var title = document.createElement('h5');
					container.appendChild(title);
						
					var availability_id = this.mEventsArray[i].availability_id;
					
					if (this.mEventsArray[i].type == 'game')
					{
						title.innerHTML = 'Game: ' + this.mApplication.mCalendar.convertDate(this.mEventsArray[i].event_date);

						var button = document.createElement("BUTTON");
                                                button.setAttribute("class","availability-button");
                                                button.innerHTML = "Available";
                                                container.appendChild(button);
                                                var id = 'button_1_1_' + this.mEventsArray[i].id + '_' + this.mEventsArray[i].team_club_persons_club_players_id;
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
                                                var id = 'button_1_2_' + this.mEventsArray[i].id + '_' + this.mEventsArray[i].team_club_persons_club_players_id;
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
                                                var id = 'button_1_3_' + this.mEventsArray[i].id + '_' + this.mEventsArray[i].team_club_persons_club_players_id;
                                                button.setAttribute("id", id);
                                                button.onclick = this.setOneHit.bind(button);
						if (availability_id == 3)
						{
							button.style.backgroundColor = "red";
						}
                                                this.mButtonArray.push(button);
					}

					if (this.mEventsArray[i].type == 'practice')
					{
						title.innerHTML = 'Practice: ' + this.mApplication.mCalendar.convertDate(this.mEventsArray[i].event_date);
						
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
					}
				}
				
				
				var textArray = new Array();
				
				var p = document.createElement('p');
				container.appendChild(p);
				
				if (this.mEventsArray[i].first_name) 
				{
					textArray.push('Player: ' + this.mEventsArray[i].first_name + ' ' + this.mEventsArray[i].last_name);
				}

				if (this.mEventsArray[i].arrival_time)
				{
					var humanTime = this.mApplication.mTime.convertFromMilitaryToHuman(this.mEventsArray[i].arrival_time);
					textArray.push('Arrive by: ' + humanTime);
				}
				
				if (this.mEventsArray[i].start_time)
				{
					var humanTime = this.mApplication.mTime.convertFromMilitaryToHuman(this.mEventsArray[i].start_time);
					textArray.push('Start time: ' + humanTime);
				}
				
				if (this.mEventsArray[i].end_time)
				{
					var humanTime = this.mApplication.mTime.convertFromMilitaryToHuman(this.mEventsArray[i].end_time);
					textArray.push('End time: ' + humanTime);
				}
				
				if (this.mEventsArray[i].address)
				{
					textArray.push('Address: ' + this.mEventsArray[i].address);
				}

				if (this.mEventsArray[i].coordinates)
				{
					textArray.push('Coordinates: ' + this.mEventsArray[i].coordinates);
				}
				
				if (this.mEventsArray[i].pitch_name)
				{
					textArray.push('Pitch: ' + this.mEventsArray[i].pitch_name);
				}
				
				if (this.mEventsArray[i].field_name)
				{
					textArray.push('Field: ' + this.mEventsArray[i].field_name);
				}
				
				if (this.mEventsArray[i].club_name)
				{
					textArray.push('Club: ' + this.mEventsArray[i].club_name);
				}
				
				if (this.mEventsArray[i].team_name)
				{
					textArray.push('Team: ' + this.mEventsArray[i].team_name);
				}
				
				if (this.mEventsArray[i].opponent)
				{
					textArray.push('Opponent: ' + this.mEventsArray[i].opponent);
				}

				for (var r = 0; r < textArray.length; r++)
				{
					p.innerHTML = p.innerHTML + ' ' + textArray[r] + '<br>';	
				}
                        }
                }
	}
}
