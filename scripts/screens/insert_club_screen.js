'use strict';

class InsertClubScreen extends Screen
{
	constructor(application)
	{
		super(application);

		location.hash = 'insert_club_screen';


		this.mCode = 0;
		this.mData = null;

		//sql php vars
		this.mName = null;
		this.mAddress = null;
		
		document.getElementById("addclubscreenbuttonid").onclick = this.hit.bind(this);

          	this.setHtml(document.getElementById("insert_club_screen_html_id"));
                this.setMenuItem(document.getElementById("insert_club_nav_id"));
                this.setMessageElement(document.getElementById("insert_club_screen_message_id"));
          	this.setForm(document.getElementById("insert_club_screen_form_id"));
          	this.setSpinner(document.getElementById("insert_club_screen_spinner_id"));
	}

	hit()
	{
      		this.mName  = document.getElementById("insert_club_screen_name_id").value;
               	this.mAddress = document.getElementById("insert_club_screen_address_id").value;

		var select = document.getElementById("person_select_id");
		var person_id = select.options[select.selectedIndex].value;

		APPLICATION.getCurrentScreen().setUrl("/php/classes/insert/insert_club.php?name=" + this.mName + "&address=" + this.mAddress + "&jwt=" + APPLICATION.getJWT() + '&person_id=' + person_id); 

		APPLICATION.getCurrentScreen().ajax();
	}
/*        
	show()
	{
              document.getElementById("insert_club_screen_html_id").style.display = "block";
	}

	hide()
	{
              document.getElementById("insert_club_screen_html_id").style.display = "none";
	}
	*/
}
