'use strict';

class InsertTeamScreen extends Screen
{
	constructor(application)
	{
		super(application);

		location.hash = "insert_team_screen";

		//html ids 
		this.mSpinnerId = "insert_team_screen_spinner_id";
		this.mHtmlId = "insert_team_screen_html_id";

		document.getElementById("insertteamscreenbuttonid").onclick = this.hit.bind(this);
		
		this.mMessageSpan = document.getElementById("insert_team_screen_message_id");
	}

	hit()
	{
		this.mHit = true;

		var name  = document.getElementById("insert_team_screen_name_id").value;
		var person_select = document.getElementById("person_select_id");
		var club_select = document.getElementById("club_select_id");

		if (club_select.length > 0 && person_select.length > 0)
		{
               		var club_id = club_select.options[club_select.selectedIndex].value;
               		var person_id = person_select.options[person_select.selectedIndex].value;

			var url = "/php/classes/insert/insert_team.php?jwt=" + APPLICATION.getJWT() + '&club_id=' + club_id + '&person_id=' + person_id + '&name=' + name;

                	var request = new XMLHttpRequest();
                	request.onreadystatechange = function()
                	{
                        	if (request.readyState === XMLHttpRequest.DONE)
                        	{
                                	if (request.status === 200)
                                	{
						APPLICATION.mInsertTeamScreen.mData = this.responseText;
                                	}
                        	}
                	};

			var form = document.getElementById('insert_team_screen_html_id');
			if (form.checkValidity() == true) 
			{
				request.open('POST', url);
                		request.send();
			}
		}
		else
		{
			APPLICATION.mInsertTeamScreen.mMessageSpan.style.color = "red";	
			APPLICATION.mInsertTeamScreen.mMessageSpan.innerHTML = "You must select a club first";	
		}
	}
}
