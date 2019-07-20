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


                        	APPLICATION.getCurrentScreen().setUrl("/php/classes/select/select_pitches.php?jwt=" + APPLICATION.getJWT() + '&club_id=' + club_id);
                        	APPLICATION.getCurrentScreen().ajax();
				/*
		        	var request = new XMLHttpRequest();
                		request.onreadystatechange = function()
                		{
                        		if (request.readyState === XMLHttpRequest.DONE)
                        		{
                                		if (request.status === 200)
                                		{
                                        		APPLICATION.mInsertPracticeScreen.mData = this.responseText;
                                		}
                        		}
                		};
                        	request.open('POST', url);
                        	request.send();
				*/
			}
		}
	}

	hit()
	{
		this.mHit = true;
                
		var team_select = document.getElementById("team_select_id");

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
                
		if (team_select.length > 0)
                {
                        var team_id = team_select.options[team_select.selectedIndex].value;

                        //APPLICATION.getCurrentScreen().setUrl("/php/classes/insert/insert_team.php?jwt=" + APPLICATION.getJWT() + '&club_id=' + club_id + '&person_id=' + person_id + '&name=' + name);
                        APPLICATION.getCurrentScreen().setUrl("/php/classes/insert/insert_practice.php?jwt=" + APPLICATION.getJWT() + '&team_id=' + team_id + '&event_date=' + event_date + '&arrival_time=' + arrival_time + '&start_time=' + start_time + '&end_time=' + end_time + '&address=' + address + '&coordinates=' + coordinates + '&pitch_id=' + pitch_id + '&field_name=' + field_name);
                        
			APPLICATION.getCurrentScreen().ajax();
/*
                	var request = new XMLHttpRequest();
                	request.onreadystatechange = function()
                	{
                        	if (request.readyState === XMLHttpRequest.DONE)
                        	{
                                	if (request.status === 200)
                                	{
						APPLICATION.mInsertPracticeScreen.mData = this.responseText;
                                	}
                        	}
                	};

			var form = document.getElementById('insert_practice_screen_html_id');
			if (form.checkValidity() == true) 
			{
				request.open('POST', url);
                		request.send();
			}
			*/
		}
	}

        processJsonData()
        {
                super.processJsonData();

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
