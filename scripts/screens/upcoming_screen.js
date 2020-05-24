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

		this.mEventsArray = new Array();
		this.mEventoArray = new Array();
		this.mSmashEventoArray = new Array();

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

		//10 years from now
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
		//loop thru eventos Array
		for (var i = 0; i < this.mSmashEventoArray.length; i++)
		{
			this.mSmashEventoArray[i].removeDivs();
		}
	}

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
                screen.ajax();
	}

        processJsonData()
	{
		console.log('process again');
		//this.removeDivs();
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

		if (this.mEventsArray.length > 0)
		{

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

			//you should manipulate here after making them classes????
			//
			if (this.mEventsArray)
			{
                		for (var i = 0; i < this.mEventsArray.length; i++)
				{
					var evento = new Evento(this.mApplication,this.mEventsArray[i]);
					this.mEventoArray.push(evento);
				}
			}		

			//lets set message to black  and null
			this.setMessage('', 'black'); 

			//smash eventos
			for (var e = 0; e < this.mEventoArray.length; e++)
			{
				//add to smash array if not added already..
				var dup = false;
				for (var s = 0; s < this.mSmashEventoArray.length; s++)
				{
					if (this.mEventoArray[e].mJsonEvent.id == this.mSmashEventoArray[s].mJsonEvent.id && this.mEventoArray[e].mJsonEvent.type == 'practice' && this.mSmashEventoArray[s].mJsonEvent.type == 'practice')
					{
						dup = true;	
					
						if (this.mEventoArray[e].mJsonEvent.players  != null)
						{
							this.mSmashEventoArray[s].mPlayerIdArray.push(this.mEventoArray[e].mJsonEvent.players);
							this.mSmashEventoArray[s].mPlayerNameArray.push(this.mEventoArray[e].mJsonEvent.first_name + ' ' + this.mEventoArray[e].mJsonEvent.last_name);
							this.mSmashEventoArray[s].mAvailabilityIdArray.push(this.mEventoArray[e].mJsonEvent.availability_id);
						}
						if (this.mEventoArray[e].mJsonEvent.parents  != null)
						{
							this.mSmashEventoArray[s].mParentIdArray.push(this.mEventoArray[e].mJsonEvent.parents);
							this.mSmashEventoArray[s].mParentNameArray.push(this.mEventoArray[e].mJsonEvent.first_name + ' ' + this.mEventoArray[e].mJsonEvent.last_name);
						}
						if (this.mEventoArray[e].mJsonEvent.coaches  != null)
						{
							this.mSmashEventoArray[s].mCoachIdArray.push(this.mEventoArray[e].mJsonEvent.players);
							this.mSmashEventoArray[s].mCoachNameArray.push(this.mEventoArray[e].mJsonEvent.first_name + ' ' + this.mEventoArray[e].mJsonEvent.last_name);
						}
						if (this.mEventoArray[e].mJsonEvent.managers  != null)
						{
							this.mSmashEventoArray[s].mManagerIdArray.push(this.mEventoArray[e].mJsonEvent.players);
							this.mSmashEventoArray[s].mManagerNameArray.push(this.mEventoArray[e].mJsonEvent.first_name + ' ' + this.mEventoArray[e].mJsonEvent.last_name);
						}
					}
				}

				if (dup == false)
				{
                        		if (this.mEventoArray[e].mJsonEvent.players != null)
                                	{
                                       		this.mEventoArray[e].mPlayerIdArray.push(this.mEventoArray[e].mJsonEvent.players);
                                        	this.mEventoArray[e].mPlayerNameArray.push(this.mEventoArray[e].mJsonEvent.first_name + ' ' + this.mEventoArray[e].mJsonEvent.last_name);
						this.mEventoArray[e].mAvailabilityIdArray.push(this.mEventoArray[e].mJsonEvent.availability_id);
                                	}
                                	if (this.mEventoArray[e].mJsonEvent.parents  != null)
                                	{
                                        	this.mEventoArray[e].mParentIdArray.push(this.mEventoArray[e].mJsonEvent.parents);
                                        	this.mEventoArray[e].mParentNameArray.push(this.mEventoArray[e].mJsonEvent.first_name + ' ' + this.mEventoArray[e].mJsonEvent.last_name);
                                	}
                                	if (this.mEventoArray[e].mJsonEvent.coaches  != null)
                                	{
                                        	this.mEventoArray[e].mCoachIdArray.push(this.mEventoArray[e].mJsonEvent.coaches);
                                        	this.mEventoArray[e].mCoachNameArray.push(this.mEventoArray[e].mJsonEvent.first_name + ' ' + this.mEventoArray[e].mJsonEvent.last_name);
                                	}
                                	if (this.mEventoArray[e].mJsonEvent.managers  != null)
                                	{
                                       		this.mEventoArray[e].mManagerIdArray.push(this.mEventoArray[e].mJsonEvent.managers);
                                        	this.mEventoArray[e].mManagerNameArray.push(this.mEventoArray[e].mJsonEvent.first_name + ' ' + this.mEventoArray[e].mJsonEvent.last_name);
                                	}
					this.mSmashEventoArray.push(this.mEventoArray[e]);
				}
			}

			for (var s = 0; s < this.mSmashEventoArray.length; s++)
			{
				this.mEventoArray[s].printToScreen();
			}
		}
		else
		{
			this.setMessage('You have no events upcoming. Enjoy the time off.', 'black'); 
		}
	}
}
