'use strict';

class InsertEmailClubScreen extends Screen
{
	constructor(application)
	{
		super(application);

		location.hash = 'insert_email_club_screen';

		document.getElementById("insertemailclubscreenbuttonid").onclick = this.hit.bind(this);

                this.setHtml(document.getElementById("insert_email_club_screen_html_id"));
                this.setMessageElement(document.getElementById("insert_email_club_screen_message_id"));
                this.setForm(document.getElementById("insert_email_club_screen_form_id"));
                this.setSpinner(document.getElementById("insert_email_club_screen_spinner_id"));

               	this.setClubSelect(document.getElementById("insert_email_club_screen_club_id"));

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
      		var email  = document.getElementById("insert_email_club_screen_email_id").value;

                APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/insert_email_club_screen.php?" + this.getStandardParameters() + '&email=' + email + '&club_id=' + this.getClubId());
                APPLICATION.getCurrentScreen().ajax();
	}
}
