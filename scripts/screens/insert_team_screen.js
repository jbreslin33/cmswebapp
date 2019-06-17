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
	}

	hit()
	{
		this.mHit = true;

		var name  = document.getElementById("insert_team_screen_name_id").value;
			
		var person_select = document.getElementById("person_select_id");
               	var person_id = person_select.options[person_select.selectedIndex].value;

		var club_select = document.getElementById("club_select_id");
               	var club_id = club_select.options[club_select.selectedIndex].value;

		var url = "/php/classes/insert/insert_team.php?jwt=" + APPLICATION.mJWT + '&club_id=' + club_id + '&person_id=' + person_id + '&name=' + name;

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

/*
        processClubTeamPersonData()
        {
                super.processClubTeamPersonData();

		//load up teams option
                var select = document.getElementById("insert_team_screen_pitch_id");
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
	*/
}
