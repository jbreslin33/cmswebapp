'use strict';

class DeleteClubScreen extends Screen
{
	constructor(application)
	{
                super(application);

                location.hash = 'delete_club_screen';

                this.setHtml(document.getElementById("delete_club_screen_html_id"));
                this.setMessageElement(document.getElementById("delete_club_screen_message_id"));
                this.setForm(document.getElementById("delete_club_screen_form_id"));
                this.setSpinner(document.getElementById("delete_club_screen_spinner_id"));

		this.setClubSelect(document.getElementById("delete_club_screen_select_id"));

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
		APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/select_administrated_clubs.php?" + this.getStandardParameters()); 
                APPLICATION.getCurrentScreen().ajax();
	}

	hit()
	{
		var screen = APPLICATION.getCurrentScreen();
               	var select = screen.getClubSelect();
                var club_id = select.options[select.selectedIndex].value;

                var club_id = select.options[select.selectedIndex].value;
		
		screen.setUrl("/php/classes/screens/delete_club.php?" + this.getStandardParameters() + '&club_id=' + club_id);
                screen.ajax();
	}
}
