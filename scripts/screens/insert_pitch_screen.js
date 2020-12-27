'use strict';

class InsertPitchScreen extends Screen
{
	constructor(application)
	{
		super(application);

		location.hash = 'insert_pitch_screen';

                this.setHtml(document.getElementById("insert_pitch_screen_html_id"));
                this.setColSixHtml(document.getElementById("insert_pitch_screen_col_6_html_id"));
                this.setMessageElement(document.getElementById("insert_pitch_screen_message_id"));
                this.setForm(document.getElementById("insert_pitch_screen_form_id"));
                this.setSpinner(document.getElementById("insert_pitch_screen_spinner_id"));

		this.setClubSelect(document.getElementById("insert_pitch_screen_club_id"));

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
		var name  = document.getElementById("insert_pitch_screen_name_id").value;
                document.getElementById("insert_pitch_screen_name_id").value = null;

		if (this.getClubId() > 0 && name.length > 0)
		{
			APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/insert_pitch.php?" + this.getStandardParameters() + '&club_id=' + this.getClubId() + '&name=' + name);
			APPLICATION.getCurrentScreen().ajax();
		}
		else
		{
			this.setMessage("You must select a club and provid a name first","red");
		}
                
		//rm all items we got a new json of pitches coming
                this.removeDivs();
	}


        processClubs()
        {
                super.processClubs();
                if (this.mJson.clubs)
                {
                        this.getClubPitches();
                }
        }

        clubSelected()
        {
                this.getClubPitches();
        }

        getClubPitches()
        {
                var screen = APPLICATION.getCurrentScreen();
                APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/select_club_pitches.php?" + this.getStandardParameters() + '&club_id=' + this.getClubId());
                screen.ajax();
        }

        deleteHit()
        {
		super.deleteHit();
                var screen = APPLICATION.getCurrentScreen();

                screen.setUrl("/php/classes/screens/delete_pitch.php?" + screen.getStandardParameters() + '&pitch_id=' + this.getAttribute("id"));
                screen.ajax();
        }

        processPitches()
        {
                //make new array containing games and practices together
                if (this.mJson)
                {
                        if (this.mJson.pitches)
                        {
                                for (var i = 0; i < this.mJson.pitches.length; i++)
                                {
                                        var textArray = new Array();
                                        var item = new DeleteItem(this.mApplication, this.mJson.pitches[i], this.mJson.pitches[i].pitch_name, textArray, this.mJson.pitches[i].pitch_id);
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
