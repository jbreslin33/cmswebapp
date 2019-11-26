'use strict';

class InsertPitchScreen extends Screen
{
	constructor(application)
	{
		super(application);

		location.hash = 'insert_pitch_screen';

		document.getElementById("insertpitchscreenbuttonid").onclick = this.hit.bind(this);
		
                this.setHtml(document.getElementById("insert_pitch_screen_html_id"));
                this.setMenuItem(document.getElementById("insert_pitch_nav_id"));
                this.setMessageElement(document.getElementById("insert_pitch_screen_message_id"));
                this.setForm(document.getElementById("insert_pitch_screen_form_id"));
                this.setSpinner(document.getElementById("insert_pitch_screen_spinner_id"));

		this.setClubSelect(document.getElementById("insert_pitch_screen_club_id"));
	}
      
	get()
        {
                if (APPLICATION.getJWT())
                {
                        APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/select_administrated_clubs.php?" + this.getStandardParameters());
                        APPLICATION.getCurrentScreen().ajax();
                }
        }

	hit()
	{
		var name  = document.getElementById("insert_pitch_screen_name_id").value;
		var person_select = this.getPersonSelect();
		var club_select   = this.getClubSelect();

		if (club_select.length > 0 && person_select.length > 0)
		{
               		var person_id = person_select.options[person_select.selectedIndex].value;
               		var club_id   = club_select.options[club_select.selectedIndex].value;

			APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/insert_pitch.php?jwt=" + APPLICATION.getJWT() + '&club_id=' + club_id + '&person_id=' + person_id + '&name=' + name);

			APPLICATION.getCurrentScreen().ajax();
		}
		else
		{
			this.setMessage("You must select a club first","red");
		}
	}
}
