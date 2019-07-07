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
	}

	hit()
	{
      		this.mName  = document.getElementById("insert_club_screen_name_id").value;
               	this.mAddress = document.getElementById("insert_club_screen_address_id").value;

		var select = document.getElementById("person_select_id");
		var person_id = select.options[select.selectedIndex].value;
		var url = "/php/classes/insert/insert_club.php?name=" + this.mName + "&address=" + this.mAddress + "&jwt=" + APPLICATION.getJWT() + '&person_id=' + person_id; 

                var request = new XMLHttpRequest();
                request.onreadystatechange = function()
                {
                        if (request.readyState === XMLHttpRequest.DONE)
                        {
                                if (request.status === 200)
                                {
					APPLICATION.mInsertClubScreen.mData = this.responseText;
                                }
                        }
                };

		var form = document.getElementById('insert_club_screen_html_id');
		if (form.checkValidity() == true) 
		{
			request.open('POST', url);
                	request.send();
		}
	}
        
	show()
	{
              document.getElementById("insert_club_screen_html_id").style.display = "block";
	}

	hide()
	{
              document.getElementById("insert_club_screen_html_id").style.display = "none";
	}
	
}
