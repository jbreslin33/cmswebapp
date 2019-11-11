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
	}
	
	hit()
	{
      		var email  = document.getElementById("insert_invite_club_email_screen_email_id").value;

                APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/insert_invite_club_email.php?jwt=" + APPLICATION.getJWT() + this.getParameters() + '&email=' + email);

                APPLICATION.getCurrentScreen().ajax();
	}
}
