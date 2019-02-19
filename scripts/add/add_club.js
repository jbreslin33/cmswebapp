'use strict';

class AddClub
{
	constructor(application)
	{
		this.mApplication = application;
		 
		location.hash = "add_club";

		//sql php vars
		this.mName = null;
		this.mStreet =  null;
		this.mCity = null;
		this.mState = null;
		this.mZip = null;


		document.getElementById("addclubbuttonid").addEventListener("click",this.send.bind(this));
	}

	send()
	{
		console.log("SEND TO INSERT CLUB");
		//get vars
               	this.mName  = document.getElementById("add_club_name_id").value;

               	this.mStreet = document.getElementById("add_club_street_id").value;
               	this.mCity   = document.getElementById("add_club_city_id").value;
               	this.mState  = document.getElementById("add_club_state_id").value;
               	this.mZip    = document.getElementById("add_club_zip_id").value;

		//need to handle not having a team yet...
		var url = "/php/classes/insert/insert_club.php?name=" + this.mName + "&street=" + this.mStreet + "&city=" + this.mCity + "&state=" + this.mState + "&zip=" + this.mZip; 

                var request = new XMLHttpRequest();
                request.onreadystatechange = function()
                {
                        if (request.readyState === XMLHttpRequest.DONE)
                        {
                                if (request.status === 200)
                                {
                                        var data = this.responseText;
                                        if (data)
                                        {
						if (data == 100)
						{
							APPLICATION.mLogin.process(data); //should recieve 100 for good join/login
						}
						else
						{
						}
                                        }
                                }
                        }
                };
                request.open('POST', url);
                request.send();
	}
        
	show()
	{
              document.getElementById("add_club_html_id").style.display = "block";
	}

	hide()
	{
              document.getElementById("add_club_html_id").style.display = "none";
	}
}
