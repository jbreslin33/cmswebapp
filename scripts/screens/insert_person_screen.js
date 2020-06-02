'use strict';

class InsertPersonScreen extends Screen
{
	constructor(application)
	{
		super(application);

		location.hash = 'insert_person_screen';

                this.setHtml(document.getElementById("insert_team_screen_html_id"));
                this.setColSixHtml(document.getElementById("insert_team_screen_col_6_html_id"));
                this.setMessageElement(document.getElementById("insert_team_screen_message_id"));
                this.setForm(document.getElementById("insert_team_screen_form_id"));
                this.setSpinner(document.getElementById("insert_team_screen_spinner_id"));

		this.setClubSelect(document.getElementById("insert_team_screen_club_id"));

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
               		APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/select_persons.php?jwt=" + APPLICATION.getJWT());
                	APPLICATION.getCurrentScreen().ajax();
                }
        }

	processClubs()
        {
                super.processClubs();
                if (this.mJson.clubs)
                {
                        this.getClubTeams();
                }
        }

        clubSelected()
        {
                this.getClubTeams();
        }

        getClubTeams()
        {
		var screen = APPLICATION.getCurrentScreen();
		APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/select_club_teams.php?" + this.getStandardParameters() + '&club_id=' + this.getClubId());
                screen.ajax();
        }

	hit()
	{
		var name  = document.getElementById("insert_team_screen_name_id").value;
		document.getElementById("insert_team_screen_name_id").value = null;

		if (this.getClubId() > 0 && name.length > 0)
		{
			APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/insert_team.php?" + this.getStandardParameters() + '&club_id=' + this.getClubId() + '&name=' + name);
			APPLICATION.getCurrentScreen().ajax();
		}
		else
		{
			this.setMessage("You must select a club and team name first","red");
		}

		//rm all items we got a new json of teams coming
                this.removeDivs();
	}

        deleteHit()
        {
		super.deleteHit();
                var screen = APPLICATION.getCurrentScreen();

                screen.setUrl("/php/classes/screens/delete_team.php?" + screen.getStandardParameters() + '&team_id=' + this.getAttribute("id"));
                screen.ajax();
        }

	processPersons()
	{
                //make new array containing games and practices together
                if (this.mJson)
                {
                        if (this.mJson.persons)
                        {
                                for (var i = 0; i < this.mJson.persons.length; i++)
                                {
					var textArray = new Array();	
					var item = new Item(this.mApplication, this.mJson.persons[i], this.mJson.persons[i].first_name, textArray, this.mJson.persons[i].person_id);
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

