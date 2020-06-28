'use strict';

class ScheduleScreen extends Screen
{
        constructor(application)
        {
                super(application);

                //make a helper calendar instance
                this.mCalendar = new Calendar();

		this.mEventsArray = new Array();
		this.mEventoArray = new Array();

		this.mPracticesPlayerAvailabilityArray = new Array();
		this.mGamesPlayerAvailabilityArray     = new Array();
		this.mGamesPlayersArray                = new Array();
		this.mPracticesPlayersArray            = new Array();
		this.mTeamsArray = new Array();

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
        }

        get()
        {
		APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/schedule.php?" + this.getStandardParameters() + '&first_day_of_query=' + this.mFirstDayOfQuery + '&last_day_of_query=' + this.mLastDayOfQuery);
                APPLICATION.getCurrentScreen().ajax();
        }

	deleteHit()
	{
		var screen = APPLICATION.getCurrentScreen();
                
		//lets find evento to delete..
                for (var i = 0; i < screen.mItemArray.length; i++)
                {
                        if (screen.mItemArray[i].mDeleteId == this.getAttribute("id") && screen.mItemArray[i].mJson.type == this.getAttribute("type"))
                        {
                                screen.mWaitListItem = screen.mItemArray[i];
                        }
                }

		if (this.getAttribute("type") == 'game')
		{
			screen.setUrl("/php/classes/screens/delete_game.php?" + screen.getStandardParameters() + '&game_id=' + this.getAttribute("id"));
                	screen.ajax();
		}
		if (this.getAttribute("type") == 'practice')
		{
			screen.setUrl("/php/classes/screens/delete_practice.php?" + screen.getStandardParameters() + '&practice_id=' + this.getAttribute("id"));
                	screen.ajax();
		}
	}

	removeDivs()
	{
		super.removeDivs();

		for (var i = 0; i < this.mEventoArray.length; i++)
		{
			this.mEventoArray[i].removeDivs();
		}
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
					document.getElementById('button_1_1_' + a[3] + '_' + a[4]).style.backgroundColor = APPLICATION.mLawnGreen; 		
					document.getElementById('button_1_2_' + a[3] + '_' + a[4]).style.backgroundColor = APPLICATION.mSkyBlue; 		
					document.getElementById('button_1_3_' + a[3] + '_' + a[4]).style.backgroundColor = APPLICATION.mSkyBlue; 		
				}
				if (a[2] == 2)
				{
					document.getElementById('button_1_1_' + a[3] + '_' + a[4]).style.backgroundColor = APPLICATION.mSkyBlue; 		
					document.getElementById('button_1_2_' + a[3] + '_' + a[4]).style.backgroundColor = APPLICATION.mYellow; 		
					document.getElementById('button_1_3_' + a[3] + '_' + a[4]).style.backgroundColor = APPLICATION.mSkyBlue; 		
				}
				if (a[2] == 3)
				{
					document.getElementById('button_1_1_' + a[3] + '_' + a[4]).style.backgroundColor = APPLICATION.mSkyBlue; 		
					document.getElementById('button_1_2_' + a[3] + '_' + a[4]).style.backgroundColor = APPLICATION.mSkyBlue; 		
					document.getElementById('button_1_3_' + a[3] + '_' + a[4]).style.backgroundColor = APPLICATION.mRed; 		
				}

				for (var i = 0; i < screen.mGamesPlayerAvailabilityArray.length; i++)
                		{
                        		if (screen.mGamesPlayerAvailabilityArray[i].game_id == a[3] && screen.mGamesPlayerAvailabilityArray[i].team_club_player_id == a[4])
					{
						screen.mGamesPlayerAvailabilityArray[i].availability_id = a[2];
					}
                		}
			}

			//practice
			if (a[1] == 2)
			{
				if (a[2] == 1)
				{
					document.getElementById('button_2_1_' + a[3] + '_' + a[4]).style.backgroundColor = APPLICATION.mLawnGreen; 		
					document.getElementById('button_2_2_' + a[3] + '_' + a[4]).style.backgroundColor = APPLICATION.mSkyBlue; 		
					document.getElementById('button_2_3_' + a[3] + '_' + a[4]).style.backgroundColor = APPLICATION.mSkyBlue; 		
				}
				if (a[2] == 2)
				{
					document.getElementById('button_2_1_' + a[3] + '_' + a[4]).style.backgroundColor = APPLICATION.mSkyBlue; 		
					document.getElementById('button_2_2_' + a[3] + '_' + a[4]).style.backgroundColor = APPLICATION.mYellow; 		
					document.getElementById('button_2_3_' + a[3] + '_' + a[4]).style.backgroundColor = APPLICATION.mSkyBlue; 		
				}
				if (a[2] == 3)
				{
					document.getElementById('button_2_1_' + a[3] + '_' + a[4]).style.backgroundColor = APPLICATION.mSkyBlue; 		
					document.getElementById('button_2_2_' + a[3] + '_' + a[4]).style.backgroundColor = APPLICATION.mSkyBlue; 		
					document.getElementById('button_2_3_' + a[3] + '_' + a[4]).style.backgroundColor = APPLICATION.mRed; 		
				}
				
				for (var i = 0; i < screen.mPracticesPlayerAvailabilityArray.length; i++)
                		{
                        		if (screen.mPracticesPlayerAvailabilityArray[i].practice_id == a[3] && screen.mPracticesPlayerAvailabilityArray[i].team_club_player_id == a[4])
					{
						screen.mPracticesPlayerAvailabilityArray[i].availability_id = a[2];
					}
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
		super.processJsonData();

		this.mEventsArray.length = 0;

		//make new array containing games and practices together
		if (this.mJson)
		{

			if (this.mJson.games)
			{
                       		for (var i = 0; i < this.mJson.games.length; i++)
				{
					this.mEventsArray.push(this.mJson.games[i]);
					this.mJson.games[i].type = 'game';
				}
			}
                	
			if (this.mJson.practices)
			{
                       		for (var i = 0; i < this.mJson.practices.length; i++)
				{
					this.mEventsArray.push(this.mJson.practices[i]);
					this.mJson.practices[i].type = 'practice';
				}
			}
			
			if (this.mJson.games_players)
			{
                       		for (var i = 0; i < this.mJson.games_players.length; i++)
				{
					this.mGamesPlayersArray.push(this.mJson.games_players[i]);
					this.mJson.games_players[i].type = 'game';
				}
			}

			if (this.mJson.practices_players)
			{
                       		for (var i = 0; i < this.mJson.practices_players.length; i++)
				{
					this.mPracticesPlayersArray.push(this.mJson.practices_players[i]);
					this.mJson.practices_players[i].type = 'practice';
				}
			}


			if (this.mJson.games_player_availability)
			{
                       		for (var i = 0; i < this.mJson.games_player_availability.length; i++)
				{
					this.mGamesPlayerAvailabilityArray.push(this.mJson.games_player_availability[i]);
				}
			}
			
			if (this.mJson.practices_player_availability)
			{
                       		for (var i = 0; i < this.mJson.practices_player_availability.length; i++)
				{
					this.mPracticesPlayerAvailabilityArray.push(this.mJson.practices_player_availability[i]);
				}
			}

			if (this.mJson.teams)
			{
                       		for (var i = 0; i < this.mJson.teams.length; i++)
				{
					this.mTeamsArray.push(this.mJson.teams[i]);
				}
			}

			var item = null;
			var game_id = null;
			if (this.mJson.game_roster)
			{
				//get game id
				for (var i = 0; i < this.mJson.game_roster.length; i++)
				{
					game_id = this.mJson.game_roster[i].game_id;
				}

				//who does this belong to?
                		for (var i = 0; i < this.mItemArray.length; i++)
				{
					if (this.mItemArray[i].mJson.type == 'game' && this.mItemArray[i].mJson.id == game_id)
					{
						//this is our item that we just got roster for
						item = this.mItemArray[i];
					}	
				}

				//fill it
				if (item)
				{
					//set jsons in item	
					item.mJson.game_roster = this.mJson.game_roster;

					//set array in item
					item.mGameRosterArray.length = 0;
					for (var i = 0; i < this.mJson.game_roster.length; i++)
					{
						item.mGameRosterArray.push(this.mJson.game_roster[i]);
					}

				}
			}
			
			if (this.mJson.game_team_availability)
			{
				if (item)
				{
					//set json
					item.mJson.game_team_availability = this.mJson.game_team_availability;

					//add to avail array
					item.mGameTeamAvailabilityArray.length = 0;
                       			for (var i = 0; i < this.mJson.game_team_availability.length; i++)
					{
						item.mGameTeamAvailabilityArray.push(this.mJson.game_team_availability[i]);
					}
				}
			}
			
			if (item)
			{
				/*
				item.removeTeamRosterDivs();
                      
				item.mTeamDiv = document.createElement('div');
                        	item.mContainerDiv.appendChild(item.mTeamDiv);
				*/

				item.makeRosterButtons();	
			}

			if (this.mEventsArray.length > 0)
			{

				this.sortEventsArray();
				this.makeItem();
				this.smash();
				this.printItems();
			}
		}

	} //end processJsonData

	sortEventsArray()
	{
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
		}
	}

	makeItem()
	{
		if (this.mEventsArray)
		{
                	for (var i = 0; i < this.mEventsArray.length; i++)
			{
				var titleText = null;

				//title
                       		if (this.mEventsArray[i].type == 'game')
                       		{
                               		titleText = 'Game: ' + this.mApplication.mCalendar.convertDate(this.mEventsArray[i].event_date);
                       		}
                       		if (this.mEventsArray[i].type == 'practice')
                       		{
                               		titleText = 'Practice: ' + this.mApplication.mCalendar.convertDate(this.mEventsArray[i].event_date);
                       		}
				
				//array for body
				var textArray = new Array();

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

				var deleteId = this.mEventsArray[i].id;

				var evento = new ScheduleItem(this.mApplication,this.mEventsArray[i], titleText, textArray, deleteId);
				this.mEventoArray.push(evento);

			} //for (var i = 0; i < this.mEventsArray.length; i++)

		} //if (this.mEventsArray)
	}

	smash()
	{
		if (this.mEventsArray.length > 0)
		{
			//smash eventos
			for (var e = 0; e < this.mEventoArray.length; e++)
			{
				//add to smash array if not added already..
				var dup = false;
				for (var s = 0; s < this.mItemArray.length; s++)
				{
                                        //game
                                        if (this.mEventoArray[e].mJson.id == this.mItemArray[s].mJson.id && this.mEventoArray[e].mJson.type == 'game' && this.mItemArray[s].mJson.type == 'game')
                                        {
                                                dup = true;
                                        }

					//practice
					if (this.mEventoArray[e].mJson.id == this.mItemArray[s].mJson.id && this.mEventoArray[e].mJson.type == 'practice' && this.mItemArray[s].mJson.type == 'practice')
					{
						dup = true;	
					}
				}

				if (dup == false)
				{
					this.mItemArray.push(this.mEventoArray[e]);
					console.log('itemArray push:' + e);
				}
			
			}//end for eventoArray smash
		}
	}

	//virtual
	printItems()
	{
	
	}

}
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
