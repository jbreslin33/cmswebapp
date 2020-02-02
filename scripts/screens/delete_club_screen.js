'use strict';

class DeleteClubScreen extends Screen
{
	constructor(application)
	{
                super(application);

                location.hash = 'delete_club_screen';

                document.getElementById("deleteclubscreenbuttonid").onclick = this.hit.bind(this);

                this.setHtml(document.getElementById("delete_club_screen_html_id"));
                this.setMessageElement(document.getElementById("delete_club_screen_message_id"));
                this.setForm(document.getElementById("delete_club_screen_form_id"));
                this.setSpinner(document.getElementById("delete_club_screen_spinner_id"));
	}

	get()
	{
		APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/select_administrated_clubs.php?" + this.getStandardParameters()); 
                APPLICATION.getCurrentScreen().ajax();
	}

	hit()
	{
		var select = document.getElementById("delete_club_screen_select_id");
                var club_id = select.options[select.selectedIndex].value;
		
		APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/delete_club.php?" + this.getStandardParameters() + '&club_id=' + club_id);
                APPLICATION.getCurrentScreen().ajax();
	}

	processClubs()
        {
		if (this.mJson)
		{
               		if (this.mJson.clubs)
               		{
               			//load up persons option
                       		var select = document.getElementById("delete_club_screen_select_id");
                       		select.length = 0;
                       		for (var i = 0; i < this.mJson.clubs.length; i++)
                       		{
                       		       	var opt = document.createElement('option');
                               		opt.value = this.mJson.clubs[i].id;
                                	var name = this.mJson.clubs[i].name;
                                	opt.innerHTML = name;
                                	select.appendChild(opt);
                        	}
                	}
		}
        }
}
