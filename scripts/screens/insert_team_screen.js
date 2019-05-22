'use strict';

class InsertTeamScreen extends Screen
{
	constructor(application)
	{
		super(application);

		location.hash = "insert_team_screen";

		this.mCode = 0;
		this.mData = null;

		//sql php vars
		this.mName = null;
		this.mAddress = null;
		
		document.getElementById("addteamscreenbuttonid").onclick = this.hit.bind(this);
	}

	hit()
	{
      		this.mName  = document.getElementById("insert_team_screen_name_id").value;
               	this.mAddress = document.getElementById("insert_team_screen_address_id").value;

		var url = "/php/classes/insert/insert_team.php?name=" + this.mName + "&jwt=" + localStorage.getItem("mJWT"); 

                var request = new XMLHttpRequest();
                request.onreadystatechange = function()
                {
                        if (request.readyState === XMLHttpRequest.DONE)
                        {
                                if (request.status === 200)
                                {
					APPLICATION.mInsertTeamScreen.mData = this.responseText;
                                }
                        }
                };

		var form = document.getElementById('insert_team_screen_html_id');
		if (form.checkValidity() == true) 
		{
			request.open('POST', url);
                	request.send();
		}
	}
        
	show()
	{
              document.getElementById("insert_team_screen_html_id").style.display = "block";
	}

	hide()
	{
              document.getElementById("insert_team_screen_html_id").style.display = "none";
	}
}
