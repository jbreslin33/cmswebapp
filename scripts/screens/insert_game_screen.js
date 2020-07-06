'use strict';

class InsertGameScreen extends Screen
{
	constructor(application)
	{
		super(application);

                location.hash = 'insert_game_screen';

                this.setHtml(document.getElementById("insert_game_screen_html_id"));
                this.setMessageElement(document.getElementById("insert_game_screen_message_id"));
                this.setForm(document.getElementById("insert_game_screen_form_id"));
                this.setSpinner(document.getElementById("insert_game_screen_spinner_id"));

		//club and team
                this.setClubSelect(document.getElementById("insert_game_screen_club_id"));
                this.setTeamSelect(document.getElementById("insert_game_screen_team_id"));
                this.setPitchSelect(document.getElementById("insert_game_screen_pitch_id"));

		//set todays date
		document.getElementById('insert_game_screen_date_id').valueAsDate = new Date();

		//checkbox
		this.setDateHtml(document.getElementById("insert_game_screen_date_html_id"));

                //club select
                this.getClubSelect().onchange = this.clubSelected.bind(this);

                this.getForm().addEventListener('submit', function(e)
                {
                        e.preventDefault();
                        APPLICATION.getCurrentScreen().hit();
                });

                //close nav
                this.setCloseNav();
        }

        clubSelected()
        {
                this.getPitchesAndTeams();
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
			var screen = APPLICATION.getCurrentScreen();
                       	screen.setUrl("/php/classes/screens/select_clubs_of_teams_managed.php?" + screen.getStandardParameters());
                       	screen.ajax();
		}
	}
	
	getPitchesAndTeams()
	{
		if (APPLICATION.getJWT())
		{
			var screen = APPLICATION.getCurrentScreen();
                       	screen.setUrl("/php/classes/screens/select_pitches_and_teams.php?" + screen.getStandardParameters() + "&club_id=" + this.getClubId());
                       	screen.ajax();
		}
	}
	
	hit()
	{
		//both normal and recurring
		var arrival_time = document.getElementById("insert_game_screen_arrival_time_id").value;
		var start_time = document.getElementById("insert_game_screen_start_time_id").value;
		var end_time = document.getElementById("insert_game_screen_end_time_id").value;
		var address = document.getElementById("insert_game_screen_address_id").value;
		var coordinates = document.getElementById("insert_game_screen_coordinates_id").value;
              
		var field_name = document.getElementById("insert_game_screen_field_id").value;

		if (this.getClubId() == 0)
		{
			this.setMessage("You must select a club to enter a game. You don't have any clubs that you are a manager on.",'red');
		}
		else if (this.getTeamId() == 0)
		{
			this.setMessage("You must select a team to enter a game. You don't have any teams that you are a manager on.",'red');
		}
			

		if (this.getClubId() > 0 && this.getTeamId() > 0)
		{
			var screen = APPLICATION.getCurrentScreen();
			
			var event_date = document.getElementById("insert_game_screen_date_id").value;
			screen.setUrl("/php/classes/screens/insert_game.php?" + screen.getStandardParameters() + '&team_id=' + this.getTeamId() + '&event_date=' + event_date + '&arrival_time=' + arrival_time + '&start_time=' + start_time + '&end_time=' + end_time + '&address=' + address + '&coordinates=' + coordinates + '&pitch_id=' + this.getPitchId() + '&field_name=' + field_name);
                        
			screen.ajax();
		}
	}

	setDateHtml(d)
	{
		this.mDateSelect = d;	
	}

	getDateHtml()
	{
		return this.mDateSelect;
	}
}
