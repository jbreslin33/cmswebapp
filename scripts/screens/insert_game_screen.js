'use strict';

class InsertGameScreen extends Screen
{
	constructor(application)
	{
		super(application);

		location.hash = "insert_game_screen";

		//html ids 
		this.mSpinnerId = "insert_game_screen_spinner_id";
		this.mHtmlId = "insert_game_screen_html_id";

		document.getElementById("insertgamescreenbuttonid").onclick = this.hit.bind(this);
	}

	get()
	{
                var club_select = document.getElementById("club_select_id");

                if (club_select.length)
                {
                        var club_id = club_select.options[club_select.selectedIndex].value;

			if (this.mApplication.mJWT)
			{
                        	var url = "/php/classes/select/select_pitches.php?jwt=" + APPLICATION.mJWT + '&club_id=' + club_id;
		        	var request = new XMLHttpRequest();
                		request.onreadystatechange = function()
                		{
                        		if (request.readyState === XMLHttpRequest.DONE)
                        		{
                                		if (request.status === 200)
                                		{
							console.log('response:' + this.responseText);
                                        		APPLICATION.mInsertGameScreen.mData = this.responseText;
                                		}
                        		}
                		};
                        	request.open('POST', url);
                        	request.send();
			}
		}
	}

	hit()
	{
		this.mHit = true;
                
		var team_select = document.getElementById("team_select_id");

		var event_date = document.getElementById("insert_game_screen_date_id").value;
		var arrival_time = document.getElementById("insert_game_screen_arrival_time_id").value;
		var start_time = document.getElementById("insert_game_screen_start_time_id").value;
		var end_time = document.getElementById("insert_game_screen_end_time_id").value;
		var address = document.getElementById("insert_game_screen_address_id").value;
		var coordinates = document.getElementById("insert_game_screen_coordinates_id").value;
              
		var pitch_id = null;	
		var pitch_select = document.getElementById("insert_team_screen_pitch_id");
                if (pitch_select.length)
                {
                        var pitch_id = pitch_select.options[pitch_select.selectedIndex].value;
		}

		var field_name = document.getElementById("insert_game_screen_field_id").value;

		var team_id = null;
		console.log('loe:' + team_select.length);
                if (team_select.length > 0)
                {
                        var team_id = team_select.options[team_select.selectedIndex].value;

                        var url = "/php/classes/insert/insert_game.php?jwt=" + APPLICATION.mJWT + '&team_id=' + team_id + '&event_date=' + event_date + '&arrival_time=' + arrival_time + '&start_time=' + start_time + '&end_time=' + end_time + '&address=' + address + '&coordinates=' + coordinates + '&pitch_id=' + pitch_id + '&field_name=' + field_name;

			console.log('url:' + url);

                	var request = new XMLHttpRequest();
                	request.onreadystatechange = function()
                	{
                        	if (request.readyState === XMLHttpRequest.DONE)
                        	{
                                	if (request.status === 200)
                                	{
						APPLICATION.mInsertGameScreen.mData = this.responseText;
                                	}
                        	}
                	};

			var form = document.getElementById('insert_game_screen_html_id');
			if (form.checkValidity() == true) 
			{
				request.open('POST', url);
                		request.send();
			}
		}
	}
}
