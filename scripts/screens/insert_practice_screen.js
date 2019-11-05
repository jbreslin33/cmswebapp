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

		//set todays date
		document.getElementById('insert_practice_screen_date_id').valueAsDate = new Date();
	}

	get()
	{
                var club_select = document.getElementById("club_select_id");

                if (club_select.length)
                {
                        var club_id = club_select.options[club_select.selectedIndex].value;

			if (APPLICATION.getJWT())
			{
                        	//APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/select_pitches.php?jwt=" + APPLICATION.getJWT() + '&club_id=' + club_id);
                        	APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/select_pitches.php?jwt=" + APPLICATION.getJWT() + this.getParameters());
                        	APPLICATION.getCurrentScreen().ajax();
			}
		}
	}

	hit()
	{
		this.mHit = true;
                
		var team_select = document.getElementById("team_select_id");
                var person_select = document.getElementById("person_select_id");

		var event_date = document.getElementById("insert_practice_screen_date_id").value;
		var arrival_time = document.getElementById("insert_practice_screen_arrival_time_id").value;
		var start_time = document.getElementById("insert_practice_screen_start_time_id").value;
		var end_time = document.getElementById("insert_practice_screen_end_time_id").value;
		var address = document.getElementById("insert_practice_screen_address_id").value;
		var coordinates = document.getElementById("insert_practice_screen_coordinates_id").value;
              
		var pitch_id = null;	
		var pitch_select = document.getElementById("insert_practice_screen_pitch_id");

                if (pitch_select.length)
                {
                        var pitch_id = pitch_select.options[pitch_select.selectedIndex].value;
		}

		var field_name = document.getElementById("insert_practice_screen_field_id").value;

		var team_id = null;
		var person_id = null;
                
		if (team_select.length > 0 && person_select.length > 0)
                {
                        var team_id = team_select.options[team_select.selectedIndex].value;
                        var person_id = person_select.options[person_select.selectedIndex].value;
			console.log('person_id:' + person_id);
			console.log('t4eam_id:' + team_id);

                        APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/insert_practice.php?jwt=" + APPLICATION.getJWT() + '&team_id=' + team_id + '&event_date=' + event_date + '&arrival_time=' + arrival_time + '&start_time=' + start_time + '&end_time=' + end_time + '&address=' + address + '&coordinates=' + coordinates + '&pitch_id=' + pitch_id + '&field_name=' + field_name + '&person_id=' + person_id);
                        
			APPLICATION.getCurrentScreen().ajax();
		}
	}
        
	processCodes()
	{
		if (this.mJson.codes)
		{
			var code = 0;
			for (var i = 0; i < this.mJson.codes.length; i++)
			{
				code = this.mJson.codes[i].code;
				if (code == '-100')
				{
					//do nothing	
				}
				else if (code == '-101')
				{
					//do nothing	
				}
			}
		}
	}
	
	processJsonData()
        {
		console.log('going once');
                super.processJsonData();

                if (this.mJson.pitches)
                {
			console.log('do o got pithes bitches?');
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
