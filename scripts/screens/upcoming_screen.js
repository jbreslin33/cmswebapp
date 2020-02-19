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

class UpcomingScreen extends Screen
{
        constructor(application)
        {
                super(application);
               	
		location.hash = 'upcoming_screen';

		this.setHtml(document.getElementById("upcoming_screen_html_id"));
                this.setMessageElement(document.getElementById("upcoming_screen_message_id"));
                this.setSpinner(document.getElementById("upcoming_screen_spinner_id"));
                this.setForm(document.getElementById("upcoming_screen_form_id"));

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

		document.getElementById("upcoming_available_id").onclick = this.setAllHit.bind(document.getElementById("upcoming_available_id"));
		document.getElementById("upcoming_not_available_id").onclick = this.setAllHit.bind(document.getElementById("upcoming_not_available_id"));
		document.getElementById("upcoming_maybe_available_id").onclick = this.setAllHit.bind(document.getElementById("upcoming_maybe_available_id"));
        }

        get()
        {
		super.get();
		APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/upcoming.php?jwt=" + APPLICATION.getJWT() + '&first_day_of_query=' + this.mFirstDayOfQuery + '&last_day_of_query=' + this.mLastDayOfQuery);
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

	setAllHit()
	{
		var screen = APPLICATION.getCurrentScreen();
		screen.resetLists();
		
		if (this.id == "upcoming_available_id")
		{
			//set this one
			this.style.backgroundColor = "#4CAF50"; 

			//set others back to blue
			document.getElementById("upcoming_not_available_id").style.backgroundColor = "#33b5e5";
			document.getElementById("upcoming_maybe_available_id").style.backgroundColor = "#33b5e5";
		
			for (var i = 0; i < screen.mButtonArray.length; i++)
			{
				var id = screen.mButtonArray[i].id.split('_');;
				if (id[2] == 1)
				{
					//give active color and add to array
					screen.mButtonArray[i].style.backgroundColor = "#4CAF50";
					screen.mAvailabilityArray.push(id[1]);
					screen.mAvailabilityArray.push(id[2]);
					screen.mAvailabilityArray.push(id[3]);
					screen.mAvailabilityArray.push(id[4]);
				}
				if (id[2] == 2 || id[2] == 3)
				{
					screen.mButtonArray[i].style.backgroundColor = "#33b5e5"; 
				}
			}
		}

                if (this.id == "upcoming_maybe_available_id")
                {
                        //set this one
                        this.style.backgroundColor = "yellow";

                        //set others back to blue
                        document.getElementById("upcoming_available_id").style.backgroundColor = "#33b5e5";
                        document.getElementById("upcoming_not_available_id").style.backgroundColor = "#33b5e5";

                        for (var i = 0; i < screen.mButtonArray.length; i++)
                        {
                                var id = screen.mButtonArray[i].id.split('_');
                                if (id[2] == 2)
                                {
					//give active color and add to array
                                        screen.mButtonArray[i].style.backgroundColor = "yellow";
                                	screen.mAvailabilityArray.push(id[1]);
                                	screen.mAvailabilityArray.push(id[2]);
                                	screen.mAvailabilityArray.push(id[3]);
                                	screen.mAvailabilityArray.push(id[4]);
                                }
                                if (id[2] == 1 || id[2] == 3)
                                {
                                        screen.mButtonArray[i].style.backgroundColor = "#33b5e5";
                                }
                        }
                }

		if (this.id == "upcoming_not_available_id")
                {
                        //set this one
                        this.style.backgroundColor = "red";

                        //set others back to blue
                        document.getElementById("upcoming_available_id").style.backgroundColor = "#33b5e5";
                        document.getElementById("upcoming_maybe_available_id").style.backgroundColor = "#33b5e5";

                        for (var i = 0; i < screen.mButtonArray.length; i++)
                        {
                                var id = screen.mButtonArray[i].id.split('_');;
                                if (id[2] == 3)
                                {
					//give active color and add to array
                                        screen.mButtonArray[i].style.backgroundColor = "red";
                                	screen.mAvailabilityArray.push(id[1]);
                                	screen.mAvailabilityArray.push(id[2]);
                                	screen.mAvailabilityArray.push(id[3]);
                                	screen.mAvailabilityArray.push(id[4]);
                                }
                                if (id[2] == 1 || id[2] == 2)
                                {
                                        screen.mButtonArray[i].style.backgroundColor = "#33b5e5";
                                }
                        }
                }

		screen.mAvailabilityList = screen.mAvailabilityArray.join();
		screen.updateAvailability()
	}

	resetLists()
	{
		this.mAvailabilityList = null;
		this.mAvailabilityArray.length = 0;
	}

	setOneHit()
	{
		var screen = APPLICATION.getCurrentScreen();
		screen.resetLists();

		var a = this.id.split('_');
		var id = 0;
		var availabilityTxt = null;
		if (a.length > 1)
		{
			//game
			if (a[1] == 1)
			{
				if (a[2] == 1)
				{
					document.getElementById('button_1_1_' + a[3] + '_' + a[4]).style.backgroundColor = "#4CAF50"; 		
					document.getElementById('button_1_2_' + a[3] + '_' + a[4]).style.backgroundColor = "#33b5e5"; 		
					document.getElementById('button_1_3_' + a[3] + '_' + a[4]).style.backgroundColor = "#33b5e5"; 		
				}
				if (a[2] == 2)
				{
					document.getElementById('button_1_1_' + a[3] + '_' + a[4]).style.backgroundColor = "#33b5e5"; 		
					document.getElementById('button_1_2_' + a[3] + '_' + a[4]).style.backgroundColor = "yellow"; 		
					document.getElementById('button_1_3_' + a[3] + '_' + a[4]).style.backgroundColor = "#33b5e5"; 		
				}
				if (a[2] == 3)
				{
					document.getElementById('button_1_1_' + a[3] + '_' + a[4]).style.backgroundColor = "#33b5e5"; 		
					document.getElementById('button_1_2_' + a[3] + '_' + a[4]).style.backgroundColor = "#33b5e5"; 		
					document.getElementById('button_1_3_' + a[3] + '_' + a[4]).style.backgroundColor = "red"; 		
				}
			}

			//practice
			if (a[1] == 2)
			{
				if (a[2] == 1)
				{
					document.getElementById('button_2_1_' + a[3] + '_' + a[4]).style.backgroundColor = "#4CAF50"; 		
					document.getElementById('button_2_2_' + a[3] + '_' + a[4]).style.backgroundColor = "#33b5e5"; 		
					document.getElementById('button_2_3_' + a[3] + '_' + a[4]).style.backgroundColor = "#33b5e5"; 		
				}
				if (a[2] == 2)
				{
					document.getElementById('button_2_1_' + a[3] + '_' + a[4]).style.backgroundColor = "#33b5e5"; 		
					document.getElementById('button_2_2_' + a[3] + '_' + a[4]).style.backgroundColor = "yellow"; 		
					document.getElementById('button_2_3_' + a[3] + '_' + a[4]).style.backgroundColor = "#33b5e5"; 		
				}
				if (a[2] == 3)
				{
					document.getElementById('button_2_1_' + a[3] + '_' + a[4]).style.backgroundColor = "#33b5e5"; 		
					document.getElementById('button_2_2_' + a[3] + '_' + a[4]).style.backgroundColor = "#33b5e5"; 		
					document.getElementById('button_2_3_' + a[3] + '_' + a[4]).style.backgroundColor = "red"; 		
				}
			}

			screen.mAvailabilityList = a[1] + ',' + a[2] + ',' + a[3] + ',' + a[4];
		}
		//send to server
		screen.updateAvailability();
	}

	updateAvailability()
	{
                var screen = APPLICATION.getCurrentScreen();
		screen.setUrl("/php/classes/screens/upcoming_availability.php?jwt=" + APPLICATION.getJWT() + '&availability=' + this.mAvailabilityList);
		console.log('url:' + screen.getUrl());
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
						console.log('availability_id:' + this.mEventsArray[i].availability_id);
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
