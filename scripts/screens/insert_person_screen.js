'use strict';

class InsertPersonScreen extends Screen
{
	constructor(application)
	{
		super(application);

		location.hash = 'insert_person_screen';

		this.mCode = 0;
		this.mData = null;

		//sql php vars
		this.mFirstName = null;
		this.mMiddleName = null;
		this.mLastName = null;
		this.mPhone = null;
		this.mAddress = null;
		
		document.getElementById("addpersonscreenbuttonid").onclick = this.hit.bind(this);
	}

	hit()
	{
      		this.mFirstName  = document.getElementById("insert_person_screen_first_name_id").value;
      		this.mMiddleName  = document.getElementById("insert_person_screen_middle_name_id").value;
      		this.mLastName  = document.getElementById("insert_person_screen_last_name_id").value;
               	this.mPhone = document.getElementById("insert_person_screen_phone_id").value;
               	this.mAddress = document.getElementById("insert_person_screen_address_id").value;

		var url = "/php/classes/insert/insert_person.php?first_name=" + this.mFirstName + "&middle_name=" + this.mMiddleName + "&last_name=" + this.mLastName + "&phone=" + this.mPhone + "&address=" + this.mAddress + "&jwt=" + APPLICATION.getJWT(); 

                var request = new XMLHttpRequest();
                request.onreadystatechange = function()
                {
                        if (request.readyState === XMLHttpRequest.DONE)
                        {
                                if (request.status === 200)
                                {
					APPLICATION.mInsertPersonScreen.mData = this.responseText;
                                }
                        }
                };

		var form = document.getElementById('insert_person_screen_html_id');
		if (form.checkValidity() == true) 
		{
			request.open('POST', url);
                	request.send();
		}
	}
        
	show()
	{
              document.getElementById("insert_person_screen_html_id").style.display = "block";
	}

	hide()
	{
              document.getElementById("insert_person_screen_html_id").style.display = "none";
	}
}
