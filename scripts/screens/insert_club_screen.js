'use strict';

class InsertClubScreen extends Screen
{
	constructor(application)
	{
		super(application);

		location.hash = 'insert_club_screen';

		document.getElementById("addclubscreenbuttonid").onclick = this.hit.bind(this);

          	this.setHtml(document.getElementById("insert_club_screen_html_id"));
                this.setMenuItem(document.getElementById("insert_club_nav_id"));
                this.setMessageElement(document.getElementById("insert_club_screen_message_id"));
          	this.setForm(document.getElementById("insert_club_screen_form_id"));
          	this.setSpinner(document.getElementById("insert_club_screen_spinner_id"));
	}

	hit()
	{
      		var name  = document.getElementById("insert_club_screen_name_id").value;
               	var address = document.getElementById("insert_club_screen_address_id").value;
		if (this.getPersonId() > 0)
		{
			APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/insert_club.php?" + this.getStandardParameters() + "&name=" + name + "&address=" + address); 
			APPLICATION.getCurrentScreen().ajax();
		}
		else
		{
			this.setMessage('You need to select a person. If there are no persons yet you need to create one.','red');
		}
	}
}
