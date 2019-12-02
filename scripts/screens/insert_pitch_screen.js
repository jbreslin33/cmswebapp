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

		if (this.getClubId() > 0)
		{
			APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/insert_pitch.php?" + this.getStandardParameters() + '&club_id=' + this.getClubId() + '&name=' + name);
			APPLICATION.getCurrentScreen().ajax();
		}
		else
		{
			this.setMessage("You must select a club first","red");
		}
	}
}