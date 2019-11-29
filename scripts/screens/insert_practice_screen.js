'use strict';

class InsertPracticeScreen extends Screen
{
	constructor(application)
	{
		super(application);

                location.hash = 'insert_practice_screen';

                document.getElementById("insertpracticescreenbuttonid").onclick = this.hit.bind(this);

                this.setHtml(document.getElementById("insert_practice_screen_html_id"));
                this.setMenuItem(document.getElementById("insert_practice_nav_id"));
                this.setMessageElement(document.getElementById("insert_practice_screen_message_id"));
                this.setForm(document.getElementById("insert_practice_screen_form_id"));
                this.setSpinner(document.getElementById("insert_practice_screen_spinner_id"));

		//club and team
                this.setClubSelect(document.getElementById("insert_practice_screen_club_id"));
                this.setTeamSelect(document.getElementById("insert_practice_screen_team_id"));
                this.setPitchSelect(document.getElementById("insert_practice_screen_pitch_id"));

		//set todays date
		document.getElementById('insert_practice_screen_date_id').valueAsDate = new Date();
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
		this.mHit = true;
                
		var event_date = document.getElementById("insert_practice_screen_date_id").value;
		var arrival_time = document.getElementById("insert_practice_screen_arrival_time_id").value;
		var start_time = document.getElementById("insert_practice_screen_start_time_id").value;
		var end_time = document.getElementById("insert_practice_screen_end_time_id").value;
		var address = document.getElementById("insert_practice_screen_address_id").value;
		var coordinates = document.getElementById("insert_practice_screen_coordinates_id").value;
              
		var field_name = document.getElementById("insert_practice_screen_field_id").value;

                APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/insert_practice.php?jwt=" + APPLICATION.getJWT() + '&team_id=' + this.getTeamId() + '&event_date=' + event_date + '&arrival_time=' + arrival_time + '&start_time=' + start_time + '&end_time=' + end_time + '&address=' + address + '&coordinates=' + coordinates + '&pitch_id=' + this.getPitchId() + '&field_name=' + field_name + '&person_id=' + this.getPersonId());
                        
		APPLICATION.getCurrentScreen().ajax();
	}
	
	processJsonData()
        {
                super.processJsonData();

		if (this.mJson)
		{
                	if (this.mJson.pitches)
                	{
                        	//load up pitches option
                        	var select = document.getElementById("insert_practice_screen_pitch_id");
                        	select.length = 0;
                        	for (var i = 0; i < this.mJson.pitches.length; i++)
                        	{
                               		var opt = document.createElement('option');
                                	opt.value = this.mJson.pitches[i].id;
                                	var name = this.mJson.pitches[i].name;
                                	opt.innerHTML = name;
                                	select.appendChild(opt);
                        	}
                	}
		}
	}

        processClubs()
        {
		super.processClubs();
                if (this.mJson.clubs)
		{
			this.getPitchesAndTeams();
		}
        }
}
