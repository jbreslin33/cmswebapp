'use strict';

class InsertTeamScreen extends Screen
{
	constructor(application)
	{
		super(application);

		location.hash = 'insert_team_screen';

                this.setHtml(document.getElementById("insert_team_screen_html_id"));
                this.setMessageElement(document.getElementById("insert_team_screen_message_id"));
                this.setForm(document.getElementById("insert_team_screen_form_id"));
                this.setSpinner(document.getElementById("insert_team_screen_spinner_id"));

		this.setClubSelect(document.getElementById("insert_team_screen_club_id"));

		this.mWaitListItem = null;
		this.mItemArray = new Array();

		this.getForm().addEventListener('submit', function(e)
                {
                        e.preventDefault();
                        APPLICATION.getCurrentScreen().hit();
                });
	}

        get()
        {
                if (APPLICATION.getJWT())
                {
                        APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/select_administrated_clubs.php?" + this.getStandardParameters());
                        APPLICATION.getCurrentScreen().ajax();
                }
        }

        processCodes()
        {
                super.processCodes();
                if (this.mJson)
                {

                        if (this.mJson.codes)
                        {
                                this.mCode = 0;
                                for (var i = 0; i < this.mJson.codes.length; i++)
                                {
                                        this.mCode = this.mJson.codes[i].code;
                                }
                                //definite success so send to upcoming
                                if (this.mCode == '-103') //successful delete
                                {
                                        //remove evento...
                                        console.log("rm evento");
                                        this.mWaitListItem.removeDivs();
                                }
                        }
                }
        }

        
	processClubs()
        {
		console.log('process clubs....');
                super.processClubs();
                if (this.mJson.clubs)
                {
			console.log('in ifprocess clubs....');

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

		if (this.getClubId() > 0 && name.length > 0)
		{
			APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/insert_team.php?" + this.getStandardParameters() + '&club_id=' + this.getClubId() + '&name=' + name);
			APPLICATION.getCurrentScreen().ajax();
		}
		else
		{
			this.setMessage("You must select a club and team name first","red");
		}
	}

	processTeams()
	{
                //make new array containing games and practices together
                if (this.mJson)
                {
			console.log('mJso');
                        if (this.mJson.teams)
                        {
				console.log('jso teams length:' + this.mJson.teams.length);
                                for (var i = 0; i < this.mJson.teams.length; i++)
                                {
					var item = new Item(this.mApplication,this.mJson.teams[i]);
					this.mItemArray.push(item);
                                }
                        }
		}

		for (var i = 0; i < this.mItemArray.length; i++)
		{
			this.mItemArray[i].printToScreen();
		}
	}
}

