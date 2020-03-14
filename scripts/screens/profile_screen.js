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

		this.mProfilesArray = new Array();

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

		this.mProfilesArray.length = 0;

		//make new array containing games and practices together
		if (this.mJson)
		{
                	if (this.mJson.profiles)
			{
                        	for (var i = 0; i < this.mJson.profiles.length; i++)
				{
					this.mProfilesArray.push(this.mJson.profiles[i]);
					if (this.mJson.profiles[i].player_id != null)
					{
						this.mPlayerButton.style.backgroundColor = "green";
					}
					else
					{
						this.mPlayerButton.style.backgroundColor = "red";
					}
				}
			}
		}
	}
}
