'use strict';

class InsertPracticeScreen extends Screen
{
	constructor(application)
	{
		super(application);

                location.hash = 'insert_practice_screen';

                this.setHtml(document.getElementById("insert_practice_screen_html_id"));
                this.setMessageElement(document.getElementById("insert_practice_screen_message_id"));
                this.setForm(document.getElementById("insert_practice_screen_form_id"));
                this.setSpinner(document.getElementById("insert_practice_screen_spinner_id"));

		//club and team
                this.setClubSelect(document.getElementById("insert_practice_screen_club_id"));
                this.setTeamSelect(document.getElementById("insert_practice_screen_team_id"));
                this.setPitchSelect(document.getElementById("insert_practice_screen_pitch_id"));

		//set todays date
		document.getElementById('insert_practice_screen_date_id').valueAsDate = new Date();
		document.getElementById('insert_practice_screen_start_date_id').valueAsDate = new Date();
		document.getElementById('insert_practice_screen_end_date_id').valueAsDate = new Date();

		//checkbox
		this.mRecurringHtml = null;
		this.mRecurringCheckbox = null;
                this.setRecurringHtml(document.getElementById("insert_practice_screen_recurring_html_id"));
                this.setRecurringCheckbox(document.getElementById("insert_practice_screen_recurring_id"));
		this.setDateHtml(document.getElementById("insert_practice_screen_date_html_id"));
		this.getRecurringCheckbox().onclick = this.recurringCheckboxClicked.bind(this);

		//club select
                this.getClubSelect().onchange = this.clubSelected.bind(this);

                this.getForm().addEventListener('submit', function(e)
                {
                        e.preventDefault();
                        APPLICATION.getCurrentScreen().hit();
                });

	}

	clubSelected()
	{
		this.getPitchesAndTeams();
	}

	//overides
	enter()
	{
		super.enter();
		this.hideRecurring();
		//clear checkboxes
		this.getRecurringCheckbox().checked = false;
		document.getElementById("insert_practice_screen_sunday_checkbox_id").checked = false;
		document.getElementById("insert_practice_screen_monday_checkbox_id").checked = false;
		document.getElementById("insert_practice_screen_tuesday_checkbox_id").checked = false;
		document.getElementById("insert_practice_screen_wednesday_checkbox_id").checked = false;
		document.getElementById("insert_practice_screen_thursday_checkbox_id").checked = false;
		document.getElementById("insert_practice_screen_friday_checkbox_id").checked = false;
		document.getElementById("insert_practice_screen_saturday_checkbox_id").checked = false;
	}	
        
	processClubs()
        {
		super.processClubs();
                if (this.mJson.clubs)
		{
			this.getPitchesAndTeams();
		}
        }

	get()
	{
		if (APPLICATION.getJWT())
		{
                       	APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/select_clubs_of_teams_managed.php?jwt=" + APPLICATION.getJWT() + "&person_id=" + this.getPersonId());
                       	APPLICATION.getCurrentScreen().ajax();
		}
	}
	
	getPitchesAndTeams()
	{
		if (APPLICATION.getJWT())
		{
                       	APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/select_pitches_and_teams.php?jwt=" + APPLICATION.getJWT() + "&club_id=" + this.getClubId() + "&person_id=" + this.getPersonId());
                       	APPLICATION.getCurrentScreen().ajax();
		}
	}
	
	hit()
	{
		//both normal and recurring
		var arrival_time = document.getElementById("insert_practice_screen_arrival_time_id").value;
		var start_time = document.getElementById("insert_practice_screen_start_time_id").value;
		var end_time = document.getElementById("insert_practice_screen_end_time_id").value;
		var address = document.getElementById("insert_practice_screen_address_id").value;
		var coordinates = document.getElementById("insert_practice_screen_coordinates_id").value;
              
		var field_name = document.getElementById("insert_practice_screen_field_id").value;

		if (this.getClubId() == 0)
		{
			this.setMessage("You must select a club to enter a practice. You don't have any clubs that you are a manager on.",'red');
		}
		else if (this.getTeamId() == 0)
		{
			this.setMessage("You must select a team to enter a practice. You don't have any teams that you are a manager on.",'red');
		}

		if (this.getClubId() > 0 && this.getTeamId() > 0)
		{
			if (this.mRecurringCheckbox.checked == true)
			{
				//recurring
				var start_date = document.getElementById("insert_practice_screen_start_date_id").value;
				var end_date = document.getElementById("insert_practice_screen_end_date_id").value;
				
				var sunday_checked = document.getElementById("insert_practice_screen_sunday_checkbox_id").checked;
				var monday_checked = document.getElementById("insert_practice_screen_monday_checkbox_id").checked;
				var tuesday_checked = document.getElementById("insert_practice_screen_tuesday_checkbox_id").checked;
				var wednesday_checked = document.getElementById("insert_practice_screen_wednesday_checkbox_id").checked;
				var thursday_checked = document.getElementById("insert_practice_screen_thursday_checkbox_id").checked;
				var friday_checked = document.getElementById("insert_practice_screen_friday_checkbox_id").checked;
				var saturday_checked = document.getElementById("insert_practice_screen_saturday_checkbox_id").checked;

				APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/insert_practice.php?jwt=" + APPLICATION.getJWT() + '&team_id=' + this.getTeamId() + '&start_date=' + start_date + '&end_date=' + end_date + '&arrival_time=' + arrival_time + '&start_time=' + start_time + '&end_time=' + end_time + '&address=' + address + '&coordinates=' + coordinates + '&pitch_id=' + this.getPitchId() + '&field_name=' + field_name + '&person_id=' + this.getPersonId() + '&sunday_checked=' + sunday_checked + '&monday_checked=' + monday_checked + '&tuesday_checked=' + tuesday_checked + '&wednesday_checked=' + wednesday_checked + '&thursday_checked=' + thursday_checked + '&friday_checked=' + friday_checked + '&saturday_checked=' + saturday_checked);
                        
				APPLICATION.getCurrentScreen().ajax();
			}
			else
			{
				//normal
				var event_date = document.getElementById("insert_practice_screen_date_id").value;
				APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/insert_practice.php?jwt=" + APPLICATION.getJWT() + '&team_id=' + this.getTeamId() + '&event_date=' + event_date + '&arrival_time=' + arrival_time + '&start_time=' + start_time + '&end_time=' + end_time + '&address=' + address + '&coordinates=' + coordinates + '&pitch_id=' + this.getPitchId() + '&field_name=' + field_name + '&person_id=' + this.getPersonId());
                        
				APPLICATION.getCurrentScreen().ajax();
			}
		}
	}

	//new functions
	setRecurringHtml(h)
	{
		this.mRecurringHtml = h;
	}

	getRecurringHtml()
	{
		return this.mRecurringHtml;
	}

	setDateHtml(d)
	{
		this.mDateSelect = d;	
	}

	getDateHtml()
	{
		return this.mDateSelect;
	}
	
	setRecurringCheckbox(c)
	{
		this.mRecurringCheckbox = c;
	}

	getRecurringCheckbox()
	{
		return this.mRecurringCheckbox;
	}
	
	hideRecurring()
	{
		this.getRecurringHtml().style.display = "none";
		
		//regule date should show when in regular mode
		this.getDateHtml().style.display = "block";
		this.getDateHtml().style.visibility = "visible";
	}

	showRecurring()
	{
		this.getRecurringHtml().style.display = "block";
		this.getRecurringHtml().style.visibility = "visible";

		//regule date should hide when in recurring mode
		this.getDateHtml().style.display = "none";
	}

	recurringCheckboxClicked()
	{
		if (this.mRecurringCheckbox.checked == true)
		{
			this.showRecurring();
		}
		else
		{
			this.hideRecurring();
		}
	}

}
