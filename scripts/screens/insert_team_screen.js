'use strict';

class InsertTeamScreen extends Screen
{
	constructor(application)
	{
		super(application);

		location.hash = 'insert_team_screen';

		document.getElementById("insertteamscreenbuttonid").onclick = this.hit.bind(this);
		
                this.setHtml(document.getElementById("insert_team_screen_html_id"));
                this.setMenuItem(document.getElementById("insert_team_nav_id"));
                this.setMessageElement(document.getElementById("insert_team_screen_message_id"));
                this.setForm(document.getElementById("insert_team_screen_form_id"));
                this.setSpinner(document.getElementById("insert_team_screen_spinner_id"));

		this.setClubSelect(document.getElementById("insert_team_screen_club_div_id"));
	}
      
	get()
        {
                //overide get
                //we will send nothing except person_id
                //person id will be enough to get a list of clubs we will then on server select the first club and return that clubs teams we are manager of.....
                //first check if we are a club_manager

                if (APPLICATION.getJWT())
                {
                        APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/select_administrated_clubs.php?" + this.getStandardParameters());
                        APPLICATION.getCurrentScreen().ajax();
                }
        }

	hit()
	{
		var name  = document.getElementById("insert_team_screen_name_id").value;
		var person_select = document.getElementById("person_select_id");
		var club_select = document.getElementById("club_select_id");

		if (club_select.length > 0 && person_select.length > 0)
		{
               		var club_id = club_select.options[club_select.selectedIndex].value;
               		var person_id = person_select.options[person_select.selectedIndex].value;

			APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/insert_team.php?jwt=" + APPLICATION.getJWT() + '&club_id=' + club_id + '&person_id=' + person_id + '&name=' + name);

			APPLICATION.getCurrentScreen().ajax();
		}
		else
		{
			this.setMessage("You must select a club first","red");
		}
	}
}
