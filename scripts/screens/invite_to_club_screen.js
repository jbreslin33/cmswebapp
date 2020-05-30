'use strict';

class InviteToClubScreen extends Screen
{
	constructor(application)
	{
		super(application);

		location.hash = 'invite_to_club_screen';

                this.setHtml(document.getElementById("invite_to_club_screen_html_id"));
                this.setMessageElement(document.getElementById("invite_to_club_screen_message_id"));
                this.setForm(document.getElementById("invite_to_club_screen_form_id"));
                this.setSpinner(document.getElementById("invite_to_club_screen_spinner_id"));

		this.setClubSelect(document.getElementById("invite_to_club_screen_club_id"));

		this.getForm().addEventListener('submit', function(e)
                {
                        e.preventDefault();
                        APPLICATION.getCurrentScreen().hit();
                });

                //close nav
                this.setCloseNav();
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
		this.hideAfterHit();
		var email  = document.getElementById("invite_to_club_screen_email_id").value;

		if (this.getClubId() > 0 && email.length > 0)
		{
			APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/invite_to_club.php?" + this.getStandardParameters() + '&club_id=' + this.getClubId() + '&email=' + email);
			APPLICATION.getCurrentScreen().ajax();
		}
		else
		{
			this.setMessage("You must select a club and provide an email first","red");
		}
	}

        hideAfterHit()
        {
                this.getForm().style.display = "none";
                this.getClubSelect().style.display = "none";
        }

}
