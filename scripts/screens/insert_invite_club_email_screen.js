'use strict';

class InsertInviteClubEmailScreen extends Screen
{
	constructor(application)
	{
		super(application);

		location.hash = 'insert_invite_club_email_screen';

		document.getElementById("insertinviteclubemailscreenbuttonid").onclick = this.hit.bind(this);

                this.setHtml(document.getElementById("insert_invite_club_email_screen_html_id"));
                this.setMenuItem(document.getElementById("insert_invite_club_email_nav_id"));
                this.setMessageElement(document.getElementById("insert_invite_club_email_screen_message_id"));
                this.setForm(document.getElementById("insert_invite_club_email_screen_form_id"));
                this.setSpinner(document.getElementById("insert_invite_club_email_screen_spinner_id"));

               	this.setClubSelect(document.getElementById("insert_invite_club_email_screen_club_id"));

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
      		var email  = document.getElementById("insert_invite_club_email_screen_email_id").value;

                APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/insert_invite_club_email.php?" + this.getStandardParameters() + '&email=' + email + '&club_id=' + this.getClubId());
//	        APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/insert_pitch.php?jwt=" + APPLICATION.getJWT() + '&club_id=' + club_id + '&person_id=' + person_id + '&name=' + name);


                APPLICATION.getCurrentScreen().ajax();
	}
}
