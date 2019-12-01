'use strict';

class InsertPersonScreen extends Screen
{
	constructor(application)
	{
		super(application);

                location.hash = 'insert_person_screen';

		document.getElementById("insertpersonscreenbuttonid").onclick = this.hit.bind(this);

                this.setHtml(document.getElementById("insert_person_screen_html_id"));
                this.setMenuItem(document.getElementById("insert_person_nav_id"));
                this.setMessageElement(document.getElementById("insert_person_screen_message_id"));
                this.setForm(document.getElementById("insert_person_screen_form_id"));
                this.setSpinner(document.getElementById("insert_person_screen_spinner_id"));
	}

	hit()
	{
      		var firstName  = document.getElementById("insert_person_screen_first_name_id").value;
      		var middleName  = document.getElementById("insert_person_screen_middle_name_id").value;
      		var lastName  = document.getElementById("insert_person_screen_last_name_id").value;
              	var phone = document.getElementById("insert_person_screen_phone_id").value;
               	var address = document.getElementById("insert_person_screen_address_id").value;

		APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/insert_person.php?" + this.getStandardParameters() + "&first_name=" + firstName + "&middle_name=" + middleName + "&last_name=" + lastName + "&phone=" + phone + "&address=" + address); 
		console.log('getUrl:' + APPLICATION.getCurrentScreen().getUrl());
                APPLICATION.getCurrentScreen().ajax();
	}
}
