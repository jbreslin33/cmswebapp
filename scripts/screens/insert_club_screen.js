'use strict';

class InsertClubScreen extends Screen
{
	constructor(application)
	{
		super(application);

		location.hash = 'insert_club_screen';

          	this.setHtml(document.getElementById("insert_club_screen_html_id"));
                this.setMessageElement(document.getElementById("insert_club_screen_message_id"));
          	this.setForm(document.getElementById("insert_club_screen_form_id"));
          	this.setSpinner(document.getElementById("insert_club_screen_spinner_id"));

               	this.getForm().addEventListener('submit', function(e)
                {
                        e.preventDefault();
                        APPLICATION.getCurrentScreen().hit();
                });

                //close nav
                this.setCloseNav();
	}

	hit()
	{
      		var name  = document.getElementById("insert_club_screen_name_id").value;
               	var address = document.getElementById("insert_club_screen_address_id").value;
	
		APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/insert_club.php?" + this.getStandardParameters() + "&name=" + name + "&address=" + address); 
		APPLICATION.getCurrentScreen().ajax();
	}
}
