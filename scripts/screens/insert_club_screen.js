'use strict';

class InsertClubScreen extends Screen
{
	constructor(application)
	{
		super(application);

		location.hash = 'insert_club_screen';

                this.setHtml(document.getElementById("insert_club_screen_html_id"));
                this.setColSixHtml(document.getElementById("insert_club_screen_col_6_html_id"));
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

        get()
        {
		console.log('get() in insert club');
                if (APPLICATION.getJWT())
                {
			console.log('get() in insert club jwt');
               	//	APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/select_persons.php?jwt=" + APPLICATION.getJWT());
                	APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/select_administrated_clubs.php?" + this.getStandardParameters());
                	APPLICATION.getCurrentScreen().ajax();
                }
        }
	
	hit()
	{
      		var name  = document.getElementById("insert_club_screen_name_id").value;
               	var address = document.getElementById("insert_club_screen_address_id").value;

		APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/insert_club.php?" + this.getStandardParameters() + "&name=" + name + "&address=" + address);
		APPLICATION.getCurrentScreen().ajax();
		
		//rm all items we got a new json of teams coming
                this.removeDivs();
	}

        deleteHit()
        {
		super.deleteHit();
                var screen = APPLICATION.getCurrentScreen();

		screen.setUrl("/php/classes/screens/delete_club.php?" + screen.getStandardParameters() + '&delete_club_id=' + this.getAttribute("id"));
                screen.ajax();
        }

	processClubs()
	{
		super.processClubs();

		console.log('processClubs() in insert_club');

                //make new array containing games and practices together
                if (this.mJson)
                {
                        if (this.mJson.clubs)
                        {
				//need this for remove clubs because we need to send new persons...
                		//this.removeDivs();

                                for (var i = 0; i < this.mJson.clubs.length; i++)
                                {
					var textArray = new Array();	
					var item = new Item(this.mApplication, this.mJson.clubs[i], this.mJson.clubs[i].name, textArray, this.mJson.clubs[i].id);
					this.mItemArray.push(item);
                                }

				for (var i = 0; i < this.mItemArray.length; i++)
				{
					this.mItemArray[i].printToScreen();
				}
                        }
		}
	}
}

