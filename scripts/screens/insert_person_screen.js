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
                this.setFamilySelect(document.getElementById("insert_person_screen_family_select_id"));


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
                APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/select_families.php?jwt=" + APPLICATION.getJWT());
                APPLICATION.getCurrentScreen().ajax();
        }

        getPersons()
        {
                APPLICATION.getCurrentScreen().setUrl("/php/classes/screens/select_persons.php?" + this.getStandardParameters());
                APPLICATION.getCurrentScreen().ajax();
        }

        processFamilies()
        {

                if (this.mJson.families)
                {
                        //load up persons option
                        var select = this.getFamilySelect();
                        select.length = 0;
                        for (var i = 0; i < this.mJson.families.length; i++)
                        {
                                var opt = document.createElement('option');
                                opt.value = this.mJson.families[i].id;
                                var name = this.mJson.families[i].name + ' Family';
                                opt.innerHTML = name;
                                select.appendChild(opt);
                        }
                        this.mFamiliesExist = select.length;

                        this.mApplication.getFamilySelect().value = this.getFamilySelect().value;

                        this.getPersons();
                }
        }
/*
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
	*/


	hit()
	{
		console.log('hit it');
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

        deleteHit()
        {
		super.deleteHit();
                var screen = APPLICATION.getCurrentScreen();

		screen.setUrl("/php/classes/screens/delete_person.php?" + screen.getStandardParameters() + '&delete_person_id=' + this.getAttribute("id"));
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

