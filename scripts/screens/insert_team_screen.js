'use strict';

class InsertTeamScreen extends Screen
{
	constructor(application)
	{
		super(application);

		location.hash = 'insert_team_screen';

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

        exit()
        {
                this.removeDivs();
                super.exit();
        }

        get()
        {
                if (APPLICATION.getJWT())
                {
                        APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/select_administrated_clubs.php?" + this.getStandardParameters());
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
                var screen = APPLICATION.getCurrentScreen();

                //lets find evento to delete..
                for (var i = 0; i < screen.mItemArray.length; i++)
                {
                        if (screen.mItemArray[i].mDeleteId == this.getAttribute("id"))
                        {
                                screen.mWaitListItem = screen.mItemArray[i];
                        }
                }
		
                screen.setUrl("/php/classes/screens/delete_team.php?" + screen.getStandardParameters() + '&team_id=' + this.getAttribute("id"));
                screen.ajax();
        }

	processTeams()
	{
                //make new array containing games and practices together
                if (this.mJson)
                {
                        if (this.mJson.teams)
                        {
                                for (var i = 0; i < this.mJson.teams.length; i++)
                                {
					//var item = new Item(this.mApplication,this.mJson.teams[i]);
					var textArray = new Array();	
					console.log('new item:' + i);
					var item = new Item(this.mApplication, this.mJson.teams[i].team_name, textArray, this.mJson.teams[i].team_id);
					this.mItemArray.push(item);
                                }

				for (var i = 0; i < this.mItemArray.length; i++)
				{
					console.log('calling print:' + i);
					this.mItemArray[i].printToScreen();
				}
                        }
		}
	}
}

