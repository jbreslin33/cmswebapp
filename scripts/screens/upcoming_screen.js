'use strict';

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

		this.mCloneArray = new Array();
		
		this.mCalendar = new Calendar();

		this.mEventsArray = new Array();

		//availability
		this.mAvailablePracticeArray = new Array();
		this.mAvailableGamesArray = new Array();
		this.mAvailablePracticeList = null;
		this.mAvailableGamesList = null;
		
		this.mNotAvailablePracticeArray = new Array();
		this.mNotAvailableGamesArray = new Array();
		this.mNotAvailablePracticeList = null;
		this.mNotAvailableGamesList = null;
		this.mMaybeAvailablePracticeList = null;
		this.mMaybeAvailableGamesList = null;

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
		this.mAvailableButtonArray = new Array();
		this.mNotAvailableButtonArray = new Array();
		this.mMaybeAvailableButtonArray = new Array();
		document.getElementById("upcoming_available_id").onclick = this.upcomingAvailableHit.bind(document.getElementById("upcoming_available_id"));
		document.getElementById("upcoming_not_available_id").onclick = this.upcomingNotAvailableHit.bind(document.getElementById("upcoming_not_available_id"));
		document.getElementById("upcoming_maybe_available_id").onclick = this.upcomingMaybeAvailableHit.bind(document.getElementById("upcoming_maybe_available_id"));
        }

        get()
        {
		super.get();
		APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/upcoming.php?jwt=" + APPLICATION.getJWT() + '&first_day_of_query=' + this.mFirstDayOfQuery + '&last_day_of_query=' + this.mLastDayOfQuery);

                APPLICATION.getCurrentScreen().ajax();
        }

	upcomingAvailableHit()
	{
		//set this one
		this.style.backgroundColor = "#4CAF50"; 

		//set others back to blue
		document.getElementById("upcoming_not_available_id").style.backgroundColor = "#33b5e5";
		document.getElementById("upcoming_maybe_available_id").style.backgroundColor = "#33b5e5";

		for (var i = 0; i < APPLICATION.getCurrentScreen().mAvailableButtonArray.length; i++)
		{
			APPLICATION.getCurrentScreen().mAvailableButtonArray[i].style.backgroundColor = "#4CAF50";
			APPLICATION.getCurrentScreen().mNotAvailableButtonArray[i].style.backgroundColor = "#33b5e5"; 
			APPLICATION.getCurrentScreen().mMaybeAvailableButtonArray[i].style.backgroundColor = "#33b5e5";  
		}
	}
	upcomingNotAvailableHit()
	{
		//set this one
		this.style.backgroundColor = "red"; 
		
		//set others back to blue
		document.getElementById("upcoming_available_id").style.backgroundColor = "#33b5e5";
		document.getElementById("upcoming_maybe_available_id").style.backgroundColor = "#33b5e5";
		
		for (var i = 0; i < APPLICATION.getCurrentScreen().mNotAvailableButtonArray.length; i++)
		{
			APPLICATION.getCurrentScreen().mAvailableButtonArray[i].style.backgroundColor = "#33b5e5";
			APPLICATION.getCurrentScreen().mNotAvailableButtonArray[i].style.backgroundColor = "red"; 
			APPLICATION.getCurrentScreen().mMaybeAvailableButtonArray[i].style.backgroundColor = "#33b5e5";  
		}
	}
	
	upcomingMaybeAvailableHit()
	{
		//set this one
		this.style.backgroundColor = "yellow"; 

		//set others back to blue
		document.getElementById("upcoming_available_id").style.backgroundColor = "#33b5e5";
		document.getElementById("upcoming_not_available_id").style.backgroundColor = "#33b5e5";
		
		for (var i = 0; i < APPLICATION.getCurrentScreen().mMaybeAvailableButtonArray.length; i++)
		{
			APPLICATION.getCurrentScreen().mAvailableButtonArray[i].style.backgroundColor = "#33b5e5";
			APPLICATION.getCurrentScreen().mNotAvailableButtonArray[i].style.backgroundColor = "#33b5e5";  
			APPLICATION.getCurrentScreen().mMaybeAvailableButtonArray[i].style.backgroundColor = "yellow"; 
		}
	}

	resetLists()
	{
		this.mAvailablePracticeList = null;
		this.mAvailableGamesList = null;
		this.mNotAvailablePracticeList = null;
		this.mNotAvailableGamesList = null;
		this.mMaybeAvailablePracticeList = null;
		this.mMabyeAvailableGamesList = null;
	}

	availabilitybuttonhit()
	{
		APPLICATION.getCurrentScreen().resetLists();
		var a = this.id.split('_');
		var id = 0;
		var availabilityTxt = null;
		if (a.length > 1)
		{
			if (a[0] == 'Practice')
			{
				availabilityTxt = a[1];	
				id = a[2];	
				
				if (availabilityTxt == 'available')
				{
					APPLICATION.getCurrentScreen().mAvailablePracticeList = id;
					document.getElementById('Practice_available_' + id).style.backgroundColor = "#4CAF50"; 		
					document.getElementById('Practice_not_' + id).style.backgroundColor = "#33b5e5"; 		
					document.getElementById('Practice_maybe_' + id).style.backgroundColor = "#33b5e5"; 		
				}
				if (availabilityTxt == 'not')
				{
					APPLICATION.getCurrentScreen().mNotAvailablePracticeList = id;
					document.getElementById('Practice_available_' + id).style.backgroundColor = "#33b5e5"; 		
					document.getElementById('Practice_not_' + id).style.backgroundColor = "red"; 		
					document.getElementById('Practice_maybe_' + id).style.backgroundColor = "#33b5e5"; 		
				}
				if (availabilityTxt == 'maybe')
				{
					APPLICATION.getCurrentScreen().mMaybeAvailablePracticeList = id;
					document.getElementById('Practice_available_' + id).style.backgroundColor = "#33b5e5"; 		
					document.getElementById('Practice_not_' + id).style.backgroundColor = "#33b5e5"; 		
					document.getElementById('Practice_maybe_' + id).style.backgroundColor = "yellow"; 		
				}
			}

			if (a[0] == 'Game')
			{
				availabilityTxt = a[1];	
				id = a[2];	
				
				if (availabilityTxt == 'available')
				{
					APPLICATION.getCurrentScreen().mAvailableGameList = id;
				}
				if (availabilityTxt == 'not')
				{
					APPLICATION.getCurrentScreen().mNotAvailableGameList = id;
				}
				if (availabilityTxt == 'maybe')
				{
					APPLICATION.getCurrentScreen().mMaybeAvailableGameList = id;
				}
			}
		}

		//send to server
		APPLICATION.getCurrentScreen().updateAvailability();
	}

	updateAvailability()
	{
		APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/upcoming_availability.php?jwt=" + APPLICATION.getJWT() + '&available_practice=' + this.mAvailablePracticeList + '&available_games=' + this.mAvailableGamesList + '&not_available_practice=' + this.mNotAvailablePracticeList + '&not_available_games=' + this.mNotAvailableGamesList + '&maybe_available_practice=' + this.mMaybeAvailablePracticeList + '&maybe_available_games=' + this.mMaybeAvailableGamesList);
		console.log('getUrl:' + APPLICATION.getCurrentScreen().getUrl());

                //APPLICATION.getCurrentScreen().ajax();
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
				div.setAttribute('class','card');
				document.getElementById("upcoming_screen_html_id").appendChild(div);

				//add to array
				this.mCloneArray.push(div);

				var container = document.createElement('div');
				container.setAttribute('class','container');
				div.appendChild(container);

				if (this.mEventsArray[i].event_date)
				{
					var title = document.createElement('h5');
					container.appendChild(title);
					
					if (this.mEventsArray[i].type == 'game')
					{
						title.innerHTML = 'Game: ' + this.mApplication.mCalendar.convertDate(this.mEventsArray[i].event_date);

						var buttonAvailable = document.createElement("BUTTON");
						buttonAvailable.setAttribute("class","availability-button");
						buttonAvailable.innerHTML = "Available";
						container.appendChild(buttonAvailable);
						var id = 'Game_available_' + this.mEventsArray[i].id;
  						buttonAvailable.setAttribute("id", id);
			 			buttonAvailable.onclick = this.availabilitybuttonhit.bind(buttonAvailable);
						this.mAvailabileButtonArray.push(buttonAvailable);
					
						var buttonNotAvailable = document.createElement("BUTTON");
						buttonNotAvailable.setAttribute("class","availability-button");
						buttonNotAvailable.innerHTML = "Not Available";
						container.appendChild(buttonNotAvailable);
						var id = 'Game_not_' + this.mEventsArray[i].id;
  						buttonNotAvailable.setAttribute("id", id);
			 			buttonNotAvailable.onclick = this.availabilitybuttonhit.bind(buttonNotAvailable);
						this.mNotAvailableButtonArray.push(buttonNotAvailable);
						
						var buttonMaybeAvailable = document.createElement("BUTTON");
						buttonMaybeAvailable.setAttribute("class","availability-button");
						buttonMaybeAvailable.innerHTML = "Maybe Available";
						container.appendChild(buttonMaybeAvailable);
						var id = 'Game_maybe_' + this.mEventsArray[i].id;
  						buttonMaybeAvailable.setAttribute("id", id);
			 			buttonMaybeAvailable.onclick = this.availabilitybuttonhit.bind(buttonMaybeAvailable);
						this.mMaybeAvailabeButtonArray.push(buttonMaybeAvailable);
					}
					if (this.mEventsArray[i].type == 'practice')
					{
						title.innerHTML = 'Practice: ' + this.mApplication.mCalendar.convertDate(this.mEventsArray[i].event_date);
						
						var buttonAvailable = document.createElement("BUTTON");
						buttonAvailable.setAttribute("class","availability-button");
						buttonAvailable.innerHTML = "Available";
						container.appendChild(buttonAvailable);
						var id = 'Practice_available_' + this.mEventsArray[i].id;
  						buttonAvailable.setAttribute("id", id);
			 			buttonAvailable.onclick = this.availabilitybuttonhit.bind(buttonAvailable);
						this.mAvailableButtonArray.push(buttonAvailable);
					
						var buttonNotAvailable = document.createElement("BUTTON");
						buttonNotAvailable.setAttribute("class","availability-button");
						buttonNotAvailable.innerHTML = "Not Available";
						container.appendChild(buttonNotAvailable);
						var id = 'Practice_not_' + this.mEventsArray[i].id;
  						buttonNotAvailable.setAttribute("id", id);
			 			buttonNotAvailable.onclick = this.availabilitybuttonhit.bind(buttonNotAvailable);
						this.mNotAvailableButtonArray.push(buttonNotAvailable);
						
						var buttonMaybeAvailable = document.createElement("BUTTON");
						buttonMaybeAvailable.setAttribute("class","availability-button");
						buttonMaybeAvailable.innerHTML = "Maybe Available";
						container.appendChild(buttonMaybeAvailable);
						var id = 'Practice_maybe_' + this.mEventsArray[i].id;
  						buttonMaybeAvailable.setAttribute("id", id);
			 			buttonMaybeAvailable.onclick = this.availabilitybuttonhit.bind(buttonMaybeAvailable);
						this.mMaybeAvailableButtonArray.push(buttonMaybeAvailable);
					}
				}
				
				
				var textArray = new Array();
				
				var p = document.createElement('p');
				container.appendChild(p);

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
