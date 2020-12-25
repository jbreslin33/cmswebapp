'use strict';

class InsertPersonScreen extends Screen
{
	constructor(application)
	{
		super(application);

		location.hash = 'insert_person_screen';

                this.setHtml(document.getElementById("insert_person_screen_html_id"));
                this.setColSixHtml(document.getElementById("insert_person_screen_col_6_html_id"));
                this.setMessageElement(document.getElementById("insert_person_screen_message_id"));
                this.setForm(document.getElementById("insert_person_screen_form_id"));
                this.setSpinner(document.getElementById("insert_person_screen_spinner_id"));

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
                APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/select_persons.php?" + this.getStandardParameters());
                APPLICATION.getCurrentScreen().ajax();
        }

	hit()
	{
                var firstName  = document.getElementById("insert_person_screen_first_name_id").value;
                var middleName  = document.getElementById("insert_person_screen_middle_name_id").value;
                var lastName  = document.getElementById("insert_person_screen_last_name_id").value;
                var phone = document.getElementById("insert_person_screen_phone_id").value;
                var address = document.getElementById("insert_person_screen_address_id").value;
                
		document.getElementById("insert_person_screen_first_name_id").value = null;
                document.getElementById("insert_person_screen_middle_name_id").value = null;
                document.getElementById("insert_person_screen_last_name_id").value = null;
                document.getElementById("insert_person_screen_phone_id").value = null;
                document.getElementById("insert_person_screen_address_id").value = null;

                APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/insert_person.php?" + this.getStandardParameters() + "&first_name=" + firstName + "&middle_name=" + middleName + "&last_name=" + lastName + "&phone=" + phone + "&address=" + address);
                APPLICATION.getCurrentScreen().ajax();

		//rm all items we got a new json of teams coming
                this.removeDivs();
	}
/*
        deleteHit()
        {
                super.deleteHit();
                var screen = APPLICATION.getCurrentScreen();

                screen.setUrl("/php/classes/screens/delete_pitch.php?" + screen.getStandardParameters() + '&pitch_id=' + this.getAttribute("id"));
                screen.ajax();
        }
*/
        deleteHit()
        {
		super.deleteHit();
                var screen = APPLICATION.getCurrentScreen();

		screen.setUrl("/php/classes/screens/delete_person.php?" + screen.getStandardParameters() + '&delete_person_id=' + this.getAttribute("id"));
		console.log('getUrl:' + screen.getUrl());
                screen.ajax();
        }

	processPersons()
        {
                if (this.mJson)
                {
                        if (this.mJson.persons)
                        {
                                for (var i = 0; i < this.mJson.persons.length; i++)
                                {
                                        var textArray = new Array();
                                        var item = new Item(this.mApplication, this.mJson.persons[i], this.mJson.persons[i].first_name, textArray, this.mJson.persons[i].id);
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

